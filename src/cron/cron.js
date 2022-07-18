/*

created by huda0209
EntryReSender for discord bot

ran by node.js

2022-7-18

*/

"use strict"


const entryCache = require("../entry/entryCache");
const sendMessage = require("..//util/discord/sendMessage");
const configManager = require("../config/configManager");
const tokenManager = require("../token/tokenManager");

module.exports = async (client)=>{
    setInterval( async () => {
        tokenManager.removeExpiredToken();
        entryCache.checkArchive().forEach(value=>{
            sendMessage.momentMessage(value, `アーカイブ回避`);
        })
    }, 1000)

    setInterval( ()=>{
        configManager.saveConfig();
    }, 300000)
}