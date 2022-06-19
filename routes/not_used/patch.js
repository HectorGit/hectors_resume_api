const express = require("express");
const patchrouter = express.Router();

const query = require(".././tools/queryDatabase");
const qStrings = require(".././tools/sqlStrings");
const val = require(".././tools/validate");
const dbFail = require(".././tools/dbFailSafe");
const moment = require("moment");

const friendsController = require('../controllers/friendsController');

/* requires body such as
    { 
        first_name
        age        (this is the element being updated)
    }
*/
patchrouter.patch("/update_friend",
    friendsController.updateFriend
);

module.exports = patchrouter;