const { IamTokenManager } = require('ibm-watson/auth');

function main(params) {
  return new Promise((resolve, reject) => {
    try {
    const sttAuthenticator = new IamTokenManager({
      apikey: params.stt_iam_apikey
    });

    return sttAuthenticator
      .requestToken()
      .then(({ result }) => {
        resolve({
          accessToken: result.access_token,
          url: params.url
        });
      })
      .catch(err => {
        reject(err)
      });
    } catch(e) {
      reject(e)
    }
  })
}
