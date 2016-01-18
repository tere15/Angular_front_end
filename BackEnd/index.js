//serveri (backend)

// nodea käyttämällä ei tarvi huolehtia säikeistä, expressillä tehään i/o -operaatioita

// javascriptissä "" tai '' ei ole merkitystä

var express = require("express");  // ladataan express moduuli muuttujaan
var path = require("path");
var https = require('https');
var fs = require('fs'); // file system module, käsitellään tiedostoja
var jwt = require('jsonwebtoken');
var bodyParser = require("body-parser");
var database = require('./modules/database');
var queries = require('./modules/queries');
var person = require('./modules/person');
var user = require('./modules/user');
var mysql_module = require('./modules/mysql_module');

var options = {
    
    key:fs.readFileSync('server.key'),
    cert:fs.readFileSync('server.crt'),
    requestCert:false,
    rejectUnauthorized:false
}

//This is used for creating a secret key value
//for our session cookie
var uuid = require('uuid');

//Create a secret for our web token
var secret = uuid.v1();

exports.secret = secret;

var session = require('express-session');

var app = express();    // luodaan serveri

app.set('port', process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 3000);
app.set('ip', process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1");


//Middlewaret ja routersit käsitellään pinona, jokaisen middlewaren esittelyjärjestys on merkityksellinen
//----------------------------Middlewares--------------------------

// middlewaret esitellään aina ennen routereita
// käydään läpi, vaikka kutsu olisi osoitettu routerille

//jos cookieta ei ole, luodaan tässä kun session obekti luodaan
// tätä ei nyt tarvi, kun token otettu käyttöön
app.use(session({
    secret:uuid.v1(),
    cookie:{maxAge:6000000} //aika millisekunteina, jos maxAge ei aseteta cookie hävitetään
}));


//Bodyparser json() middleware parses the json object
//from HTTP POST request

//session-objekti pitää määritellä ennen näitä
app.use(bodyParser.json()); //session-objekti tarvii
app.use(bodyParser.urlencoded()); //session-objekti tarvii

//Define middlewares for our static files (.html, .css, .js files that are loaded)
//by browser when parsing index.html file)
app.use('/',express.static(path.join(__dirname, '../FrontEnd/views'))); 
app.use('/FrontEnd/css',express.static(path.join(__dirname, '../FrontEnd/css'))); 
app.use('/FrontEnd/lib',express.static(path.join(__dirname, '../FrontEnd/lib'))); 
app.use('/FrontEnd/module',express.static(path.join(__dirname, '../FrontEnd/module'))); 
app.use('/FrontEnd/controllers',express.static(path.join(__dirname, '../FrontEnd/controllers'))); 
app.use('/FrontEnd/factories',express.static(path.join(__dirname, '../FrontEnd/factories')));

app.use('/FrontEnd/fonts',express.static(path.join(__dirname, '../FrontEnd/fonts')));
app.use('/FrontEnd/directives',express.static(path.join(__dirname, '../FrontEnd/directives')));

app.use('/friends',user);       //tästä triggeröityy user.js (käsiteltävä router) (/friends pyyhitään tässä pois)

//app.use('/css',express.static(path.join(__dirname, 'css')));    
//app.use('/controllers',express.static(path.join(__dirname, 'controllers')));    
//app.use('/lib',express.static(path.join(__dirname, 'lib')));    


app.get('/logout', function(req,res){
    
    req.session.destroy();
    res.redirect('/');
});

//app.get("/css/styles.css", function(req,res){
    
  //  res.sendfile("css/styles.css"); // palauttaa index.html-tiedoston selaimeen
//});

  
    
app.use(function(req,res,next){                     
    //Read the token from request
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    
    //Check if there was a token
    if (token){
    //verify that token is not 'guessed' by the client and it matches
    //the one we created in login phase
        jwt.verify(token,secret, function(err, decoded){
            //There was error verifying the token
            if(err){
                return res.send(401);
            }else{
                req.decoded = decoded;
                console.log(req.decoded);
                next();
            }
        });
    }else{
        res.send(403);
    }
    
    //Send reques forward in stack
    //next(); // seuraavaan middlewareen
 });    
//===========================OUR REST API MIDDLEWARES=================================//


app.use('/persons',person);    //tästä triggeröityy person.js (käsiteltävä router) (/persons pyyhitään tässä pois)

//This router checks if client is logged in or not
app.get('/isLogged', function(req,res){
    //User is logged in if session contains kayttaja attribute
    if(req.session.kayttaja){
        res.status(200).send([{status:'Ok'}]);
    }
    else{
        res.status(401).send({status:'Unauthorized'});
    }
    
});  



//----------------------------ROUTERS------------------------------------------------



//app.get("/persons", function(req,res){//
//    queries.getAllPersons(req,res);
    //res.send("Hello persons there!");
//});


//app.listen(3000); // käynnistetään serveri (kuuntele porttia 3000, voi käyttää tässä testissä portteja 3000 ->)

https.createServer(options,app).listen(app.get('port') ,app.get('ip'), function () {
    console.log("Express server started");
});

