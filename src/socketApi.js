const socketio=require('socket.io');
const socketAuthorization=require('../middleware/socketAuthorization');
const io=socketio();

const socketApi={
    io

};

// libs-online users
const Users = require('./lib/onlineUsers');
const Rooms = require('./lib/Rooms');


// socket Authorization
io.use(socketAuthorization);

//redis adapter
const redisAdapter = require('socket.io-redis');
io.adapter(redisAdapter({ 
    host: process.env.REDIS_URI, 
    port: process.env.REDIS_PORT 
    }));

io.on('connection',socket=>{
    
    Rooms.list(room=>{
        console.log(room);
        
    });
    Users.upsert(socket.id, socket.request.user);
    Users.list(users => {
		io.emit('onlineList',users);
	});

    socket.on('newRoom',(roomName)=>{
        Rooms.upsert(roomName);
    });
    
    socket.on('disconnect',()=>{

        Users.remove(socket.request.user.googleId)
        Users.list(users => {
		io.emit('onlineList',users);
            
        });
    })
    
});
module.exports=socketApi;