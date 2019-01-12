const socketio=require('socket.io');
const socketAuthorization=require('../middleware/socketAuthorization');
const io=socketio();

const socketApi={
    io

};

// libs-online users
const Users = require('./lib/onlineUsers');


// socket Authorization
io.use(socketAuthorization);

//redis adapter
const redisAdapter = require('socket.io-redis');
io.adapter(redisAdapter({ 
    host: process.env.REDIS_URI, 
    port: process.env.REDIS_PORT 
    }));

io.on('connection',socket=>{

    
    console.log("user :"+socket.request.user.name);
    Users.upsert(socket.id, socket.request.user);
    Users.list(users => {
		console.log(users);
	});

    socket.on('disconnect',()=>{
        console.log("emre");
        
        Users.remove(socket.request.user.googleId)
        Users.list(users => {
            console.log(users);
        });
    })
    
});
module.exports=socketApi;