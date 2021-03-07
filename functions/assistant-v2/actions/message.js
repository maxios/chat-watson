const AssistantV2 = require('ibm-watson/assistant/v2');
const { IamAuthenticator } = require('ibm-watson/auth');

function main(params) {
  return new Promise((resolve, reject) => {
    const { assistantId, version, apikey, message, url } = params;
    console.log(params)
    let method = 'messageStateless';
    const instance = new AssistantV2({
      version,
      authenticator: new IamAuthenticator({
        apikey
      }),
      serviceUrl: url,
      disableSslVerification: true,
    })

    const options = {
        assistantId,
        input: {
          'message_type': 'text',
          'text': message
        }
    }
    instance.messageStateless(options)
      .then(res => {
        console.log(JSON.stringify({body: res.result}));
        resolve(res.result)
      })
      .catch(err => {
        console.log(err);
        reject(err)
      });
  });
}
