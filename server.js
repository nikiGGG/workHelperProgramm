'use strict'

const http = require('http')
const fs = require('fs');
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.options('*', cors());

console.log('Работатет')
app.use(express.static(__dirname + "/public"));

app.get("/", function(request, response){
    response.send("/index.html");
});

let robo = require('./robot')
app.get('/move', function (req, res) {
  robo.move(335,50)
  robo.click()
  robo.type('nikita the best')
  res.json('сделал');
});

app.get('/pxlColor*', function (req, res) {
  let pxl = req.url.split('.').slice(1,3)
  res.json(robo.pxlColor(pxl[0], pxl[1]));
});

app.get('/test.*', function (req, res) {
  let test = req.url.split('.').slice(1,3)
  res.json(test);
});

app.get('/robot/*', function (req, res) {
  let arrURL = req.url.split('/')
  if (arrURL.length === 6) {
    res.json(robo[arrURL[2]](arrURL[3], arrURL[4], arrURL[5]));
  } else if (arrURL.length === 5) {
    res.json(robo[arrURL[2]](arrURL[3], arrURL[4]));
  } else if (arrURL.length === 4) {
    res.json(robo[arrURL[2]](arrURL[3]));
  } else {
  res.json(robo[arrURL[2]]());
  }
});

app.listen(3000);
