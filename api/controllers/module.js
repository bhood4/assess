 'use strict';
    // Include our "db"
    var db = require('../../config/db')();
    // Exports all the functions to perform on the db
    module.exports = {getAllModule, saveModule, getOneModule, updateModule, deleteModule};

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
