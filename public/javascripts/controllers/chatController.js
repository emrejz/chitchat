app.controller('chatController',['$scope',($scope)=>{
    $scope.onlineList = [];
    $scope.roomList = [];
	$scope.activeTab = 2;
	$scope.roomClicked = false;
	$scope.roomName = "";


	
    const socket=io.connect('http://localhost:3000');

    socket.on('onlineList', users => {
		$scope.onlineList = users;
		$scope.$apply();
	});
	socket.on('roomList', rooms => {
		
		$scope.roomList = rooms;
		$scope.$apply();
	});
	$scope.switchRoom=(room)=>{
		$scope.roomClicked = true;
		$scope.chatName = room.name;

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