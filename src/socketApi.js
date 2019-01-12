const socketio=require('socket.io');
const io=socketio();

const socketApi={
    io
};
//redis adapter
const redisAdapter = require('socket.io-redis');
io.adapter(redisAdapter({ 
    host: process.env.REDIS_URI, 
    port: process.env.REDIS_PORT 
    }));

io.on('connection',socket=>{
    console.log("user connected");
    
});
module.exports=socketApi;