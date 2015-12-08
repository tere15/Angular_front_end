main_module.factory('loginFactory',function($resource){
    
   
    
    var factory = {};  // faktorissa tehään aina jokin objekti, vaikka var kissa = {}
    
    //This function can be called from ANY controller usin this factory
    //implementation
    factory.startLogin = function(data){
        
            console.log(data);
            //Create a resource for context '/friends/login'
            var req = $resource('/friends/login',{},{'post':{method:'POST'}}); 
        //Käytettävän resurssin määrittely: konteksti, johon lähetetään, option 
        //esim. url:n argumentit, metodit. Kontekstit määritelty index.js tiedostossa.
            //Use POST method to send the username and password to above context
            //Note that we return an promise object from here
            return req.post(data).$promise; // promise kuuntelee responsea serveriltä ( esim. 200: 0k, 401, 404 jne)
    }
    
    factory.startRegister = function(data){
        
            console.log(data);
            //Create a resource for context '/friends/login'
            var req = $resource('/friends/register',{},{'post':{method:'POST'}});
            //Use POST method to send the username and password to above context
            //Note that we return an promise object from here
            return req.post(data).$promise; // promise kuuntelee responsea serveriltä ( esim. 200: 0k, 401, 404 jne)
    }
                    
    //Factory must always return an object!!!
    return factory;
                    
});
        
