let winston = require('winston');

let logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({
            level: 'debug',
            colorize: true,
            handleExceptions: true
        }),
        new (winston.transports.File)({
            filename: './data/file.log',
            level: 'debug',
            handleExceptions: true

        })
],
    exitOnError: false
});

// let options = {
//     limit:50,
//     start: 0,
//     fields: ['message'],
//     from: new Date - (30 * 24) * 60 * 60 *1000
// };
//
// logger.query(options, function(err,results) {
//     if (err) {
//         throw err;
//     }
//
//     let regex = /(sqlite3|database|trace\.js)/gmi;
//     let matchCount = 0;
//
//     for (let i = 0; i < results.file.length; i++) {
//         let matches = results.file[i].message.match(regex);
//         if (matches !== null) {
//             matchCount++;
//         }
//     }
 //   console.log('Results found:' + matchCount);
//});

logger.debug('Debugging info');
logger.verbose('Verbose info');
logger.info('Hello world');
logger.warn('Warning message');
logger.error('Error info');

module.exports = winston;

