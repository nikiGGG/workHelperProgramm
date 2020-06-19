// переменные для информации с принт скрина
const { createWorker } = require('tesseract.js');

const worker = createWorker();

module.exports = async function analizer (pic) {
  var imgBytes = new Uint8ClampedArray(pic.image);
  var imgData = new ImageData(imgBytes,pic.width, pic.height);
  const imageBitmapPromise = createImageBitmap(imgData);
  await worker.load();
  await worker.loadLanguage('rus');
  await worker.initialize('rus');
  const { data: { text } } = await worker.recognize(imageBitmapPromise);
  return text
  await worker.terminate();
}
