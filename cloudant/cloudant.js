require('dotenv').load();

// Load the Cloudant library.
let Cloudant = require('cloudant/cloudant');

// Initialize Cloudant with settings from .env
let username = process.env.cloudant_username || "nodejs";
let password = process.env.cloudant_password;
let cloudant = Cloudant({account:username, password:password, plugin:'promises'});

Cloudant({account:username, password:password}, function(err, cloudant) {
    if (err) {
        return console.log('Failed to initialize Cloudant: ' + err.message);
    }

// Remove any existing database called "alice".
    cloudant.db.destroy('alice', function (err) {

        // Create a new "alice" database.
        cloudant.db.create('alice', function () {

            // Specify the database we are going to use (alice)...
            let alice = cloudant.db.use('alice')

            // ...and insert a document in it.
            alice.insert({crazy: true}, 'rabbit', function (err, body, header) {
                if (err) {
                    return console.log('[alice.insert] ', err.message);
                }

                console.log('You have inserted the rabbit.');
                console.log(body);

            });
        });
    });
});
