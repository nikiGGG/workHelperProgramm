// переменные для информации с принт скрина
const { createWorker } = require('tesseract.js');

const worker = createWorker();

module.exports = async function analizer (pic) {
    await worker.load();
    await worker.loadLanguage('rus');
    await worker.initialize('rus');
    const { data: { text } } = await worker.recognize(pic);
    return text
    await worker.terminate();
}
