// х, y где находяться кнопки на удаленке
let remote = {
  'scritLine': "2156/295",
  'blueSearch': "1860/420",//1860/350
  'top': "1736/418",// +70 ко всеь y ниже
  'tip': "1766/527",
  'info': "1726/455",
  'balance': "1906/875/50/30",
  'internet': "2136/465",
  'tv': "2296/465",
  'script': "1996/330",
  'noRestricts': "1751/705",
  'inHome': "1756/635",
  'noAppeal': "1876/670",
  'appeal': "1751/670",
  'video': "1746/915"
}
// меняет значения remote, для значений для тестового договора
function testSendDots(string) {
  let newCoordinates = string.split('/')
  if (newCoordinates[0] === 'analizer') {
    newCoordinates[1] = +newCoordinates[1] - 30
    newCoordinates[2] = +newCoordinates[2] - 187
    newCoordinates = newCoordinates.join('/')
  } else {
    newCoordinates[2] = +newCoordinates[2] - 30
    newCoordinates[3] = +newCoordinates[3] - 187
    newCoordinates = newCoordinates.join('/')
  }
  return newCoordinates;
}
// печатает адрес в стрку поиска на удаленке
function typeAdress(str, app, num) {
  let street = replacer(str)
  send('robot/move/1516/165')
  .then(() => send('robot/click'))
  .then(() => send('robot/type/' + street))
  .then(() => send('robot/key/tab'))
  .then(() => send('robot/type/' + app))
  .then(() => send('robot/key/tab'))
  .then(() => send('robot/key/tab'))
  .then(() => send('robot/type/' + num))
  .then(() => send('robot/move/1506/415'))
  .then(() => send('robot/click'))
}
// заменяет руские буквы на английские в str
function replacer(str) {
  var map = {
      'q' : 'й', 'w' : 'ц', 'e' : 'у', 'r' : 'к', 't' : 'е', 'y' : 'н', 'u' : 'г', 'i' : 'ш', 'o' : 'щ', 'p' : 'з', '[' : 'х', ']' : 'ъ', 'a' : 'ф', 's' : 'ы', 'd' : 'в', 'f' : 'а', 'g' : 'п', 'h' : 'р', 'j' : 'о', 'k' : 'л', 'l' : 'д', ';' : 'ж', '\'' : 'э', 'z' : 'я', 'x' : 'ч', 'c' : 'с', 'v' : 'м', 'b' : 'и', 'n' : 'т', 'm' : 'ь', ',' : 'б', '.' : 'ю','Q' : 'Й', 'W' : 'Ц', 'E' : 'У', 'R' : 'К', 'T' : 'Е', 'Y' : 'Н', 'U' : 'Г', 'I' : 'Ш', 'O' : 'Щ', 'P' : 'З', '[' : 'Х', ']' : 'Ъ', 'A' : 'Ф', 'S' : 'Ы', 'D' : 'В', 'F' : 'А', 'G' : 'П', 'H' : 'Р', 'J' : 'О', 'K' : 'Л', 'L' : 'Д', ';' : 'Ж', '\'' : 'Э', 'Z' : '?', 'X' : 'ч', 'C' : 'С', 'V' : 'М', 'B' : 'И', 'N' : 'Т', 'M' : 'Ь', ',' : 'Б', '.' : 'Ю',
  };
  var val = "";
  for(var i = 0; i < str.length;i++)
  if(str[i] >= 'а' && str[i] <= 'я' || str[i] >= 'А' && str[i] <= 'Я'){
    for(var key in map)
        if(str[i] == map[key]){
          val+=key;
          break;
        }
    }
    else
     val+=str[i];
  return val
}
// проверяет появился ли договор
function checkContractExist() {// тест: НН дзе 22 47 - 1 активнДоговора, авиа 3 147 -2АктивнДоговора
  console.log('Ищу договора');
  send('robot/pxlColor/' + remote.blueSearch)
  .then(res => {
    switch (res) {
      case '#e8d8c0':
        console.log('нет выбора договора');
        break;
      case '#ffffff':
        console.log('договор открылся');
        firstOpenContract()
        break;
      case '#2071c2':
        console.log('необходимо выбрать договор');
        let color = 365
        let sameColor = 0
        let lastColor = 'ff'
        let contractArr = []
        function lastElementDifference(array) {
          let contracts  = 0
          let lastEl = 0
          let diff = 0
          array.forEach((item, i) => {
            let currentEl = +item.split('/')[3]
            if (i >= 1) {
              diff = currentEl - lastEl
              if(diff > 2) contracts  += 1
            } else {
              lastEl = currentEl
            }
          });
          return contracts ;
        }
        function newSend() {
          console.log('Ищу открытые договора');
          send('robot/pxlColor/1726/' + color)
          .then((res) => {
            if(res === '#ebe7e6' || res === '#ead9e3') contractArr.push('robot/move/1726/' + color);
            color += 1
            sameColor = (res === lastColor) ?  sameColor+1 : 0
            lastColor = res
            if(color <= 747 && sameColor<21) {
              newSend()
            } else {
              openContract()
            }
          })
        }
        newSend()
        function openContract() {
          console.log('Открываю договор');
          if (lastElementDifference(contractArr) < 2) {
            send(contractArr[0])
            .then(() => send('robot/click'))
            .then(() => firstOpenContract())
          } else {
            console.log('Больше одного активного договора');
          }
        }
        break;
      default:
      console.log('ошибка в проверке открытых договоров' + res);
    }
  })
}
// работает с только что открытым договором
let opened = 0// количество активных договоров
function firstOpenContract() {
  console.log('Ищу кнопку Топ');
  function inFunc1() {
    console.log('Ищу кнопку Предвосхищение');
    send('robot/pxlColor/' + remote.info)
      .then((res) => {
        if (res === '#31b0d5') {
          send('robot/move/' + remote.tip)
          .then(() => send('robot/click')
            .then(() => send('robot/move/' + remote.script)
              .then(() => {
                send('robot/click')
                opened = 1
              })))
        } else {
          setTimeout(inFunc1, 400)
      }
    })
  }
  send('robot/pxlColor/' + remote.top)
  .then((res) => {
    if (res === '#337ab7') {
    send('robot/move/' + remote.top)
    .then(() => send('robot/click')
      .then(() => inFunc1()))
  } else {
    setTimeout(firstOpenContract, 400)
  }
  })
}
// начиная с точки start ищет цвет hex('#000000'), после match совпадений, кликает на поселднюю совпавшую точку
async function findButton(start, hex, match/*def:3*/, step/*def:2*/) {
  let plusStep = (step != undefined) ? step : 2// на сколько ниже точку проверяет
  let counterOfSameDots = 0 // сохраняет кол-во одинаковых точек
  let stopCount = (match != undefined) ? n : 3 // сколько должно быть повторений цвета
  let maxCount = 0 // сохраняет кол-во повторений алгоритма Максимум:500
  let currentHex = 'ffffff'// текущий цвет в алгоритме
  let currentDot = start
  innerFunc()
  function innerFunc() {
    send('robot/pxlColor/' + currentDot)
    .then((res) => {
      console.log('Шаг: ' + maxCount + ' ТекЦвет: ' + currentHex + ' Цвет: ' + res + ' Сумма:' + counterOfSameDots);
      if (res === hex && currentHex === hex) {
        counterOfSameDots += 1
      } else {
        counterOfSameDots = 0
        currentHex = res
      }
      let newY =  +currentDot.split('/')[1] + plusStep
      currentDot = currentDot.split('/')[0] + '/' + newY
      maxCount += plusStep
      if (maxCount > 50) {
        console.log('Не нашлось совпадений');
      } else if (counterOfSameDots >= stopCount){
        send('robot/move/' + currentDot)
        .then(() => send('robot/click'))
        console.log('Нашёл кнопку: ' + currentDot);

      } else {
        innerFunc()
      }
    })
  }
  return currentHex
}
// после выбора интернет или тв в скрипте проматывает первые кнопки
function firstScriptServicesTouch() {
  if (opened) {
    send('robot/move/' + remote.noRestricts)
    .then(() => send('robot/click'))
    .then(() => send('robot/move/' + remote.inHome))
    .then(() => send('robot/click'))
    .then(() => send('robot/move/' + remote.noAppeal))
    .then(() => send('robot/click'))
    .then(() => send('robot/move/' + remote.video))
    .then(() => send('robot/click'))
  } else {
    setTimeout(firstScriptServicesTouch, 1000)
  }
}

function test() {
  // временно переделыват некорректные точки  на удаленке
    let var1214224 = key.split('/')
    var1214224[0] = +var1214224[0] + 30
    var1214224[1] = +var1214224[1] - 62
    var1214224 = var1214224.join('/')
    console.log(var1214224);
}
