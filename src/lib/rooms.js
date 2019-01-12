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
			room:roomsName,
			when: Date.now()
		}),
		err => {
			if (err) {
			  console.error(err);
			}
		}
	)
};