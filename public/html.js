'use strict'
// функция отправляет запрос на сервер
async function send(name) {
  if(data.test) name = testSendDots(name)
  if (data.serverBock === true) {
    console.log('не будет отправлено на сервер: ' + name);
  } else {
    const resp = await fetch('http://localhost:3000/' + name, { method: 'get' })
    const dataFetch = await resp.json()
    if(data.sendLogs)console.log(dataFetch);
    return dataFetch
  }
}
// отправка данных на сервер
function sendData (dat) {
  if (data.serverBock === true) {
    console.log('не будет сохранён диалог на сервере');
  } else {
    fetch('http://localhost:3000/data', {
    method: 'post',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dat)}).then(res=>res.json())
    .then(res => console.log(res));
  }
}
// данные для правой колонки
let data = {
  'serverBock': false,// не отправляет на сервер. send() и sendData() не выполняеся
  'test': false,// меняет местоположение точек на удаленки на тестовеые
  'noSound': false,// не воспроизводит аудио, не запускает прослушивание ответа, ждёт ответа в поле input(id='answer')
  'ready': true,// если меняется на true-запускает stop(),на false-start()
  'sendLogs': false,// отменяет\выводит логи в send()
  'readyCheck': false,// включает\отключает проверку кнопки реди
  'admin': 'up',// для элемента Admin/Oper на стороне клиента
  'oper': 'up',// для элемента Admin/Oper на стороне клиента
  'crash': false,// для элемента crash на стороне клиента
  'sescion': false,// для элемента sescion на стороне клиента
  'balanse': 0,// для элемента balanse на стороне клиента
  'debt': 0,// для элемента debt на стороне клиента
}
// меняет цвет кнокпи EQM
function changeEQM () {
  let admin = document.getElementById('admin').classList
  let oper = document.getElementById('oper').classList

  if (admin.value != data.admin) {
    admin.remove(admin.value)
    admin.add(data.admin)
  }

  if (oper.value != data.oper) {
    oper.remove(oper.value)
    oper.add(data.oper)
  }
}
// следит за изменением кнопок в левом div, и выполняет функции
function chck(element) {
  if (element.type === 'text') {
    data[element.id] = element.value
  } else if (element.type === 'checkbox') {
    switch (element.id) {
      case 'noSound':
      switch (element.checked) {
        case true:
          document.getElementById('answer').style.display = 'block'
          data[element.id] = element.checked
          break;
        case false:
          document.getElementById('answer').style.display = 'none'
          data[element.id] = element.checked
          break;
      }
        break;
      case 'test':
        //console.log('chck(): test rule');
        data[element.id] = element.checked
        break;
      case 'ready':
      switch (element.checked) {
        case true:
          //console.log('chck(): stop dialog');
          data[element.id] = element.checked;
          stop();
          break;
        case false:
          //console.log('chck(): start dialog');
          data[element.id] = element.checked
          start()
          break;
      }
        break;
      default:
        data[element.id] = element.checked
    }
  } else if (element.type === undefined && element.tagName === 'TD'){
    switch (element.classList.value) {
      case 'up':
        element.classList.remove('up')
        element.classList.add('dawn')
        data[element.id] = 'dawn'
        break;
      case 'dawn':
        element.classList.remove('dawn')
        element.classList.add('up')
        data[element.id] = 'up'
        break;
    }
  }
  else {
    console.log('element ' + element + ' is not a text, checkbox or TD');
    console.log('type is ' + element.type + 'and tag is ' + element.tagName);
  }
}
// обнавлеят данные в правой колонке
function update() {
  for (var key in data) {
    let element = document.getElementById(key)
    if (element.type === 'text' && element.value != data[element.id]) {
      element.value = data[element.id]
    }
    if (element.type === 'checkbox' && element.checked != data[element.id]) {
      element.checked = data[element.id]
    }
    if (element.type === 'td' && element.classList.value != data[element.id]) {
      switch (element.classList.value) {
        case 'up':
          element.classList.remove('up')
          element.classList.add('dawn')
          break;
        case 'dawn':
          element.classList.remove('dawn')
          element.classList.add('up')
          break;
      }
    }
  }
}
// вставляет title из кнопки,которая запускает видео
function pasteText(name, audio) {
  const p = document.createElement('p')
  if (document.getElementById('dialog') != undefined) {
    if (audio === true) {
      p.innerHTML = 'ОПЕРАТ: ' + document.getElementById(name).title
      document.getElementById('dialog').appendChild(p);
    } else {
      p.innerHTML = name
      document.getElementById('dialog').appendChild(p);
    }
  } else {
    if (audio === true) {
      const divDialog = document.createElement('div')
      divDialog.id = 'dialog'
      document.getElementById('left').appendChild(divDialog)
      p.innerHTML = 'ОПЕРАТ: ' + document.getElementById(name).title
      document.getElementById('dialog').appendChild(p);
    } else {
      const divDialog = document.createElement('div')
      divDialog.id = 'dialog'
      document.getElementById('left').appendChild(divDialog)
      p.innerHTML = name
      divDialog.appendChild(p);
    }
  }
}
// проверяет цвет кнопки реди, с помощью robotjs
function readyCheck() {
  send('robot/pxlColor/1465/105')
  .then(res => {
    if (/#b...../.test(res) && data.ready === false || /#af..../.test(res) && data.ready === false) {
      data.ready = true
      update()
      stop()
    } else if (/#f6..../.test(res) && data.ready === true) {
      data.ready = false
      update()
      start()
     } //else {
    //   if(/#ed..../.test(res)) {console.log('не на линии ' + res);}
    //   else if(/#b...../.test(res) || /#af..../.test(res)) {console.log('реди ' + res);}
    //   else if(/#f6..../.test(res)) {console.log('в звонке ' + res);}
    //   else {console.log('Не видно кнопки ready ' + res);}
    // }
  })
}
// Обрабатывает запросы в input, когда Без звука
function answer() {
  let myAnswer = document.getElementById('answer').value
  document.getElementById('answer').value = ''
  pasteText('КЛИЕНТ: ' + myAnswer)
  if(withoutWit === true) {
    innerRecog(myAnswer)
  } else {
    getIntent(myAnswer)
  }
}
// функция, выполняется когда начало звонка
let date = new Date()
function start() {
  if (date.getHours() > 21) {
    audioPlay('evning')
  } else {
    audioPlay('day')
  }
}
// функция, выполняется при завершенном звонке
function stop() {
  document.getElementById('dialog').remove()
  sendData(clientSpeech)
  for (var key in firstIntent) {
    firstIntent[key] = 0
  }
  clientSpeech = []
  speechFlow = []
  hideAll()
}
// возвращает title(что говориться в записи)
function getFrase(name) {
  audioPlay(name)
  return document.getElementById(name).title
}
// каждые двесекунды запускает readyCheck(), если data.readyCheck=true
let timerId = setTimeout(function tick() {
  if(data.readyCheck)readyCheck()
  timerId = setTimeout(tick, 2000); // (*)
}, 2000);
