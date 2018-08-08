var events = require('events');
var eventEmitter = new events.EventEmitter();
var i = 1;
var myEventHandle = function() {

    setTimeout(function() {
        console.log(i);
        i++;
        if (i <= 5) {
            myEventHandle();
        } else {
            eventEmitter.emit('count_completed');
        }
    }, 800);

}
eventEmitter.on('count', myEventHandle);
eventEmitter.emit('count');
eventEmitter.on('count_completed', function() {
    console.log("count completed");
});