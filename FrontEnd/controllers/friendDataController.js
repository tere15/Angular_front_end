main_module.controller('friendDataController',function($scope,friendDataFactory,$location){
   
    console.log('friendDataController loaded');
    
    friendDataFactory.getFriendData(dataCallback);
    
    $scope.rowClicked = function(id){
        
        friendDataFactory.selected_id = id;
        $location.path('/modify').replace();
    }
    
    function dataCallback(dataArray){
        
        $scope.friendData = dataArray;
    }
    
    
    
    //Check if factory does not has the data
    /*if(friendDataFactory.friendsArray.length === 0)
    {
    
        var response = friendDataFactory.getFriendData();

        response.then(function(data){
            
            friendDataFactory.friendsArray = data;
            $scope.friendData = data;
        });
                    
    }else{
        $scope.friendData = friendDataFactory.friendsArray;
    }*/
    
     
    
    $scope.newClicked = function(){
        console.log('new was pressed');
    }
    
    $scope.modifyClicked = function(){
        console.log('modify was pressed');
    }
    
    $scope.deleteClicked = function(){
        console.log('delete was pressed');
    }    
    
    $scope.rowSelected = function(){
        console.log('row was selected');
        console.log($scope.friendData.name);
    }
    

        
});