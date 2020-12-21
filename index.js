var logger = require('morgan');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var users = require('./user-db');

var app = express();
app.listen(4000);

app.use(logger())
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'files')))
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Content-Type", "application/json");

  res.cookie('name', 'abc',
   {
     domain: 'localhost',
     path:'/',
     expires: new Date(Date.now()+900000),
     secure: false,
     httpOnly: true
   }
  );

  next();
});

app.get('/users', function(req, res) {
  console.log('## Content-Type: %s ##', req.get('Content-Type'));
  console.log(`## ${req.method} ${req.originalUrl} from ${req.ip} ##`);

  res.append('Link', ['<http://localhost:3000/>'])
  res.append('Set-Cookie', 'foo=bar; Path=/; HttpOnly')
  res.append('Warning', '199 Miscellaneous warning')

  res.json(users);
});

app.get('/users/:id', function(req, res) {
  for (let i = 0; i < users.length; i++) {
    if (users[i].id == req.params.id) {
      res.status(200).json(users[i]);
    }
  }
});

app.put('/users', function(req, res) {
  users.push(req.body);
  res.status(201).end();
});

app.post('/users/:id', function(req, res) {
  for (let i = 0; i < users.length; i++) {
    if (users[i].id == req.params.id) {
      users[i] = req.body;
    }
  }
  res.status(205).end();
});

app.delete('/users/:id', function(req, res) {
  for (let i = 0; i < users.length; i++) {
    if (users[i].id == req.params.id) {
        users.splice(i, 1);
      }
    }
    res.status(204).end();
 });

 console.log('express listing in port: 4000');