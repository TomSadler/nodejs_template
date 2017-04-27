require('dotenv').load();
require('winston');
require('winston-loggly');

// Load the Cloudant library.
let Cloudant = require('cloudant/cloudant');

// Initialize Cloudant with settings from .env
let username = process.env.cloudant_username || "nodejs";
let password = process.env.cloudant_password;
let cloudant = Cloudant({account:username, password:password, plugin:'promises'});
let mydb = cloudant.db.use('mydb');

Cloudant({account:username, password:password}, function(err, cloudant) {
    if (err) {
        return console.log('Failed to initialize Cloudant: ' + err.message);
    }});

mydb.list().then(function(data) {
    console.log(data);
}).catch(function(err) {
    console.log('something went wrong', err);
});
