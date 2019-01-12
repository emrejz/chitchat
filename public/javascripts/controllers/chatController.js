app.controller('chatController',['$scope','chatFactory',($scope,chatFactory)=>{
    $scope.onlineList = [];
    $scope.roomList = [];
	$scope.activeTab = 2;
	$scope.roomClicked = false;
	$scope.roomName = "";
	$scope.message = "";
	$scope.roomId = "";
	$scope.messages = [];


	
    const socket=io.connect('http://localhost:3000');

    socket.on('onlineList', users => {
		$scope.onlineList = users;
		$scope.$apply();
	});
	socket.on('roomList', rooms => {
		
		$scope.roomList = rooms;
		$scope.$apply();
	});

	$scope.newMessage=()=>{
		socket.emit('newMessage',{
			message:$scope.message,
			roomId:$scope.roomId
		})
		$scope.message = "";
	
	}

	$scope.switchRoom=(room)=>{
		$scope.roomClicked = true;
		$scope.roomId = room.id;
		$scope.chatName = room.name;
	
		chatFactory.getMessages(room.id).then(data=>{
			$scope.messages[room.id] = data;
			console.log($scope.messages);
			
		})

	}
		$scope.newRoom=()=>{
		//	let randomName=Math.random().toString(36).substring(7);
			let roomName=window.prompt("enter room name");
			if(roomName!=="" && roomName!==null){
			socket.emit('newRoom',roomName);
								}
		};

	$scope.changeTab = tab => {
		$scope.activeTab = tab;
	};
}])