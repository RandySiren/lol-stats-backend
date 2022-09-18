import leagueJs from '../leaguejs';

export default class MatchController {
    public static async getRecentMatches(puuid: string, count: number): Promise<string[]> {
        return new Promise((resolve, reject) => {
            leagueJs.Match.gettingMatchIdsByPuuid(puuid, { count })
                .then((res) => resolve(res))
                .catch((err) => reject(err));
        });
    }

    public static async getMatchFullDetails(matchId: string): Promise<Object> {
        return new Promise((resolve, reject) => {
            leagueJs.Match.gettingById(matchId)
                .then((res) => resolve(res))
                .catch((err) => reject(err));
        });
    }
}
