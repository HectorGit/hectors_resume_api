
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

module.exports = getrouter;