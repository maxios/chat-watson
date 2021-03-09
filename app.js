const { IamAuthenticator } = require('ibm-watson/auth');
const SpeechTextV1 = require('ibm-watson/speech-to-text/v1');

const speechToText = new SpeechTextV1({
  authenticator: new IamAuthenticator({ apikey: '_Zg7GKHkw8tvHCZ7NoHMjwgxp8OCx2KJhxQCO56y9q3O' }),
  serviceUrl: 'https://api.eu-gb.speech-to-text.watson.cloud.ibm.com/instances/43c3fc70-780a-4353-8fcc-e4cf3fdf62b0'
})

const recognizeStream =  speechToText.recognizeUsingWebSocket({
  'content_type': 'audio/l16; rate=44100; channels=2',
  'inerim_results': true
})

let mic = require('microphone');
mic.startCapture();

mic.audioStream.pipe(recognizeStream).pip(process.stdout);
