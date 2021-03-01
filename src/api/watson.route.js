import express from 'express'
import assistant from '../services/watson-assistant';
require('dotenv').config() // load .env file

const sendMessage = async (req, res, next) => {
  console.log('hello')
  new assistant()
    .message(req.body.message)
    .then(response => {
      console.log(response.headers);
      res.json(response)
      next();
    })
    .catch((e) => {
      console.log(e);
      res.setStatues(400)
      next();
    })
}

const router = express.Router()

router.post('/sendMessage', sendMessage) // validate and register

export default router;
