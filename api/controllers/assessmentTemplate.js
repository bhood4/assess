 'use strict';
    // Include our "db"
    var db = require('../../config/db')();
    // Exports all the functions to perform on the db
    module.exports = {getAllAssessmentTemplate, saveAssessmentTemplate, getOneAssessmentTemplate, updateAssessmentTemplate, deleteAssessmentTemplate, loadAssessmentTemplate};

    function getAllAssessmentTemplate(req, res, next) {
      res.json({ assessmentTemplates: db.find()});
    }
    function saveAssessmentTemplate(req, res, next) {
        res.json({success: db.save(req.body), description: "AssessmentTemplate added to the list!"});
    }
    function getOneAssessmentTemplate(req, res, next) {
        var id = req.swagger.params.id.value; //req.swagger contains the path parameters
        var assessmentTemplate = db.find(id);
        if(assessmentTemplate) {
            res.json(assessmentTemplate);
        }else {
            res.status(204).send();
        }        
    }
    function updateAssessmentTemplate(req, res, next) {
        var id = req.swagger.params.id.value; //req.swagger contains the path parameters
        var assessmentTemplate = req.body;
        if(db.update(id, assessmentTemplate)){
            res.json({success: 1, description: "AssessmentTemplate updated!"});
        }else{
            res.status(204).send();
        }

    }
    function deleteAssessmentTemplate(req, res, next) {
        var id = req.swagger.params.id.value; //req.swagger contains the path parameters
        if(db.remove(id)){
            res.json({success: 1, description: "AssessmentTemplate deleted!"});
        }else{
            res.status(204).send();
        }

    }
    function loadAssessmentTemplate(req, res, next) {
        // https://raw.githubusercontent.com/bhood4/assess/master/seed/assessmentTemplate.yaml
        var url = req.body.url;
        var clean = req.body.clean;

        const yaml = require('js-yaml');
        var request = require('request');
        request.get(url, function (error, response, body) {
          if (!error && response.statusCode == 200) {
            var fileContents = body;
            let obj = yaml.safeLoadAll(fileContents)[0].assessmentTemplates;
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

