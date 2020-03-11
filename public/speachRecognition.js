// Создаем распознаватель
var recognizer = new webkitSpeechRecognition();

// Ставим опцию, чтобы распознавание началось ещё до того, как пользователь закончит говорить
recognizer.interimResults = true;

// Какой язык будем распознавать?
recognizer.lang = 'ru-Ru';

// Используем колбек для обработки результатов
recognizer.onresult = function (event) {
  var result = event.results[event.resultIndex];
  if (result.isFinal) {
    if (withoutWit === false) {
      getIntent(result[0].transcript)
      pasteText('КЛИЕНТ: ' + result[0].transcript);
    } else if (withoutWit === true) {
      innerRecog(result[0].transcript)
    } else {
      console.log('recognizer не выполнился');
    }
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




// Синтез речи
var synth = window.speechSynthesis;
var utterance = new SpeechSynthesisUtterance('How about we say this now? This is quite a long sentence to say.');

function talk () {
  synth.speak (utterance);
}

function stop () {
  synth.pause();
}
