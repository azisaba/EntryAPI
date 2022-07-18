/*

created by huda0209
EntryReSender for discord bot

ran by node.js

2022-7-18

*/

"use strict"


const configManager = require("../config/configManager");
const tokenManager = require("../token/tokenManager");

module.exports = async (client)=>{
    setInterval( async () => {
        tokenManager.removeExpiredToken();
    }, 1000)

    setInterval( ()=>{
        configManager.saveConfig();
    }, 300000)
}