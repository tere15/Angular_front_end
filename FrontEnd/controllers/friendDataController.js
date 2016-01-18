main_module.controller('friendDataController',function($scope,friendDataFactory,$location){
    
   $scope.name = "by Markus Veijola";
    console.log('friendDataController loaded');
    
    friendDataFactory.getFriendData(dataCallback);
    
    $scope.rowClicked = function(id){
        
        friendDataFactory.selected_id = id;
        
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
        $location.path('/new').replace();        
    }
    
    $scope.modifyClicked = function(){
        console.log('modify was pressed');
        $location.path('/modify').replace();
    }
    
    $scope.deleteClicked = function(){
        console.log('delete was pressed');
    }    
    
    $scope.rowSelected = function(){
        console.log('row was selected');
        console.log($scope.friendData.name);
        
    }
    
    $scope.search = function(){
        console.log('search pressed');
                                   friendDataFactory.search($scope.search_term).then(function(data){
            console.log(data);
            $scope.friendData = data;
            
        });
    }
});