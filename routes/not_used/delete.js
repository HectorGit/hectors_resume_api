const express = require("express");
const deleterouter = express.Router();

const query = require(".././tools/queryDatabase");
const qStrings = require(".././tools/sqlStrings");
const val = require(".././tools/validate");
const dbFail = require(".././tools/dbFailSafe");
const moment = require("moment");

const friendsController = require('../controllers/friendsController');

/* 
    requires body such as
    { 
        first_name
    }
*/
deleterouter.delete("/delete_friend",
    friendsController.deleteFriend
);

module.exports = deleterouter;