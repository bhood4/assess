'use strict';

var multer = require('multer');
var SwaggerExpress = require('swagger-express-mw');
var app = require('express')();
module.exports = app; // for testing

var config = {
  appRoot: __dirname // required config
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }
 
// https://github.com/swagger-api/swagger-node/issues/338 for upload 
  let storage = multer.memoryStorage(); //you might need to change this, check multer docs
  let mult = multer({ //you might need to change this, check multer docs
    storage: storage,
    limits: {
      fileSize: 52428800
    }
  }).fields([{name: "upfile"}]);
  app.use(mult);

  // install middleware
  swaggerExpress.register(app);

  var port = process.env.PORT || 10010;
//  var cors = require('cors');
//  app.use(cors());
  app.listen(port);

  if (swaggerExpress.runner.swagger.paths['/question']) {
    console.log('try this:\ncurl http://127.0.0.1:' + port + '/question');
  }
});
