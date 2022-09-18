const config = require('./conf/config');
const LeagueJS = require('leaguejs');

const leagueJs = new LeagueJS(config.riotApiKey, {
    PLATFORM_ID: config.leagueApiPlatformId,
    caching: { isEnabled: true, defaults: { stdTTL: 120 } },
});

export default leagueJs;
