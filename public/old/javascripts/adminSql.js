var express = require('express');
var app = express();

var adminShowData = document.getElementById("adminShowData");
var mysql = require('mysql');

function getRegisData() {
    //alert("开始连接");
    var connection = mysql.createConnection({
        host: '47.88.16.241',
        user: 'admin',
        password: 'adminpassword',
        database: 'regisdb',
        port: '3306',
        charset: 'UTF8_GENERAL_CI'
    });
    connection.connect();

    alert("连接成功");
    //查询数据
    connection.query('select * from tblMemberRegisInfo', function (err, rows, fields) {
        if (err) throw err;
        console.log('selected after deleted');
        for (var i = 0, usr; usr = rows[i++];) {
            //console.log('user name=' + usr.memberName);
            adminShowData.innerHTML += usr.memberName +
                usr.memberSchoolNumber +
                usr.memberClassName +
                usr.memberTel +
                usr.memberQQ +
                usr.memberSex +
                usr.memberTeam +
                usr.memberMessage +
                "</br>";
        }
        console.log("数据导入成功");
    });

    connection.end();
}

//module.exports = getRegisData;
/*
  memberName: req.body.memberName,
    memberSchoolNumber: req.body.memberSchoolNumber,
    memberClassName: req.body.memberClassName,
    memberTel: req.body.memberTel,
    memberQQ: req.body.memberQQ,
    memberSex: req.body.memberSex,
    memberTeam: req.body.memberTeam,
    memberMessage: req.body.memberMessage,


*/