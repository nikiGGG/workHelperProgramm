'use strict'

const http = require('http')
const fs = require('fs');
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.options('*', cors());

console.log('Сервер работает')
app.use(express.static(__dirname + "/public"));

app.get("/", function(request, response){
    response.send("/index.html");
});

let robo = require('./serverParts/robot')
app.get('/robot*', function (req, res) {
  let arrURL = req.url.split('/')
  if (arrURL.length === 6) {
    res.json(robo[arrURL[2]](arrURL[3], arrURL[4], arrURL[5]));
  } else if (arrURL.length === 5) {
    res.json(robo[arrURL[2]](arrURL[3], arrURL[4]));
  } else if (arrURL.length === 4) {
    res.json(robo[arrURL[2]](arrURL[3]));
  } else {
  // console.log(arrURL, req.url);
  res.json(robo[arrURL[2]]());
  }
});

let analizer = require('./serverParts/picAnalizer')
app.get('/analize*', function (req, res) {
  let arrURL = req.url.split('/')
  robo.prtSc(arrURL[2],arrURL[3],arrURL[4],arrURL[5])
  .then((res) => analizer(res)
    .then((response) => res.json(response)))
});

app.post('/data', function(request, response){
  fs.readFile('serverParts/resultsMay.json', function (err, data) {
    var json = JSON.parse(data);
    let date = new Date()
    json[date.toLocaleString()] = request.body
    fs.writeFile("serverParts/resultsMay.json", JSON.stringify(json), function(err){
      if (err) throw err;
      console.log('The "data to append" was appended to file!');
    });
  })
   response.json('Отправлены на сервер данные')
});

app.listen(3000);
