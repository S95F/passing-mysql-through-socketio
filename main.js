

var path = require('path');
var express = require('express')
var serveStatic = require('serve-static')
var app = express()

const http = require('http');
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);


var htmlPath = path.join(__dirname, 'html');
console.log(htmlPath);


let mysql = require('mysql');

//config
let config = require('./routes/sqlConfig.js');
var con = mysql.createConnection(config);


function execSql(statement, values) {
  let p = new Promise(function (res, rej) {
    con.query(statement, values, function (err, result) {
      if (err) rej(err);
      else res(result);
    });
  });
  return p;
}

io.execSql = execSql;


const {t1} = require('./routes/t1.js')(io);


const onConn = (socket) => {
	socket.on("t1",t1);
}

io.on('connection', onConn);

app.use(serveStatic(htmlPath))
server.listen(80)
