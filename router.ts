const express = require('express');
const path = require('path');
import ApiError from './errors/api-error';
import Logger from './logging/logger';
import SummonerController from './controller/SummonerController';
import MatchController from './controller/MatchController';
import { MatchOverviewDetails } from './interface/interfaces';
import { getItemById, getItemList, getSummonerSpellById, getSummonerSpellList } from './leaguejs';

const logger = Logger.getLogger(path.basename(__filename));

var router = express.Router();

// Middleware that is specific to this router, we'll just log the time of call
router.use(function timeLog(req, res, next) {
    logger.info('Time: ' + Date.now());
    next();
});

router.get('/getRecentMatchDetails', async (req, res, next) => {
    const summoner = req.query.summoner || undefined;
    const count = req.query.count || 5;
    if (!summoner) {
        const error = new ApiError('Bad summoner params');
        return res.status(error.statusCode).send(error.serialize());
    }
    try {
        // Get summoner puuid
        const { puuid } = await SummonerController.getSummonerByName(summoner);

        // Get recent matches IDs, defaults to 5
        const matchIds = await MatchController.getRecentMatches(puuid, count);

        await getItemList();
        await getSummonerSpellList();

        // For each match, add to our result array the appropriate fields
        const matchDetails: MatchOverviewDetails[] = [];
        for (const matchId of matchIds) {
            const matchFullDetails = await MatchController.getMatchFullDetails(matchId);
            const summonerGameDetails = matchFullDetails.info.participants.find(
                (participant) => participant.puuid === puuid,
            );
            const summonerSpells = [
                getSummonerSpellById(summonerGameDetails.summoner1Id)?.name,
                getSummonerSpellById(summonerGameDetails.summoner2Id)?.name,
            ];
            const items = [
                getItemById(summonerGameDetails.item0)?.name,
                getItemById(summonerGameDetails.item1)?.name,
                getItemById(summonerGameDetails.item2)?.name,
                getItemById(summonerGameDetails.item3)?.name,
                getItemById(summonerGameDetails.item4)?.name,
                getItemById(summonerGameDetails.item5)?.name,
                getItemById(summonerGameDetails.item6)?.name,
            ];

            const matchDetail: MatchOverviewDetails = {
                gameType: matchFullDetails.info.gameMode,
                winner: summonerGameDetails.win,
                length: matchFullDetails.gameDuration,
                champion: summonerGameDetails.championName,
                summonerSpells: summonerSpells as [string, string],
                kda: [summonerGameDetails.kills, summonerGameDetails.deaths, summonerGameDetails.assists],
                level: summonerGameDetails.champLevel,
                creeps: summonerGameDetails.totalMinionsKilled,
                items: items as [string, string, string, string, string, string, string],
            };
            matchDetails.push(matchDetail);
        }
        res.send(matchDetails);
    } catch (err) {
        const error = JSON.parse(err.error);
        let apiError: ApiError;
        if (error.status.message.includes('summoner not found')) {
            apiError = new ApiError('Summoner not found');
        } else {
            apiError = new ApiError('Internal Error');
        }
        return res.status(apiError.statusCode).send(apiError.serialize());
    }
});

module.exports = router;
