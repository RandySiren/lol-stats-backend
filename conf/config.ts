require('dotenv').config();
var config = JSON.parse('{}');

config.httpPort = process.env.PORT || 5000;
config.environment = process.env.NODE_ENV || 'dev';
config.logLevel = process.env.LOG_LEVEL || 'debug';
config.riotApiKey = process.env.RIOT_API_KEY || '';
config.leagueApiPlatformId = process.env.LEAGUE_API_PLATFORM_ID || 'na1';

module.exports = config;
