//Here we create our main module. First argument is the name of the module, the second one
//the '[] array' contains the dependencies to other angular modules


var main_module = angular.module('main_module',['ngRoute', 'ngResource', 'flash']);


//This function will check if user is logged in or not. This function is used
//in the router below in resolve attribute
function loginRequired($q,$resource,$location){
    
    //Create a promise
    var deferred = $q.defer();
    $resource('/isLogged').query().$promise.then(function success(){
        //Mark the promise to be solved (or resolved)
        deferred.resolve();
        return deferred;

    },function fail(){
    
        //Mark promise to be failed
        deferred.reject();
        //Go back to root context
        $location.path('/');
        return deferred;
});

    
    
}

//Create basic configuration for our angular app.
//Configuration includes USUALLY a router for our views.
//The $routeProvider object comes from ngRoute module
main_module.config(function($routeProvider){
    
    $routeProvider.when('/',{
        // Triggeröityy kun url latautuu eli tullaan '/' kohtaan
        templateUrl:'partial_login.html', //toteuttaa tietyn osan dokumenttia (siksi partial)
        controller:'controllerLogin'
        //factory:'loginFactory'
    
    }).when('/list',{
        // Jos näkymä tarvii tietoa backendiltä, tehään kontrolleri ja liimataan tässä
        //yhteen näkymä ja kontrolleri. Tehään myös factory, jos esim.
        // 2. näkymässä tarvitaan samaa dataa. Factoryssa kaikki data tallessa.
    
        templateUrl:'partial_dataView.html',
        controller: 'friendDataController',
        resolve:{loginRequired: loginRequired}
        
    
    }).when('/new',{
        
        templateUrl:'partial_newView.html',
        controller: 'friendNewController',
        resolve:{loginRequired: loginRequired}


        
    }).when('/modify',{
        
        templateUrl:'partial_modifyView.html',
        controller: 'friendModifyController',
        resolve:{loginRequired: loginRequired}
        
    
    }).when('/delete',{
        
        templateUrl:'partial_deleteView.html',
        controller: 'friendDeleteController',
        resolve:{loginRequired: loginRequired}
        
    });
    
    
});