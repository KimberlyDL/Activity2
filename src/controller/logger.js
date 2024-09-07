const EventEmitter = require('events');

class Logger extends EventEmitter {
    log(message) {
        this.emit('newEvent', {
            id: 1, message: message, url: "http://www.iopost.com"
        });
    }
}


module.exports = Logger;
