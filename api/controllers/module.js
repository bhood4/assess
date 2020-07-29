 'use strict';
    // Include our "db"
    var db = require('../../config/db')();
    // Exports all the functions to perform on the db
    module.exports = {getAllModule, saveModule, getOneModule, updateModule, deleteModule, loadModule};

    function getAllModule(req, res, next) {
      res.json({ modules: db.find()});
    }
    function saveModule(req, res, next) {
        res.json({success: db.save(req.body), description: "Module added to the list!"});
    }
    function getOneModule(req, res, next) {
        var id = req.swagger.params.id.value; //req.swagger contains the path parameters
        var module = db.find(id);
        if(module) {
            res.json(module);
        }else {
            res.status(204).send();
        }        
    }
    function updateModule(req, res, next) {
        var id = req.swagger.params.id.value; //req.swagger contains the path parameters
        var module = req.body;
        if(db.update(id, module)){
            res.json({success: 1, description: "Module updated!"});
        }else{
            res.status(204).send();
        }
    }
    function deleteModule(req, res, next) {
        var id = req.swagger.params.id.value; //req.swagger contains the path parameters
        if(db.remove(id)){
            res.json({success: 1, description: "Module deleted!"});
        }else{
            res.status(204).send();
        }
    }
    function loadModule(req, res, next) {
        // https://raw.githubusercontent.com/bhood4/assess/master/seed/module.yaml
        var url = req.body.url;
        var clean = req.body.clean;

        const yaml = require('js-yaml');
        var request = require('request');
        request.get(url, function (error, response, body) {
          if (!error && response.statusCode == 200) {
            var fileContents = body;
            let obj = yaml.safeLoadAll(fileContents)[0].modules;
            for(var i in obj)
            {
              db.save(obj[i]);
            }
          } else {
            throw new Error('error loading '+url);
          }
        });
        res.status(204).send();
    }
