import leagueJs from '../leaguejs';
import { Summoner } from '../interface/interfaces';

export default class SummonerController {
    public static async getSummonerByName(summoner: string): Promise<Summoner> {
        return new Promise((resolve, reject) => {
            leagueJs.Summoner.gettingByName(summoner)
                .then((res) => resolve(res))
                .catch((err) => reject(err));
        });
    }

    public static;
}
