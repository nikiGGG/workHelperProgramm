// переменные для информации с принт скрина
const { createWorker } = require('tesseract.js');

const worker = createWorker();

exports.analizer = async function (picture) {
  (async () => {
    await worker.load();
    await worker.loadLanguage('rus');
    await worker.initialize('rus');
    const { data: { text } } = await worker.recognize(picture);
    console.log(text);
    return text
    await worker.terminate();
  })();
}
