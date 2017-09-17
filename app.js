var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var mysql = require('mysql');

var index = require('./routes/index');
var users = require('./routes/users');
var about = require('./routes/about');
var func = require('./routes/func');

var app = express();
//aa
// view engine setup
//设置模板引擎为ejs
app.engine('html', ejs.__express);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//系统路由
app.use('/', index);
app.use('/mail', index);

app.use('/about', about);
app.use('/func', func);

//自定义路由


/*
app.use('/table1.html', table1);
app.use('/tableDB', tableDB);
app.use('/regisadmin', regisadmin);
*/



/*
app.use('/', routes);  // 即为为路径 / 设置路由
app.use('/users', users); // 即为为路径 /users 设置路由
app.use('/login',routes); // 即为ss为路径 /login 设置路由
app.use('/register',routes); // 即为为路径 /register 设置路由
app.use('/home',routes); // 即为为路径 /home 设置路由
app.use("/logout",routes); // 即为为路径 /logout 设置路由
*/
//获取前台表单信息
var mysql = require('mysql');
var connection = mysql.createConnection({
  host: '47.88.16.241',
  user: 'admin',
  password: 'adminpassword',
  database: 'regisdb',
  port: '3306',
  charset: 'UTF8_GENERAL_CI'
});


app.post('/test', function (req, res) {
  console.log(req.body.name);
  console.log(req.body.tel);
});

app.post('/regis', function (req, res) {
  var mysql = require('mysql');
  var connection = mysql.createConnection({
    host: '47.88.16.241',
    user: 'admin',
    password: 'adminpassword',
    database: 'regisdb',
    port: '3306',
    charset: 'UTF8_GENERAL_CI'
  });
  //获取前台数据
  console.log(req.body.memberName);
  console.log(req.body.memberSchoolNumber);
  console.log(req.body.memberClassName);
  console.log(req.body.memberTel);
  console.log(req.body.memberQQ);
  console.log(req.body.memberSex);
  console.log(req.body.memberTeam);
  console.log(req.body.memberMessage);

  var memberName = req.body.memberName;
  var memberSchoolNumber = req.body.memberSchoolNumber;
  var memberClassName = req.body.memberClassName;
  var memberTel = req.body.memberTel;
  var memberQQ = req.body.memberQQ;
  var memberSex = req.body.memberSex;
  var memberTeam = req.body.memberTeam;
  var memberMessage = req.body.memberMessage;
  //同步数据库


  connection.connect();

  /*
 CREATE TABLE `regisdb`.`tblMemberRegisInfo` (
  `memberId` INT NOT NULL AUTO_INCREMENT,
  `memberName` VARCHAR(45) NULL,
  `memberSchoolNumber` VARCHAR(45) NULL,
  `memberClassName` VARCHAR(45) NULL,
  `memberTel` VARCHAR(45) NULL,
  `memberQQ` VARCHAR(45) NULL,
  `memberSex` VARCHAR(45) NULL,
  `memberTeam` VARCHAR(45) NULL,
  `memberMessage` VARCHAR(1000) NULL,
  `tblMemberRegisInfocol` VARCHAR(45) NULL,
  PRIMARY KEY (`memberId`));

*/
  var usr = {
    memberName: req.body.memberName,
    memberSchoolNumber: req.body.memberSchoolNumber,
    memberClassName: req.body.memberClassName,
    memberTel: req.body.memberTel,
    memberQQ: req.body.memberQQ,
    memberSex: req.body.memberSex,
    memberTeam: req.body.memberTeam,
    memberMessage: req.body.memberMessage,
  };

  var schNumCheck = 0;
  //检索学号
  var schNumberSql = "select * from tblMemberRegisInfo where memberSchoolNumber = '" + req.body.memberSchoolNumber + "'";
  connection.query(schNumberSql, usr, function (err, result) {
    if (err) throw err;
    schNumCheck = result.length;
    console.log(schNumCheck);
    if (schNumCheck == 0) {
      //插入数据
      connection.query('insert into tblMemberRegisInfo set ?', usr, function (err, result) {
        if (err) throw err;
        console.log('inserted complete');
        console.log(result);
        console.log('\n');

        res.render('index', { title: 'Express' });
      });
    };

    if (schNumCheck > 0) {
      res.send("您的学号已被占用");
    }

  });


  //显示查询数据
  connection.query('select * from tblMemberRegisInfo', function (err, rows, fields) {
    //if (err) throw err;
    console.log('selected after deleted');
    for (var i = 0, usr; usr = rows[i++];) {
      console.log('user name=' + usr.memberName);
    }
    console.log('\n');


  });





});

/*
app.post('/saveSqlExcel', function (req, res) {
  //打印excel表
  connection.query("select * from tblMemberRegisInfo into outfile '/tmp/test1.xls'", usr, function (err, result) {
    if (err) throw err;
    console.log('outfile complete');
});
});
*/
app.post('/saveSqlExcel', function (req, res) {

  var myDate = new Date();
  var fileName = myDate.getTime();
  var sqlStr = "select * from tblMemberRegisInfo into outfile './" + fileName + ".xls'";
  //打印excel表
  connection.query(sqlStr, function (err, result) {
    if (err) throw err;
    console.log('outfile complete');

  });
  var filepath = './public/' + fileName + '.xls';
  var filepath = '/var/lib/mysql/' + fileName + '.xls';
  console.log(filepath);
  res.download(filepath, '注册信息.xls', function (err) {
    if (err) {
      console.log(err);
    }
    else {
      console.log('ok');
    }
  });
});






  //获取前台管理员登陆数据

  app.post('/regisadmin', function (req, res) {


    //connection.connect();
    console.log(req.body.adminname);
    console.log(req.body.adminpassword);
    var sqlStr = "select * from tblRegisAdmin where adminName='"
      + req.body.adminname + "' and adminPassword = '"
      + req.body.adminpassword + "'";
    console.log(sqlStr);


    /*
    connection.query(sqlStr, function (err, result) {
        if (err) throw err;
        
        if (!sqlStr) {
          console.log("no such admin");
        }
        else if (sqlStr) {
          console.log("log in successful");
        }
  
      });
  */
    connection.query(sqlStr, function (err, result, fields, row) {
      if (err) {
        throw err;
      }
      if (result.length == 0) {
        console.log("No such admin account|LOG IN FAILED");
        res.render('index', { title: 'Express' });
      }
      else if (result.length > 0) {
        console.log("LOG IN Successful");

        //生成excel
        /*
        connection.query("select * from tblMemberRegisInfo into outfile './testCC.xls'", function (err, result) {
          if (err) throw err;
          console.log('outfile complete');
        });
        */
        res.render('regisAdmin', { title: 'Express' });
      }
      //获得符合查询条件的条数
      console.log(result.length);
      console.log(row);
      //console.log(fields);
    });


    console.log('\n');

  });




  app.get('/adminGetdata', function (req, res) {
    res.send('hello world');
  });

  app.get('/downloadExcel', function (req, res) {
    res.send('hello world');
    console.log("downloading");
  });
  // catch 404 and forward to error handler
  app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // error handler
  app.use(function (err, req, res, next) {

    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });

  module.exports = app;
