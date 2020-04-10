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
app.get('/robot/*', function (req, res) {
  let arrURL = req.url.split('/')
  if (arrURL.length === 6) {
    res.json(robo[arrURL[2]](arrURL[3], arrURL[4], arrURL[5]));
  } else if (arrURL.length === 5) {
    res.json(robo[arrURL[2]](arrURL[3], arrURL[4]));
  } else if (arrURL.length === 4) {
    res.json(robo[arrURL[2]](arrURL[3]));
  } else {
  console.log(arrURL, req.url);
  res.json(robo[arrURL[2]]());
  }
});

let analizer = require('./picAnalizer')
app.get('/analize/*', function (req, res) {
  let arrURL = req.url.split('/')
  analizer(arrURL[2])
  .then(response => {
    res.json(response)
  })
});

app.post('/voice', )

app.listen(3000);
