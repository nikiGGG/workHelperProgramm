// код для воспроизведения аудио путь 'audio/+ name +.m4a'
const aud = new Audio()
function audioPlay(name) {
  if (data.noSound === false) {
    aud.src = 'audio/' + name + '.m4a'
    aud.play()
    pasteText(name, true)
  } else if (data.noSound === true) {
    //console.log('audioPlay(): audio/' + name + '.m4a')
    pasteText(name, true)
  } else {
    console.log('Ошибка в audioPlay(name) name:' + name + ', data.noSound:' + data.noSound);
  }
}

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

function tryer(num, num0, num00, num000) {
  let deleted = 0
  var tracks = [num000 + '.m4a', num00 + '.m4a', num0 + '.m4a', num + '.m4a'];
  tracks.forEach((element, ind) => {
    if (element === 'undefined.m4a') {
      deleted++
    }
  })
  console.log('Первоначальный массив: ' + tracks);
  tracks.splice(0,  deleted)
  console.log('Измененный массив: ' + tracks);
  var player = document.getElementById('player');
  var current = 0;
  player.src = tracks[0];
  player.onended = function() {
      current++;
        if (current >= tracks.length) current = 0;
          player.src = tracks[current];
            player.play();
          }
}

/* Часть для произношения цифр
<button onclick="speech()">Слушать</button> <br>
<input type='text' id="cifr" value="182">
<input type="button" onclick="speakCifr()" value="Speak">
<audio id="player" autoplay></audio>
*/
