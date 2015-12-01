/*Tähän tiedostoon määritellään tietokannan schema*/
/***** yhteys tietokantaan  ******/
var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/oma', connectionStatus);

/*********************************/
//connetctionStatus

// Kaikki tässä funktiossa privateja, jos ei exportata ulos

/**
  * Connection callback for fail and ok cases
  */

function connectionStatus(err, ok){
    
    if(err){
        console.log(err.message);
    }else{
        console.log("We are connected!");
    }

}


var User = mongoose.model('User',{
    username:{type:String,unique:true},
    password:String,
    friends:[{type:mongoose.Schema.Types.ObjectId,ref:'Person'}]
});

var Person = mongoose.model('Person',{ 
    name: String,
    address: String,
    age:{type:Number}
}, 'person');

//Using exports object you exorse the data to other modules
exports.Person = Person; // viedään muuttuja tämän moduulin ulkopuolelle, muuten näkyy vain tässä tiedostossa
exports.Friends = User;

exports.myFunction = function(){
    console.log("This ");
}

