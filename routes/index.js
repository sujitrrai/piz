var express = require('express');
var router = express.Router();
var dir = './html/';
var mongoose = require('mongoose');
var pizza = mongoose.model('pizza');
/* GET home page. */
router.get('/', function(req, res) {
  if (req.query.names==='true') {
    pizza.find({},'pizza',function(err,data){
      if (err) {
        console.log(err);
      }
      else{
        res.send(data);
      }
      });
  }
  else{
    res.sendfile(dir+'index.html');
  }
});
router.post('/:data',function(req,res){
  //converting data into object form
  var data = JSON.parse(req.params.data);
  console.log('got');
  console.log(data.pizza);
  pizza.findOne({"pizza":data.pizza},function(err,doc){
    if (err) {
      console.log(err);
    }
    else{
      console.log(doc);
      res.send(JSON.stringify(doc));
      }
    });
});

module.exports = router;
