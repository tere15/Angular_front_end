//backend, person-routteri

//löytyykö router, joka käsittelee tietyn attribuutin

var express = require("express");
var db = require('./queries');

var router = express.Router();


// Handle GET requests for /persons context
router.get('/', function(req,res){

    db.getAllPersons(req,res);
});

router.get('/search',function(req,res){
    console.log('Router for query called');
    db.findPersonsByName(req,res);
});


/*router.get('/:nimi/:username', function(req,res){

    //console.log("Get with name router called");
    db.findPersonsByName(req,res);
    
});*/

// Handle POST requests for /persons context
router.post('/', function(req,res){
    db.saveNewPerson(req,res);
});


router.put('/', function(req,res){
    
    db.updatePerson(req,res);

});


router.delete('/', function(req,res){
   
    db.deletePerson(req,res);

});


module.exports = router;



