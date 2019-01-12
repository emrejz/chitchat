const socketio=require('socket.io');
const socketAuthorization=require('../middleware/socketAuthorization');
const io=socketio();

const socketApi={
    io
};

// socket Authorization
io.use(socketAuthorization)

//redis adapter
const redisAdapter = require('socket.io-redis');
io.adapter(redisAdapter({ 
    host: process.env.REDIS_URI, 
    port: process.env.REDIS_PORT 
    }));

io.on('connection',socket=>{
    console.log("emre");
    
    console.log("user :"+socket.request.user);
    
});
module.exports=socketApi;