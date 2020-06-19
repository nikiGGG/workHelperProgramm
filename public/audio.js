// код для воспроизведения аудио путь 'audio/+ name +.m4a'
const aud = new Audio()
aud.addEventListener("ended", function() {
  //if(aud.src === 'http://localhost:3000/audio/day.mp3' || aud.src === 'http://localhost:3000/audio/evning.mp3') checkContractExist();
  speech()
})
function audioPlay(name) {
  if(recognizing)speech()
  if (data.noSound === false) {
    aud.src = 'audio/' + name + '.mp3'
    aud.play()
    pasteText(name, true)
    clientSpeech.push(name)
  } else if (data.noSound === true) {
    //console.log('audioPlay(): audio/' + name + '.m4a')
    pasteText(name, true)
  } else {
    console.log('Ошибка в audioPlay(name) name:' + name + ', data.noSound:' + data.noSound);
  }
}
// озвучивает циру num
function tryer(num) {
  let number = num.split('')
  number.reverse()
  console.log(number);
  let tracks = []
  number.forEach((element, ind) => {
    switch (ind) {
      case 0:
        tracks.unshift('audio/'+element+'.mp3')
        break;
      case 1:
        tracks.unshift('audio/'+element+'0.mp3')
        break;
      case 2:
        tracks.unshift('audio/'+element+'00.mp3')
        break;
      case 3:
        tracks.unshift('audio/'+element+'000.mp3')
        break;
      default:
        console.log('число больше 9999');
    }
  })
  var player = new Audio()
  player.autoplay = true
  var current = 0;
  player.src = tracks[0];
  player.onended = function() {
      current++;
        if (current < tracks.length){
          player.src = tracks[current];
          player.play();}
          }
}

/* Часть для произношения цифр
// берет число из id='cifr', делит его на цифры и отправляет в tryer(num, num0, num00, num000)
function speakCifr() {
  let sp = document.getElementById('cifr').value.split('')
  switch (sp.length) {
    case 1:
    tryer(sp[0])
      break;
    case 2:
    tryer(sp[1], sp[0] + '0')
      break;
    case 3:
    tryer(sp[2], sp[1] + '0', sp[0] + '00')
      break;
    case 4:
      tryer(sp[3], sp[2] + '0', sp[1] + '00', sp[0] + '000')
      break;
  }
}
<button onclick="speech()">Слушать</button> <br>
<input type='text' id="cifr" value="182">
<input type="button" onclick="speakCifr()" value="Speak">
<audio id="player" autoplay></audio>
*/

/* начало для Yandex SpeecKit
function micCapture() {
  mediaRecorder.ondataavailable = function(e) {
    this.chunks.push(e.data);
    if (this.chunks.length >= 400)
    {
        this.sendData(this.chunks);
        this.chunks = [];
    }
  };
  mediaRecorder.sendData = function(buffer) {
      let blob = new Blob(buffer, { 'type' : 'audio/ogg' });
      console.log(blob);
      // const resp = await fetch('http://localhost:3000/' + name, { method: 'get' })
      // const dataFetch = await resp.json()
      // console.log(dataFetch);
      // return dataFetch
  }
}
navigator.mediaDevices.getUserMedia({ audio: true})
    .then(stream => {
        const mediaRecorder = new MediaRecorder(stream);

        document.querySelector('#start').addEventListener('click', function(){
            mediaRecorder.start();
        });
        let audioChunks = [];
        mediaRecorder.addEventListener("dataavailable",function(event) {
            audioChunks.push(event.data);
        });

        document.querySelector('#stop').addEventListener('click', function(){
            mediaRecorder.stop();
        });

        mediaRecorder.addEventListener("stop", function() {
            const audioBlob = new Blob(audioChunks, {
                type: 'audio/wav'
            });

            let fd = new FormData();
            fd.append('voice', audioBlob);
            sendVoice(fd);
            audioChunks = [];
        });
    });
async function sendVoice(form) {
    let promise = await fetch('http://localhost:3000/voice', {
        method: 'POST',
        body: form});
    if (promise.ok) {
        let response =  await promise.json();
        console.log(response.data);
        let audio = document.createElement('audio');
        audio.src = response.data;
        audio.controls = true;
        audio.autoplay = true;
        document.querySelector('#messages').appendChild(audio);
    }
}
*/
