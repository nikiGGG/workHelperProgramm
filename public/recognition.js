let clientSpeech = [] // собираются фразы клиента
let speechFlow = [] // собирается информация о текущем диалоге с клиентом
let firstIntent = {
  'адрес': 0,
  'adress': 0,
  'не работа': 0,
  'медленно': 0,
  'телеви': 0,
  'не показыв': 0,
  'канал': 0,
  'интернет': 0,
  'роутер': 0,
  'вай': 0,
  'ошибка': 0,
  'все': 0,
  'перезагру': 0,
  'отключи': 0,
  'растор': 0,
  'балан': 0,
  'денег': 0,// сколько денег на договоре
  'договоре': 0,
  'приостонов': 0,
  'приостонов': 0,
}
// узнает есть ли в answer какие то слова и направляет в следущую ветку
function innerRecog(answer, arr) {
  if (speechFlow[1] === 'onetv') {
    if (findTrue(['один', '1'], answer) === true) {
      speechFlow[1] = true
      dialogConceptTV()
    } else if (findTrue(['два', 'три', 'четыре', '2', '3', '4'], answer) === true) {
      speechFlow[1] = false
      dialogConceptTV()
    } else {
      console.log('один тв? Ошибка:' + answer);
    }
  } else if (speechFlow[3] === 'allchannel') {
    if (findTrue(['нет', 'один', 'несколько'], answer) === true) {
      speechFlow[3] = false
      dialogConceptTV()
    } else if (findTrue('все', answer) === true) {
      speechFlow[3] = true
      dialogConceptTV()
    } else {
      console.log('allchannel? Ошибка:' + answer);
    }

  } else if (speechFlow[4] === 'errorscreen') {
    if (findTrue('сигнала', answer) === true) {
      speechFlow[5] = true
      dialogConceptTV()
    } else {
      speechFlow[5] = false
      dialogConceptTV()
    }

  } else if (speechFlow[5] === 'tvcabel') {
    if (findTrue(['нет', 'нормально', 'трогал'], answer) === true) {
      speechFlow[5] = true
      dialogConceptTV()
    } else {
      speechFlow[5] = false
      dialogConceptTV()
    }
  } else if (speechFlow[1] === 'router') {
    if (findTrue(['да', 'роутер'], answer) === true) {
      speechFlow[1] = true
      dialogConceptINT()
    } else {
      speechFlow[1] = false
      dialogConceptINT()
    }
  } else if (speechFlow[4] === 'lamps') {
    if (findTrue(['одна', 'две', 'три', 'четыре', 'пять', 'все', 'да'], answer) === true) {
      speechFlow[4] = true
      dialogConceptINT()
    } else {
      speechFlow[4] = false
      dialogConceptINT()
    }
  } else if (speechFlow[5] === 'reboot') {
    if (findTrue(['да', 'перезагружал', 'перезагружали', 'перезагружала', 'отключал', 'отключали'], answer) === true) {
      speechFlow[5] = true
      dialogConceptINT()
    } else {
      speechFlow[5] = false
      dialogConceptINT()
    }
  } else if (speechFlow[6] === 'rebootroutL') {
    if (findTrue(['готово', 'перезагрузил', 'подключил'], answer) === true) {
      speechFlow[6] = true
      dialogConceptINT()
    } else {
      console.log('не получили ответа перезагру ли роутер');
    }
  } else if (speechFlow[7] === 'checksocket') {
    pasteText('Не прописано дальше для этой ветки')
  } else if (speechFlow[0] === undefined) {
    firstTouch(answer)
  } else if (true) {

  } else {
    console.log('ошибка в innerRecog()');
  }
}
// работает с первыми фразами клиента
function firstTouch (text) {
  findinObj(text)
  findAdres(text)
  // сделать здесь проверку на адресс
  if (firstIntent['адрес'] === 1) {
    if (speechFlow[0] != undefined) {
      addTip('check')
      //checkContractExist()
        if (firstIntent['интернет'] === 1) {
          if (firstIntent['не работа'] === 1) {
            speechFlow[0] = 'NWork'
            dialogConceptINT()
          } else if (firstIntent['медленно'] === 1) {
            speechFlow[0] = 'Slow'
            dialogConceptINT()
          }
        } else if (firstIntent['телеви'] === 1) {
          if (firstIntent['не работа'] === 1 || firstIntent['не показыв'] === 1) {
            speechFlow[0] = 'check'
            dialogConceptTV()
          }
        } else if (firstIntent['канал'] === 1) {
          if (firstIntent['все'] === 1) {
            speechFlow[0] = 'check'
            dialogConceptTV()
          } else {
            speechFlow[0] = 'check'
            dialogConceptTV()
            console.log('Уточнить все каналы не показывают или некоторые');
          }
        }else {
          console.log('Ошибка в распозновании первой фразы клиента');
        }
    } else if (speechFlow[0] === undefined) {
      addTip('listening')
    } else {
      console.log('ошибка в определении адреса/причины');
    }
  }else if (firstIntent['адрес'] === 0) {
    addTip('adress')
    // не заню зачем это, вроде чтобы когда справшиваешь адрес потом не пспрашиват причину снова
    // if (isTrue (firstIntent) != '') {
    //   console.log('Exist');
    // }
  }
}
// обрабатывает разговор по линии проблем с ТВ
function dialogConceptTV() {
  switch (speechFlow[0]) {
    case undefined:
      console.log('здесь добавить определение ктв или ктв+. пока всегда ктв');
      speechFlow[0] = 'KTV'
      dialogConceptTV()
      break;
    case 'KTV':
    if (speechFlow[1] === undefined) {
          addTip('onetv')
          speechFlow[1] = 'onetv'
          withoutWit = true
    }
    else if (dialogCondition(1, 3)) {
      if (speechFlow[1] === true) {
        addTip('allchannel')
        speechFlow[3] = 'allchannel'
        withoutWit = true
      }
      if (speechFlow[1] === false) {
        console.log('Не расписано дл этого');
      }
    }
    else if (dialogCondition(3, 4)) {
      if (speechFlow[3] === true) {
        addTip('errorscreen')
        speechFlow[4] = 'errorscreen'
        withoutWit = true
      }
      if (speechFlow[3] === false) {
        console.log('Не расписано дл этого');
      }
    }
    else if (dialogCondition(4, 5)) {
      if (speechFlow[4] === true) {
        addTip('tvcabel')
        speechFlow[5] = 'tvcabel'
        withoutWit = true
      }
      if (speechFlow[4] === false) {
        console.log('Не расписано дл этого');
      }
    }
    else if (dialogCondition(5, 6)) {
      if (speechFlow[5] === true) {
        addTip('createsz')
        speechFlow[6] = 'createsz'
        withoutWit = true
      }
      if (speechFlow[5] === false) {
        console.log('Не расписано дл этого');
      }
    }
    else {
      console.log('не сработало dialogConceptTV()' + speechFlow);
    }
      break;
    case 'DTV':
      console.log('Попал в Dom.ruTV');
      break;
    default:
    console.log('default in dialogConceptTV()');
  }

}
// обрабатывает разговор по линии проблем с ИНТ
function dialogConceptINT() {
  switch (speechFlow[0]) {
    case undefined:
    console.log('здесь определить Nwork или Slow. пока всегда Nwork');
    speechFlow[0] = 'NWork'
      break;
    case 'NWork':
    if (speechFlow[1] === undefined) {
      //firstScriptServicesTouch()
      addTip('router')
      speechFlow[1] = 'router'
      withoutWit = true
    } else if (dialogCondition(1, 4)) {
      if (speechFlow[1] === true) {
        addTip('lamps')
        speechFlow[4] = 'lamps'
        withoutWit = true
      } else {
        pasteText('Не написано для нет роутера')
      }
    } else if (dialogCondition(4, 5)) {
      if (speechFlow[4] === true) {
        addTip('reboot')
        speechFlow[5] = 'reboot'
        withoutWit = true
      } else {
        addTip('checksocket')
        speechFlow[5] = false
        speechFlow[6] = false
        speechFlow[7] = 'checksocket'
        withoutWit = true
      }
    } else if (dialogCondition(5, 6)) {
      if (speechFlow[5] === true) {
        console.log('установить проверку на время предыдущей сессии. Сейчас всегда обновилась');
        addTip('checkconn')
        speechFlow[6] = false
        dialogConceptINT()
      } else {
        addTip('rebootroutL')
        speechFlow[6] = 'rebootroutL'
        withoutWit = true
      }
    } else if (dialogCondition(6, 7)) {
      if (speechFlow[6] === true) {
        console.log('тестовая ветка true');
      } else {
        console.log('тестовая ветка false');
      }
    } else {
      console.log('ошибка dialogConceptINT() в case: NWork');
    }
      break;
  }
}
// Ищет в string слово, массив слов 'word'. Если есть возвращает true
function findTrue (word, string) {
  let arr = string.split(' ')
  let bool
  if (Array.isArray(word) === true) {
    bool = word.some(el => bool = arr.some(elem => elem === el))
    return bool
  } else {
    bool = arr.some(elem => elem === word)
    return bool
  }
}
// присваивает true ключам из firstIntent, если найдет их имя в string
function findinObj (string) {
  for (var key in firstIntent) {
    const re = new RegExp(key, 'i');
    if (re.test(string)) {
      firstIntent[key] = 1
    }
  }
}
// возвращает ключи со значением true из obj
function isTrue (obj) {
  let filled = []
  for (var key in obj) {
    if (obj[key] != 0) {
      filled.push(obj[key])
    }
  }
  return filled.join()
}
// ищет в string что-то похожее на адрес
function findAdres(string) {
  //ver.1: /[улица|переулок|проезд|бульвар][А-Яа-я\-]{2,}[\,\s]*[дом]*\s*\d{1,3}[\\\d{1,3}]*[\,\s\-]*[квартира]*\s*\d{1,3}\s*/i
  const adressReg = /[А-Я][А-Яа-я\-]{4,}\s[проспект]*\s*[дом]*\s*\d{1,3}\s*[корпус|\/]*\s*[\d{1,3}|A-Я]*\s*[квартира]*\s*\d{1,5}/
  if (adressReg.test(string)) {
    firstIntent.adress = adressHandler(adressReg.exec(string)[0])
    firstIntent['адрес'] = 1
    speechFlow[0] = 'adressIs'
   } //else {
  //   console.log('проверка адреса не успешна');
  // }
}
// возвращает из witAIadress только название улицы, номера дома и квартиры
function adressHandler(witAIadress) {
  let first = witAIadress.split(' ')
  .filter(word => {
    if (word === 'улица' || word === 'переулок' || word === 'квартира') {
      return false
    }
    return true
  })
  return first
}
// оставляет всё с 5 знака в service и направляет начало диалога
function Nwork (service) {
  witAI.Nwork = service.split('').slice(5).join('')
    if (witAI.adress != '') {
      addTip('check')
    } else if (witAI.adress === '') {
      addTip('adress')
    }
}
// добавляет кнопку-подсказку что говорить
function addTip(tip) {
  speech()
  let tipDiv = document.getElementById('tip')
  const button = document.getElementById(tip)
  const input = document.createElement('input')
  const br = document.createElement('br')
    input.type = 'button'
    input.onclick =  function() {
        audioPlay(tip)
      };
    input.title = button.title
    input.value = button.innerText
  if (tipDiv.innerText === null) {
    tipDiv.appendChild(br)
    tipDiv.appendChild(input)
  } else {
    tipDiv.innerText = null
    tipDiv.appendChild(br)
    tipDiv.appendChild(input)
  }
}
// готовит адрес(оставляет первых 4 символа) для передачи роботу для печати
function prepStreetForRoboAdress(street) {
  let newArr = []
  const arrrrr = street.split('', 4).join('')
  return arrrrr
}
// возващает условие в if для dialog. first - true/false, а second - undefined
function dialogCondition(first, second) {
  return speechFlow[first] === true && speechFlow[second] === undefined || first === false && second === undefined
}
// обновить данные по сессии
function sescionUpdate() {
  if (data.test === true) {
    let localTimer = setTimeout(() => {
    console.log('две секунды для изменения');}, 2000);
    if (data.sescion === true) {
      console.log('условие для sescionUpdate() есть сессия');
    } else {
      console.log('условие для sescionUpdate() нет сессии');
    }
  } else if (data.test === false) {
    send('sescion')
    .then((data) => {
      if (data.sescion === data) {
        console.log('Обновилось');
      } else {
        console.log('Не обновилось');
      }
    })
  }
}
