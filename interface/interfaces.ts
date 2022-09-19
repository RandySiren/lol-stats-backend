export interface Summoner {
    id: string;
    accountId: string;
    puuid: string;
    name: string;
    profileIconId: number;
    revisionDate: number;
    summonerLevel: number;
}

export interface MatchOverviewDetails {
    matchId: string;
    gameType: string;
    winner: boolean;
    length: string;
    champion: string;
    summonerSpells: [string, string];
    kda: [number, number, number];
    level: number;
    creeps: number;
    items: [string, string, string, string, string, string, string];
}
