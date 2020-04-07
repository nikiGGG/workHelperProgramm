let speechFlow = []//special for dialog info

let witAI = {
  'adress': '',
  'router': '',
  'Nwork': '',
  'reboot': '',
  'TVcount': ''
}
let withoutWit = false

// Берет речь из recognizer и прогоняет через Wit.ai
function getIntent(clientSpeech) {
  if(withoutWit === true) {
    innerRecog(clientSpeech)
  } else {
    const q = encodeURIComponent(clientSpeech);
    const uri = 'https://api.wit.ai/message?q=' + q;
    const auth = 'Bearer ' + 'ZRDTQW3QMWTFFKWIQ2KIZVK2IMYKYBTU';
    fetch(uri, {headers: {Authorization: auth}})
      .then(res => res.json())
      .then(res => recog(res.entities, clientSpeech));
      //entities.intent[0]: {confidence: 0.63439104734357, value: "NworkINT"}
  }
}

// Распределяет entities, полученные из Wit.ai
function recog(entities) {
  for (var key in entities) {
    switch (key) {
      case 'adress':
      if (entities.adress[0].confidence > 0.8 && filledIs(witAI) === '') {
        witAI.adress = entities.adress[0].value
        console.log('recog(): ' + Math.round(entities.adress[0].confidence*100) + '% ' + entities.adress[0].value);
        audioPlay('listening')
      } else if (entities.adress[0].confidence > 0.8 && filledIs(witAI) === 'TV' || filledIs(witAI) === 'INT') {
        witAI.adress = adressHandler(entities.adress[0].value)
        audioPlay('check');
        send('adress/' + prepStreetForRoboAdress(witAI.adress[0]) + '/' + witAI.adress[1] + '/' + witAI.adress[2])
        .then(() => determinationOfDialogConcept());
      }else {
        console.log('adress < 0.8');
      }
        break;
      case 'intent':
      if (entities.intent[0].confidence > 0.8 && filledIs(witAI) === '') {
        switch (entities.intent[0].value) {
          case 'NworkTV':
            Nwork('NworkTV')
            console.log('здесь добавить KTB intent' );
            //console.log('recog(): ' + Math.round(entities.intent[0].confidence*100) + '% ' + entities.intent[0].value);
            break;
          case 'NworkINT':
            Nwork('NworkINT')
            //console.log('recog(): ' + Math.round(entities.intent[0].confidence*100) + '% ' + entities.intent[0].value);
            break;
          default:
        }
      } else {
        console.log('intent < 0.8');
      }
        break;
    }
  }
}

// выяснет пустой ил нет обьект entities
function filledIs(entities) {
  let filled = []
  for (var key in entities) {
    if (entities[key] != '') {
      filled.push(entities[key])
    }
  }
  return filled.join()
}
