const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const Stream = require('./stream/socket-io');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('./cors');
const routes = require('./routes');
const app = express()
const eventEmitter = require('events');
global.Emitter = new eventEmitter();
global.USERS = {};


app.use(cors);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(routes);
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/foodexchange', {"useNewUrlParser": true })
.then(db => {
  console.log('connected to database')
}).catch(err => {
  console.log('cannot connect to database')
})

const server = http.createServer(app)
const io = socketIO(server);
const StreamSocket = new Stream(io);

const eventListeners = require('./stream/eventListeners');

const port = process.env.PORT || 3000;

server.listen(port, () => console.log(`Listening on port ${port}`))