import path from 'path';
import express from 'express';
import app, { start } from './src/services/express';

require('dotenv').config({path: path.resolve(__dirname, '.env')}) // load .env file

// serve static assets normally
app.use(express.static(__dirname + '/dist'));

// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
app.get('*', function (request, response) {
  response.sendFile(path.resolve(__dirname, 'index.html'));
});
// start app and connect to database

start(app)

export default app;

