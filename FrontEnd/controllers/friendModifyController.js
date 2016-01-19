
main_module.controller('friendModifyController',function($scope,friendDataFactory,$location){
    
 
    console.log('friendModifyController loaded');
    
    $scope.navbarData ={
        urls:['/logout','#/modify','#/delete','#/new'],
        texts:['Logout','Modify','Delete', 'New']
    }
    
    var selectedFriend = friendDataFactory.getSelectedFriend();
    
    $scope.id = selectedFriend._id;
    $scope.name = selectedFriend.name;
    $scope.address = selectedFriend.address;
    $scope.age = selectedFriend.age;
    
    $scope.savePerson = function(){
        
        var temp = {
            
            id:$scope.id,
            name:$scope.name,
            address:$scope.address,
            age:$scope.age
        }
        
        friendDataFactory.updateData(temp).then(success,error);
    }
    
    function success(){
        friendDataFactory.friendsArray = [];
        $location.path('/list').replace();
    }


});