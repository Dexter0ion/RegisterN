var express = require('express');  
var router = express.Router();  
/* GET home page. */  
router.get('/', function(req, res, next) {  
  res.render('table1', { title: 'Express 路由1' });  
});   
//module.exports = router;  