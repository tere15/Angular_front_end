main_module.controller('controllerRegistry',function($scope,registryFactory,$location){
    
    
    $scope.registerClicked = function(){
        
        console.log('register was pressed');
        //kutsu loginFactoriin
        
        var temp = {
            username:$scope.user,
            password:$scope.pass
        }
        
        var waitPromise = registryFactory.startRegistry(temp);
        //Wait the response from server
        waitPromise.then(function(data){
            console.log('Success');
            //$location.path('/list');
            $('.error').text("Registry succeeded!")
            
            //code inside this block will be called when success response
            //from server receives (asynkronista ohjelmointia: kun ei tiedetä milloin vastaus serveriltä tulee              ja odotetaan sitä)
        },function error(data){
            console.log('fail');
            console.log(data);
            $('.error').text('Registry failed!');
        
        });        
    }
    
});