var express = require('express');
var router = express.Router();

/* GET users listing. */

router.get('/', function(req, res, next) {
  res.send('function');

});

router.get('/regisTable.html', function(req, res) {
  res.render('regisTable', { title: '报名' });
});


module.exports = router;
