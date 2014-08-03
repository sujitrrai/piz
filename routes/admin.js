var express = require('express');
var pizinstance = require('./pizinstance.js');
var router = express.Router();
var dir = './html/';
var mongoose = require('mongoose');
var pizza = mongoose.model('pizza');

/* GET users listing. */
router.get('/', function(req, res) {
  console.log('inside get');
  console.log(req.body);
  if (req.query.showlist) {
    console.log('got inside query :'+req.query.showlist);
    pizza.find(function(err,data){
    if (err) {
      console.log(err);
    }
    console.log(data);
    res.send(JSON.stringify(data));
    });
  }
  else{
    res.sendfile(dir+'admin.html');
    
  }
});
router.post('/:data',function(req,res){
  var data = JSON.parse(req.params.data);
  if (req.query.editflag==='true') {
    console.log('edit');
    console.log(JSON.stringify({'pizza':data.pizza}));
    pizza.findOne({'pizza':data.old.pizza,'price':data.old.price},function(err,doc){
      if (err) {
        console.log(err);
      }
      else {
        doc.pizza = data.changed.pizza;
        doc.price = data.changed.price;
        doc.save(function(err){
          if (err) {
            console.log(err);
          }
          else{
            console.log('edited');
            res.send(data);
          }
          });
      }
      });
    
  }
  else if (req.query.details) {
    console.log(req.query.details);
    pizza.findOne({'pizza':data.pizza,'price':data.price},function(err,doc){
      if (err) {
        console.log(err);
      }
      else{
        doc.remove();
        res.send(data);
      }
      });
    
  }
  else{
    console.log('add');
    
    pizinstance(data);
    res.send(data);
  }
});
/*
router.get('/list',function(req,res){
    pizzas.find(function(err,data){
      if (err) {
        console.log(err);
      }
      console.log(data);
      res.send(data);
      });
  });
*/
module.exports = router;
