/*// Создаем распознаватель
var recognizer = new webkitSpeechRecognition();
// Ставим опцию, чтобы распознавание не началось ещё до того, как пользователь закончит говорить
recognizer.interimResults = false;
// Какой язык будем распознавать?
recognizer.lang = 'ru-Ru';
// заканчивает распознование по завершению вфразы клиента(false) или распознаёт постоянно (true)
recognizer.continuous = false;

// Используем колбек для обработки результатов
recognizer.onresult = function (event) {
  var result = event.results[event.resultIndex];
  if (result.isFinal) {
    pasteText('КЛИЕНТ: ' + result[0].transcript);
    if (/[a-z]{3,}/.test(clientSpeech[clientSpeech.length-1])) {
      clientSpeech.push(result[0].transcript)
    } else {
    clientSpeech[clientSpeech.length-1] += result[0].transcript
    }
    innerRecog(result[0].transcript)
  }
};

function speech () {
  if (data.noSound === true) {
    // не запускается recognizer. ожидается ответ в строке input
  } else {
    // Начинаем слушать микрофон и распознавать голос
    recognizer.start();
  }
}
*/

var recognizing;
var recognition = new webkitSpeechRecognition();
recognition.interimResults = true;
recognition.lang = 'ru-Ru';
recognition.continuous = true;
reset();
recognition.onend = reset;

// recognition.onresult = function (event) {
//   var result = event.results[event.resultIndex];
//   if (result.isFinal) {
//     pasteText('КЛИЕНТ: ' + result[0].transcript);
//     if (/[a-z]{3,}/.test(clientSpeech[clientSpeech.length-1])) {
//       clientSpeech.push(result[0].transcript)
//     } else {
//     clientSpeech[clientSpeech.length-1] += result[0].transcript
//     }
//     innerRecog(result[0].transcript)
//   }
// };

recognition.onresult = function (event) {
  var result = event.results[event.resultIndex];
  if (result.isFinal) {
    document.getElementById('ptext').innerHTML = ''
    pasteText('КЛИЕНТ: ' + result[0].transcript)
    if (/[a-z]{3,}/.test(clientSpeech[clientSpeech.length-1])) {
      clientSpeech.push(result[0].transcript)
    } else {
    clientSpeech[clientSpeech.length-1] += result[0].transcript
    }
    if(/[a-z]{3,}/.test(clientSpeech[clientSpeech.length-1]) != true) innerRecog(clientSpeech[clientSpeech.length-1])
  } else {
    const currentSpeech = document.getElementById('text')
    if (currentSpeech.childElementCount  != 0) {
      document.getElementById('ptext').innerHTML = result[0].transcript
    } else {
      const p = document.createElement('p')
      p.id = 'ptext'
      p.innerHTML = result[0].transcript
      currentSpeech.appendChild(p)
    }
  }
}

function reset() {
  recognizing = false;
}

function speech() {
  if (recognizing) {
    recognition.stop();
    reset();
  } else {
    recognition.start();
    recognizing = true;
  }
}

/* Синтез речи
// Синтез речи
var synth = window.speechSynthesis;
var utterance = new SpeechSynthesisUtterance('How about we say this now? This is quite a long sentence to say.');

function talk () {
  synth.speak (utterance);
}

function stop () {
  synth.pause();
}
*/
