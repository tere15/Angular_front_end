main_module.factory('registryFactory',function($resource){
    
    var factory = {};
    
    //This function can be called from ANY controller usin this factory
    //implementation
    factory.startRegistry = function(data){
        
            console.log(data);
            //Create a resource for context '/friends/login'
            var req = $resource('/friends/registry',{},{'post':{method:'POST'}});
            //Use POST method to send the username and password to above context
            //Note that we return an promise object from here
            return req.post(data).$promise; // promise kuuntelee responsea serveriltä ( esim. 200: 0k, 401, 404 jne)
    }
                    
    //Factory must always return an object!!!
    return factory;
                    
});
        