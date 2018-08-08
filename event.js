var events = require('events');
var eventEmitter = new events.EventEmitter();
var myEventHandle = function (){
    console.log('I hear a scream!');
}
eventEmitter.on('scream',myEventHandle);
eventEmitter.emit('scream');
