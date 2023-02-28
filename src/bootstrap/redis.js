const { Redis } = require('ioredis');

let redis; 
exports.connectRedis = async ()=>{
    try{
        redis = new Redis({
            host: 'redis-10794.c12.us-east-1-4.ec2.cloud.redislabs.com',
            port: 10794,
            password: 'sUEdQJzeYHXE6xoAAG9azYmHanDJli2E',
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

