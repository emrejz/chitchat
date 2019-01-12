const redisClint=require("../lib/redisClient");
const shortId=require("shortid");

function Messages() {
	this.client = redisClint.getClient();
}

module.exports = new Messages();


Messages.prototype.upsert = function ({roomId,message,name,surname}) {

	this.client.hset(
		'messages:'+roomId,
		shortId.generate(),
		JSON.stringify({
					name,
					surname,
					message,
					when: Date.now()
		}),
		err => {
			if (err) {
			  console.error(err);
			}
		}
	)
};
Messages.prototype.list = function (roomId,callback) {
	let messageList = [];

	this.client.hgetall('messages:'+roomId, function (err, messages) {
		if (err) {
		  console.error(err);
		  return callback([]);
		}

		for (let message in messages){
			messageList.push(JSON.parse(messages[message]));
		}
     
        
		return callback(messageList);
	})
};