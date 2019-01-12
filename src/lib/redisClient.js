const redis = require('redis');

const getClient=()=>redis.createClient({
    host: process.env.REDIS_URI,
    port: process.env.REDIS_PORT,
});

module.exports.getClient=getClient;