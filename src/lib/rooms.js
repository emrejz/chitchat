const redisClint=require("../lib/redisClient");
const shortId=require("shortid");

function Rooms() {
	this.client = redisClint.getClient();
}

module.exports = new Rooms();


Rooms.prototype.upsert = function (name) {
    const newId=shortId.generate();
	this.client.hset(
		'rooms',
		"@Room:"+newId,
		JSON.stringify({
            id:"@Room:"+newId,
            name,
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