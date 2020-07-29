 'use strict';
    // Include our "db"
    var db = require('../../config/db')();
    // Exports all the functions to perform on the db
    module.exports = {getAllQuestion, saveQuestion, getOneQuestion, updateQuestion, deleteQuestion, load};

    function getAllQuestion(req, res, next) {
      res.json({ questions: db.find()});
    }
    function saveQuestion(req, res, next) {
        res.json({success: db.save(req.body), description: "Question added to the list!"});
    }
    function getOneQuestion(req, res, next) {
        var id = req.swagger.params.id.value; //req.swagger contains the path parameters
        var question = db.find(id);
        if(question) {
            res.json(question);
        }else {
            res.status(204).send();
        }        
    }
    function updateQuestion(req, res, next) {
        var id = req.swagger.params.id.value; //req.swagger contains the path parameters
        var question = req.body;
        if(db.update(id, question)){
            res.json({success: 1, description: "Question updated!"});
        }else{
            res.status(204).send();
        }
    }
    function deleteQuestion(req, res, next) {
        var id = req.swagger.params.id.value; //req.swagger contains the path parameters
        if(db.remove(id)){
            res.json({success: 1, description: "Question deleted!"});
        }else{
            res.status(204).send();
        }
    }
    function load(req, res, next) {
        // /Users/billhood/Downloads/question.yaml
        var url = req.body.url;
        var clean = req.body.clean;

        var path = require('path');
        const yaml = require('js-yaml');
        var request = require('request');
        request.get(path.normalize(url), function (error, response, body) {
          if (!error && response.statusCode == 200) {
            var fileContents = body;
            let obj = yaml.safeLoadAll(fileContents)[0].questions;
            for(var i in obj) 
            {
              db.save(obj[i]);
            }
          } else {
	    throw new Error('error loading '+url);
          }
        });

        //const yaml = require('js-yaml');
        //let fileContents = fs.readFileSync(url, 'utf8');
        //let obj = yaml.safeLoadAll(fileContents)[0].questions;
        //for(var i in obj) 
        //{
        //  db.save(obj[i]);
        //}

        res.status(204).send();
    }
