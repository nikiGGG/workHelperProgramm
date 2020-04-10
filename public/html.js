'use strict'
// функция отправляет запрос на сервер
async function send(name) {
  if (data.test === true) {
    console.log('не будет отправлено на сервер: ' + name);
    return data.test
  } else {
    const resp = await fetch('http://localhost:3000/' + name, { method: 'get' })
    const dataFetch = await resp.json()
    console.log(dataFetch);
    return dataFetch
  }
}
// х, н где находяться кнопки на удаленке
let notTest = {
  'top': '330/340',
  'anticipation': '330/420',
  'street': '180/320',
  'info': '330/365',
  'pril': '380/365',
  'diagnostic': '450/365',
  'messages': '520/365',
  'equip': '590/365',
  'IKTV': '650/365'
}
// данные для правой колонки
let data = {
  'test': false,
  'noSound': true,
  'ready': true,
  'admin': 'up',
  'oper': 'up',
  'crash': false,
  'sescion': false,
  'balanse': 0,
  'debt': 0
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
          document.getElementById('dialog').remove();
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
  send('pxlColor/1453/105')
  .then(res => {
    if (res === '#529d14' && data.ready === false) {
      data.ready = true
      update()
      start()
    } else if (res === '#c5740f' && data.ready === true) {
      data.ready = false
      update()
      console.log('stop');
    } else if (res === '#b51a01') {
      console.log('Не в работе');
      update()
    } else {
      console.log('Не подключён');
    }
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
function start() {
  audioPlay('evning')
  aud.onended = speech()
}
// функция, выполняется при завершенном звонке
function stop() {
speechFlow = [];
}
// возвращает title(что говориться в записи)
function getFrase(name) {
  audioPlay(name)
  return document.getElementById(name).title
}

/*let timerId = setTimeout(function tick() {
  readyCheck()
  timerId = setTimeout(tick, 2000); // (*)
}, 2000);*/
