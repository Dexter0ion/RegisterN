var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '47.88.16.241',
  user     : 'admin',
  password : 'adminpassword'
});

connection.connect();

connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
  if (err) throw err;
  console.log('The solution is: ', rows[0].solution);
});

connection.end();