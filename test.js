const axios = require('axios')

const URL = 'https://eu-gb.functions.appdomain.cloud/api/v1/web/maxios.code%40gmail.com_dev/assistant-v2/message.json';

const data = JSON.stringify({
  message: 'Buy the milk'
})

axios({
  method: 'post',
  url: URL,
  data,
  headers: {
    "Content-Type": "application/json"
  }
})
  .then((res) => console.log('hello', res.data))
  .catch(console.log)
