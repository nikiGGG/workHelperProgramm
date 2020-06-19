// переменные для информации с принт скрина
const { createWorker } = require('tesseract.js');

const worker = createWorker();

(async () => {
  await worker.load();
  await worker.loadLanguage('rus');
  await worker.initialize('rus');
  const { data: { text } } = await worker.recognize('img.jpg');
  console.log(text);
  await worker.terminate();
})();
