var redis = require("redis");
var redisClient = redis.createClient();

redisClient.on("ready", function(err){
  console.log("redis ready!");
})

module.exports = redisClient; 