main_module.factory('friendDataFactory', function($resource){
        
    var factory = {};
    factory.selected_id = null;
    
    //In this array we cache the friends information,
    //so that once stored in array we wont make any further request
                            
    factory.friendsArray = [];
                    
    factory.getFriendData = function(callbackFunc){
        
        if(factory.friendsArray.length === 0){
            var resource = $resource('/friends',{},{'get':{method:'GET'}});
            resource.query().$promise.then(function(data){
                
              factory.friendsArray = data;
              callbackFunc(factory.friendsArray);    
                
            },function(error){
                
                factory.friendsArray = [];
                callbackFunc(factory.friendsArray);
            });
        }
        else{
            
            callbackFunc(factory.friendsArray);
        }
    }

   /* factory.getFriendData = function(){
        
        var resource = $resource('/friends',{},{'get':{method:'GET'}});
        return resource.query().$promise;
    }*/
    
    /**
      *This function searches a person from array containing an id
      *that was stored when user cliked the row in the partial_dataView
      *page. When it finds the correct one from the array, it returns
      *that object.
      */
    factory.getSelectedFriend = function(){
        
        for(var i = 0; i < factory.friendsArray.length; i++){
            
            if(factory.friendsArray[i]._id === factory.selected_id){
                
                return factory.friendsArray[i];
            }
        }
        
    }
                    
                    
    return factory;
                    
    
                    
});