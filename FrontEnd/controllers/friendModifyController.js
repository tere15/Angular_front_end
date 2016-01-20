
main_module.controller('friendModifyController',function($scope,friendDataFactory,$location){
    
 
    console.log('friendModifyController loaded');
    
    var selectedFriend = friendDataFactory.getSelectedFriend();    
    
    $scope.navbarData = {
        
        urls:['/logout','#/new','#/modify','#/delete','#/location','http://www.kaleva.fi'],
        texts:['Logout','New','Modify','Delete','Your Location','News']
    }
    

    
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