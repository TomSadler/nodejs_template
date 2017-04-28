let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let logger = require('logger/logger');
let index = require('./routes/index');
let users = require('./routes/users');

let app = express();

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Swagger Import
let swaggerJSDoc = require('swagger-jsdoc');

// Swagger Definition
let swaggerDefinition =  config.swagger;

// Options for the swagger docs
let options = {
    swaggerDefinition: swaggerDefinition,
    apis: ['app.js'], // Path to API Documentation
};

// Initialize Swagger-jsdoc
let swaggerSpec = swaggerJSDoc(options);

// Server Swagger
app.get('/swagger.json', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});

/**
 * @swagger
 * /example/{id} :
 *   get:
 *     tags:
 *       - ExampleAPI
 *     description: Returns the whole cloudant document
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: The Id for the particular cloudant document you wish to update
 *         in: path
 *         type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Successfully created
 */
//GET's the contacts details
app.get('/' + apiPath.base + '/:id', function(request, response){

    let responseBody = {};

    cloudantIntegration.getDoc(request.params.id, function(err, doc){
        if (!err && doc){
            response.status(config.web.status.success.ok.code);
            responseBody = doc;
        } else if (err){
            response.status(config.web.status.failure.notFound.code);
            responseBody.message = config.web.status.failure.notFound.message;
            responseBody.error = err;
        }

        response.setHeader('Content-Type', 'application/json');
        response.write(JSON.stringify(responseBody));
        response.end();
        return;

    });
});



module.exports = app;
