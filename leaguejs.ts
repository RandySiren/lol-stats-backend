const config = require('./conf/config');
const LeagueJS = require('leaguejs');
const DataDragonHelper = require('leaguejs/lib/DataDragon/DataDragonHelper');

let ITEM_LIST: any = {};
let SUMMONER_SPELL_LIST: any = {};

export const getSummonerSpellList = async () => {
    return new Promise((resolve, reject) => {
        if (Object.keys(SUMMONER_SPELL_LIST).length > 0) resolve(SUMMONER_SPELL_LIST);
        DataDragonHelper.gettingSummonerSpellsList()
            .then((spell) => {
                SUMMONER_SPELL_LIST = spell;
                resolve(SUMMONER_SPELL_LIST);
            })
            .catch((err) => reject(err));
    });
};

export const getSummonerSpellById = (id: number) => {
    let result: any = {};
    if (Object.keys(SUMMONER_SPELL_LIST).length > 0) {
        Object.values(SUMMONER_SPELL_LIST.data).forEach((spell: any) => {
            if (spell.id === id) {
                result = spell;
                return;
            }
        });
    }
    return result;
};

export const getItemList = async () => {
    return new Promise((resolve, reject) => {
        if (Object.keys(ITEM_LIST).length > 0) resolve(ITEM_LIST);
        DataDragonHelper.gettingItemList()
            .then((items) => {
                ITEM_LIST = items;
                resolve(ITEM_LIST);
            })
            .catch((err) => reject(err));
    });
};

export const getItemById = (id: number) => {
    if (Object.keys(ITEM_LIST).length > 0) {
        return ITEM_LIST.data[id];
    }
    return {};
};

const leagueJs = new LeagueJS(config.riotApiKey, {
    PLATFORM_ID: config.leagueApiPlatformId,
    caching: { isEnabled: true, defaults: { stdTTL: 120 } },
});

export default leagueJs;
