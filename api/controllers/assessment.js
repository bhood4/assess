 'use strict';
    // Include our "db"
    var db = require('../../config/db')();
    // Exports all the functions to perform on the db
    module.exports = {getAllAssessment, saveAssessment, getOneAssessment, updateAssessment, deleteAssessment};

    function getAllAssessment(req, res, next) {
      res.json({ assessment: db.find()});
    }
    function saveAssessment(req, res, next) {
        res.json({success: db.save(req.body), description: "Assessment added to the list!"});
    }
    function getOneAssessment(req, res, next) {
        var id = req.swagger.params.id.value; //req.swagger contains the path parameters
        var assessment = db.find(id);
        if(assessment) {
            res.json(assessment);
        }else {
            res.status(204).send();
        }        
    }
    function updateAssessment(req, res, next) {
        var id = req.swagger.params.id.value; //req.swagger contains the path parameters
        var assessment = req.body;
        if(db.update(id, assessment)){
            res.json({success: 1, description: "Assessment updated!"});
        }else{
            res.status(204).send();
        }

    }
    function deleteAssessment(req, res, next) {
        var id = req.swagger.params.id.value; //req.swagger contains the path parameters
        if(db.remove(id)){
            res.json({success: 1, description: "Assessment deleted!"});
        }else{
            res.status(204).send();
        }

    }
