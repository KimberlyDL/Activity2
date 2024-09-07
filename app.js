const server = require('./src/server');
const PORT = process.env.PORT || 8000

//for creating keys
// const crypto = require('crypto');
// const secret = crypto.randomBytes(32).toString('hex');
// console.log(secret);

//server listen
const startServer = () => {
    server.listen(PORT, (error) => {
        if (error)
            throw error
        console.log('Server created successfully.')
    });

};

startServer();
































// const path = require('path');


// const Logger = require('./logger');
// const logger = new Logger();

// logger.on('newEvent',(arg) => {
//     console.log('Listener called', arg);
// })

// logger.log('Hi Kimmm');

// var pathObj = path.parse(__filename);
// console.log(pathObj);
// log('Hello Kim');

