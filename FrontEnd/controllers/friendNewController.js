
main_module.controller('friendNewController',function($scope, friendDataFactory, $location){
    
    $scope.navbarData = {
        
         urls:['/logout','#/new','#/modify','#/delete','#/location','http://www.kaleva.fi'],
        texts:['Logout','New','Modify','Delete','Your Location','News']
    }
    
 
    console.log('friendNewController loaded');
    
        $scope.addPerson = function(){
        //$('#save').attr("disabled",true);
        var temp = {
            name:$scope.name,
            address:$scope.address,
            age:$scope.age
        }
        
        friendDataFactory.insertData(temp).then(function(data){
            friendDataFactory.friendsArray.push(data.data);
            //Flash.create('success', 'New friend added!', 'custom-class');
            console.log('New friend added!');
            $scope.name = "";
            $scope.address = "";
            $scope.age = "";
            //$('#save').attr("disabled", false);
            friendDataFactory.friendsArray = [];
            $location.path('/list').replace();            
        },function(error){
            //$('#save').attr("disabled", false);
            //Flash.create('warning', 'Failed to add friend!', 'custom-class');
            console.log('Failed to add friend!');
        });
    }
    
    
    
});