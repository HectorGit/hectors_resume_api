
const express = require("express");
const getrouter = express.Router();

const query = require(".././tools/queryDatabase");
const qStrings = require(".././tools/sqlStrings");
const val = require(".././tools/validate");
const dbFail = require(".././tools/dbFailSafe");
const moment = require("moment");

//let friendsController = "../controllers/friendsController" 

getrouter.get("/", (req, res) => {
    return res.send("Welcome to My Resume API! 🌝");
});

//read all the programming tools
getrouter.get("/get_programming_tools", 
    async(req,res) => {
        text = `select * from programming_tools`
        values = []
        query(text,values, (err,result) =>{
            if (err) return dbFail.failSafe(err, res);
            return res.status(200).send(result.rows)
        })
    }
);

getrouter.get("/get_awards", 
    async(req,res) => {
        text = `select * from awards`
        values = []
        query(text,values, (err,result) =>{
            if (err) return dbFail.failSafe(err, res);
            return res.status(200).send(result.rows)
        })
    }
);

getrouter.get("/get_certifications", 
    async(req,res) => {
        text = `select * from certifications`
        values = []
        query(text,values, (err,result) =>{
            if (err) return dbFail.failSafe(err, res);
            return res.status(200).send(result.rows)
        })
    }
);

getrouter.get("/get_work_experiences", 
    async(req,res) => {
        text = `select * from work_experiences`
        values = []
        query(text,values, (err,result) =>{
            if (err) return dbFail.failSafe(err, res);
            return res.status(200).send(result.rows)
        })
    }
);

getrouter.get("/get_work_experience_projects/:project_key", 
    async(req,res) => {
        project_key = req.params.project_key
        console.log("project key : ", project_key)
        text = `select * from work_experience_projects where projects_key=$1`
        values = [project_key]
        query(text,values, (err,result) =>{
            if (err) return dbFail.failSafe(err, res);
            return res.status(200).send(result.rows)
        })
    }
);

module.exports = getrouter;