const fs = require('fs');
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const CHUNK_SIZE = 4000;

// Получаем ID каталога и IAM-токен из переменных окружения.
const folderId = process.env.FOLDER_ID;
const iamToken = process.env.IAM_TOKEN;

// Читаем файл, указанный в аргументах.
const audio = fs.readFileSync(process.argv[2]);

// Задать настройки распознавания.
const request = {
    config: {
        specification: {
            languageCode: 'ru-RU',
            profanityFilter: true,
            model: 'general',
            partialResults: true,
            audioEncoding: 'LINEAR16_PCM',
            sampleRateHertz: '8000'
        },
        folderId: folderId
    }
};

// Частота отправки аудио в миллисекундах.
// Для формата LPCM частоту можно рассчитать по формуле: CHUNK_SIZE * 1000 / ( 2 * sampleRateHertz);
const FREQUENCY = 250;

const serviceMetadata = new grpc.Metadata();
serviceMetadata.add('authorization', `Bearer ${iamToken}`);

const packageDefinition = protoLoader.loadSync('../yandex/cloud/ai/stt/v2/stt_service.proto', {
    includeDirs: ['node_modules/google-proto-files', '..']
});
const packageObject = grpc.loadPackageDefinition(packageDefinition);

// Установить соединение с сервером.
const serviceConstructor = packageObject.yandex.cloud.ai.stt.v2.SttService;
const grpcCredentials = grpc.credentials.createSsl(fs.readFileSync('./roots.pem'));
const service = new serviceConstructor('stt.api.cloud.yandex.net:443', grpcCredentials);
const call = service['StreamingRecognize'](serviceMetadata);

// Отправить сообщение с настройками распознавания.
call.write(request);

// Прочитать аудиофайл и отправить его содержимое порциями.
let i = 1;
const interval = setInterval(() => {
    if (i * CHUNK_SIZE <= audio.length) {
        const chunk = new Uint16Array(audio.slice((i - 1) * CHUNK_SIZE, i * CHUNK_SIZE));
        const chunkBuffer = Buffer.from(chunk);
        call.write({audioContent: chunkBuffer});
        i++;
    } else {
        call.end();
        clearInterval(interval);
    }
}, FREQUENCY);

// Обработать ответы сервера и вывести результат в консоль.
call.on('data', (response) => {
    console.log('Start chunk: ');
    response.chunks[0].alternatives.forEach((alternative) => {
        console.log('alternative: ', alternative.text)
    });
    console.log('Is final: ', Boolean(response.chunks[0].final));
    console.log('');
});

call.on('error', (response) => {
    // Обрабатываем ошибки
    console.log(response);
});
