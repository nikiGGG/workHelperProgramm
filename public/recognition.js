// узнает есть ли в answer какие то слова и направляет в следущую ветку
function innerRecog(answer, arr) {
  if (speechFlow[1] === 'onetv') {
    if (findTrue('один', answer) === true) {
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
  } else {
    console.log('ошибка в innerRecog()');
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
          audioPlay('onetv')
          speechFlow[1] = 'onetv'
          withoutWit = true
          aud.onended = speech()
    }
    else if (dialogCondition(1, 3)) {
      if (speechFlow[1] === true) {
        audioPlay('allchannel')
        speechFlow[3] = 'allchannel'
        withoutWit = true
        aud.onended = speech()
      }
      if (speechFlow[1] === false) {
        console.log('Не расписано дл этого');
      }
    }
    else if (dialogCondition(3, 4)) {
      if (speechFlow[3] === true) {
        audioPlay('errorscreen')
        speechFlow[4] = 'errorscreen'
        withoutWit = true
        aud.onended = speech()
      }
      if (speechFlow[3] === false) {
        console.log('Не расписано дл этого');
      }
    }
    else if (dialogCondition(4, 5)) {
      if (speechFlow[4] === true) {
        audioPlay('tvcabel')
        speechFlow[5] = 'tvcabel'
        withoutWit = true
        aud.onended = speech()
      }
      if (speechFlow[4] === false) {
        console.log('Не расписано дл этого');
      }
    }
    else if (dialogCondition(5, 6)) {
      if (speechFlow[5] === true) {
        audioPlay('createsz')
        speechFlow[6] = 'createsz'
        withoutWit = true
        aud.onended = speech()
      }
      if (speechFlow[5] === false) {
        console.log('Не расписано дл этого');
      }
    }
    else {
      console.log('не сработало dialogConceptTV()' + speechFlow);
    }
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
    dialogConceptINT()
      break;
    case 'NWork':
    if (speechFlow[1] === undefined) {
      audioPlay('router')
      speechFlow[1] = 'router'
      withoutWit = true
      aud.onended = speech()
    } else if (dialogCondition(1, 4)) {
      if (speechFlow[1] === true) {
        audioPlay('lamps')
        speechFlow[4] = 'lamps'
        withoutWit = true
        aud.onended = speech()
      } else {
        console.log('Не написано для нет роутера speechFlow[1]=false');
      }
    } else if (dialogCondition(4, 5)) {
      if (speechFlow[4] === true) {
        audioPlay('reboot')
        speechFlow[5] = 'reboot'
        withoutWit = true
        aud.onended = speech()
      } else {
        audioPlay('checksocket')
        speechFlow[5] = false
        speechFlow[6] = false
        speechFlow[7] = 'checksocket'
        console.log('дальше не прописано');
        withoutWit = true
        aud.onended = speech()
      }
    } else if (dialogCondition(5, 6)) {
      if (speechFlow[5] === true) {
        sescionUpdate()
        console.log('дальше не прописано');
        speechFlow[6] = true
        dialogConceptINT()
      } else {
        audioPlay('rebootroutL')
        speechFlow[6] = 'rebootroutL'
        withoutWit = true
        aud.onended = speech()
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

// Найти в string слово word. Если есть возвращает true
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
      audioPlay('check')
    } else if (witAI.adress === '') {
      audioPlay('adress')
    }
}

// обрабатывает разговор по линии проблем с ТВ
function determinationOfDialogConcept() {
  if (witAI.Nwork === 'INT') {
    dialogConceptINT()
  } else if (witAI.Nwork === 'TV') {
    dialogConceptTV()
  }
}

// добавляет кнопку-подсказку что говорить
function addTip(tip) {
  let tipDiv = document.getElementById('tip')
  const button = document.getElementById(tip)
  const input = document.createElement('input')
    input.type = 'button'
    input.onclick =  function() {
        audioPlay(tip)
      };
    input.title = button.title
    input.value = button.innerText
  if (tipDiv.innerText === null) {
    tipDiv.appendChild(input)
  } else {
    tipDiv.innerText = null
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
