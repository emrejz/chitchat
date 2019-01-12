const redisClint=require("../lib/redisClient");

function Rooms() {
	this.client = redisClint.getClient();
}

module.exports = new Rooms();


Rooms.prototype.upsert = function (roomsName) {
	this.client.hset(
		'rooms',
		roomsName,
		JSON.stringify({
			name:roomsName,
			when: Date.now()
		}),
		err => {
			if (err) {
			  console.error(err);
			}
		}
	)
};
Rooms.prototype.list = function (callback) {
	let roomList = [];

	this.client.hgetall('rooms', function (err, rooms) {
		if (err) {
		  console.error(err);
		  return callback([]);
		}

		for (let room in rooms){
			roomList.push(JSON.parse(rooms[room]));
		}
     
        
		return callback(roomList);
	})
};