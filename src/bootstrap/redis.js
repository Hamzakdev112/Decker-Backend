const { Redis } = require('ioredis');

let redis; 
exports.connectRedis = async ()=>{
    try{
        redis = new Redis({
            host: process.env.REDIS_HOST,
            port: 10794,
            password: process.env.REDIS_PASSWORD,
        })

    }catch(err){
        console.log(err)
    }
}


exports.SetCache = (key,value , expiry)=>{
    if(expiry){
            return redis.set(key, value, 'EX', expiry)
    }   
    return redis.set(key, value);
    }
exports.getCatch = (key)=>{
    return redis.get(key)
}

exports.getList = async (key) => {
    return redis.lrange(key, 0, -1);
  };
exports.deleteCache = async (key) => {
    return redis.flushall();
  };


exports.pushToList = async (key, values, expiry) => {

    return redis.rpush(key, values, (err, result)=>{
        if(err)console.log(err)
        else {
            redis.expire(key, expiry)
        }
    });
  };

// module.exports = redis;

