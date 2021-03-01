const AssistantV2 = require('ibm-watson/assistant/v2');
const { IamAuthenticator } = require('ibm-watson/auth');
require('dotenv').config() // load .env file

const settings = {
  version: '2020-09-24',
  apiKey: process.env.WATSON_ASSISTANT_API_KEY,
  serviceUrl: process.env.WATSON_ASSISTANT_URL,
  assistantId: process.env.WATSON_ASSISTANT_ID,
  sessionId: ''
}

let cache = {};
var assistant = function(instance) {
  if (cache.instance) {
    this.instance = cache.instance;
  } else {
    cache.instance = new AssistantV2({
      version: settings.version,
      authenticator: new IamAuthenticator({
        apikey: settings.apiKey
      }),
      serviceUrl: settings.serviceUrl,
      disableSslVerification: process.env.NODE_ENV !== 'production',
    })

    this.instance = cache.instance;
  }
}

assistant.prototype.createSession = function() {
  return new Promise((resolve, reject) => {
    this.instance.createSession({
      assistantId: settings.assistantId
    }).then(res => {
      console.log(JSON.stringify(res.result, null, 2));

      // set the session id to the assistant instance
      settings['sessionId'] = res.result['session_id']

      resolve(JSON.stringify(res.result, null, 2))
    }).catch(err => {
      reject(err)
    });
  })
}

/**
 * @param message {String}
 * @param opts {Object} if you want to use session based conversation pass {session: true}
 **/


assistant.prototype.message = function(message, opts = {}) {
  let method = 'messageStateless';
  const params = {
    assistantId: settings.assistantId,
    input: {
      'message_type': 'text',
      'text': message
    }
  }
  if (opts.session) {
    if (settings.sessionId) throw new Error('use createSession() method to create a session')
    params.sessionId = settings.sessionId;
    method = 'message'
  }
  return new Promise((resolve, reject) => {
    this.instance[method](params)
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
        resolve(res.result)
      })
      .catch(err => {
        console.log(err);
        reject(err)
      });
  })
}

export default assistant;
