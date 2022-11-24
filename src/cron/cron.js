"use strict"


const entryCache = require("../entry/entryCache");
const sendMessage = require("..//util/discord/sendMessage");
const configManager = require("../config/configManager");
const tokenManager = require("../authorization/tokenManager");

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