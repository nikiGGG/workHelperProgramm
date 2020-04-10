// Get pixel color under the mouse. node robot.js
var robot = require("robotjs");

exports.coordinates = function () {
  var mouse = robot.getMousePos();
  var hex = robot.getPixelColor(mouse.x, mouse.y);
  return mouse.x + ' ' + mouse.y + ' #' + hex
}

exports.move = function (x, y) {
  robot.moveMouse(x, y);
  robot.setMouseDelay(200);
  return 'Передвинул на ' + x + ':' + y
}

exports.click = function () {
  robot.mouseClick();
  return 'Кликнул'
}

exports.type = function (string) {
  robot.typeString(string);
  return 'Напечатал: ' + string
}

exports.pxlColor = function (x, y) {
  let img = robot.screen.capture(x, y, 1, 1);
  return '#' + img.colorAt(0, 0)// + ' В точке' + x + ':' + y
}

exports.prtSc = function (x, y) {
  let img = robot.screen.capture(x, y, 10, 10);
  return 'Сделал prtSc' + x + ':' +y
}

exports.hide = function () {
  robot.moveMouse(339+1365, 175);
  robot.setMouseDelay(100);
  robot.mouseClick();
  robot.setMouseDelay(300);
  robot.moveMouse(373+1365, 258);
  robot.setMouseDelay(200);
  robot.mouseClick();
  return 'Спрятал'
}

exports.EQM = function () {
  robot.moveMouse(474+1365, 207);
  robot.setMouseDelay(600);
  robot.mouseClick();
  // зеленый 008000 красный ff0000
  let admin = robot.screen.capture(540+1365, 720, 1, 1).colorAt(0, 0);
  let oper = robot.screen.capture(540+1365, 770, 1, 1).colorAt(0, 0);
  let flop = robot.screen.capture(867+1365, 514, 1, 1).colorAt(0, 0);

  switch(admin + "|" + oper) {
    case "008000|008000":
    return 'Up/Up'
        break;
    case "008000|ff0000":
    return 'Up/Down'
      break;
    case "ff0000|ff0000":
    return 'Down/Down'
      break;
    default:
    return 'Авария'
      break;
  }
}

exports.sescion = function () {
  let px1 = robot.screen.capture(489+1365, 813, 1, 1).colorAt(0, 0);
  let px2 = robot.screen.capture(489+1365, 871, 1, 1).colorAt(0, 0);

  if (px1 === '40a040' && px2 === '40a040') {
    return 'Роутер/Сессия ОК'
  } else if (px1 === '40a040') {
    return true
  } else {
    return false
  }
}

exports.adress = function (str, app, num) {
  robot.moveMouse(1490, 155);
  robot.mouseClick();
  robot.typeStringDelayed(str, 300);
  robot.setKeyboardDelay(1000)
  robot.keyTap('tab')
  robot.typeStringDelayed(app, 300);
  robot.keyTap('tab')
  robot.keyTap('tab')
  robot.setKeyboardDelay(1000)
  robot.typeStringDelayed(num, 300);
  robot.moveMouse(110+1366, 410);
  robot.mouseClick();
  return 'adress done'
}
robot.moveMouse(1000, 200)
/*
// команды
robot.moveMouse(x, y)
robot.moveMouseSmooth(x, y)
robot.scrollMouse(x, y);
robot.mouseClick()
robot.setMouseDelay(ms)
robot.getMousePos();
robot.typeString(строка)
robot.typeStringDelayed('строка', букв в минуту)
robot.keyTap(key, [modifier])
robot.setKeyboardDelay(ms)
robot.getPixelColor(x, y)
robot.screen.capture([x], [y], [width], [height])
*/

/*
// Get pixel color in hex format.
var hex = robot.getPixelColor(mouse.x, mouse.y);
console.log("#" + hex + " at " + mouse.x + ":" + mouse.y);
//  1366:0 и 2640:1023 точка 1456:106
var img = robot.screen.capture(1366, 0, 1274, 1023);
// Support for higher density screens.
let dotCall = {
  x: 90,
  y: 106
}
var color = img.colorAt(dotCall.x, dotCall.y);
//console.log(color);
// no:e16601 talk:f3b304 ready:70d10a
*/
