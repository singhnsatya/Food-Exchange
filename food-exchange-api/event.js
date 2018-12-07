const EventEmitte = require('events');
const emitter = new EventEmitte();



emitter.on("test", function() {
  console.log('data')
});

emitter.emit("test")
