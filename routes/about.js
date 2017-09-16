var express = require('express');
var router = express.Router();


// 定义 about 页面的路由

router.get('/windows.html', function(req, res) {
  res.render('windows', { title: 'Express 路由1' });
});

router.get('/acm.html', function(req, res) {
  res.render('acm', { title: 'Express 路由1' });
});



router.get('/android.html', function(req, res) {
  res.render('android', { title: 'Express 路由1' });
});

router.get('/ios.html', function(req, res) {
  res.render('ios', { title: 'Express 路由1' });
});

router.get('/pingmian.html', function(req, res) {
  res.render('pingmian', { title: 'Express 路由1' });
});

router.get('/qianduan.html', function(req, res) {
  res.render('qianduan', { title: 'Express 路由1' });
});

router.get('/qianru.html', function(req, res) {
  res.render('qianru', { title: 'Express 路由1' });
});

router.get('/shangwu.html', function(req, res) {
  res.render('shangwu', { title: 'Express 路由1' });
});


router.get('/teach.html', function(req, res) {
  res.render('teach', { title: 'Express 路由1' });
});

router.get('/xinan.html', function(req, res) {
  res.render('xinan', { title: 'Express 路由1' });
});

router.get('/yingshi.html', function(req, res) {
  res.render('yingshi', { title: 'Express 路由1' });
});
module.exports = router;