var mongoose = require('mongoose');
var db = 'piz'
,   schema = mongoose.Schema
,   pizschema
,   userschema
,   toppingschema;

mongoose.connect('mongodb://sujit:tijus@ds053188.mongolab.com:53188/demo');

mongoose.connection.on('connected',function(){
    console.log('connected to mongodb on database '+db);
});

pizschema = new schema({
    pizza:String,
    price:{
        size:{
            small:Number,
            medium:Number,
            large:Number
        }
    }
});

toppingschema = new schema({
    ExtraCheese:Number,
    Mushrooms:Number,
    BlackOlives:Number,
    Onions:Number,
    GreenPeppers:Number,
    Tomatoes:Number,
    Pepperoni:Number,
    Salami:Number,
    Sausage:Number,
    Shrimp:Number,
    Anchovies:Number
})

userschema = new schema({
   username:String,
   password:String,
   surname:String,
   email:String,
   phonenumber:Number,
   address:String,
   postcode:Number
});

var toppings = mongoose.model('topping',toppingschema);
var user = mongoose.model('user',userschema);
var pizzas = mongoose.model('pizza',pizschema);
