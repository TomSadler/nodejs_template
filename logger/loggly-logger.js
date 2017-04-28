let winston = require('winston');

require('winston-loggly');

let logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({
            level: 'debug'
        }),

        winston.add(winston.transports.Loggly, {
            token: "fb1e29f5-a3f0-4b6a-a9fa-48d1afe0da0d",
            subdomain: "capgemini93",
            tags: ["Winston-NodeJS"],
            json:true,
            level: 'debug',
            auth: {
                username:'Cap',
                password:'Capgemini1'
            }
        })

    ]
});

winston.log('info',"Hello World from Node.js!");




