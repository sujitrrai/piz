var mongoose = require('mongoose');
var db = 'piz'
,   schema = mongoose.Schema
,   pizschema;

mongoose.connect('mongodb://localhost/'+db);

mongoose.connection.on('connected',function(){
    console.log('connected to mongodb on database '+db);
});

pizschema = new schema({
    pizza:String,
    price:Number
});

userschema = new schema({
   username:String,
   password:String,
   surname:String,
   email:String,
   phonenumber:Number,
   address:String,
   postcode:Number
});

var user = mongoose.model('user',userschema);
var pizzas = mongoose.model('pizza',pizschema);
