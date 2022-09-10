/*

created by huda0209
EntryReSender for discord bot

ran by node.js

2022-7-18

*/

'use strict'

const uuidGen = require("node-uuid");
const crypto = require("crypto");
const configManager = require("../config/configManager");

let validTokenHashList = [];

function create(userId, validDays){
    const uniqueId = uuidGen.v4().split("-").join();
    const expires = validDays!=null ? (new Date()).setDate((new Date()).getDate()+validDays) : null;
    const token = Buffer.from(`${uniqueId}-${expires!==null? expires : "null000000000"}`).toString('base64');
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');

    const tokenList = configManager.getGuildtData("token");
    if(tokenList[userId]===undefined) tokenList[userId] = [];

    tokenList[userId].push({
        "hash" : tokenHash,
        "expires" : expires
    });

    configManager.setGuildtData("token", tokenList);
    updateTokenLists();
    configManager.saveConfig();

    return token;
}

function remove(token){

}

function AuthenticateToken(token){
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
    return validTokenHashList.includes(tokenHash);
}


function existUser(userId){
    const tokenList = configManager.getGuildtData("token");
    for (const tokenListKey in tokenList) {
        if(userId===tokenListKey && tokenList[token]) return true;
    }
}

function getTokenFromUser(user){

}

function getUserFromToken(user){

}

//tokenListを更新できるメソッド
function updateTokenLists(){
    const tokenList = configManager.getGuildtData("token");
    const _validTokenHashList = []

    for (const userToken in tokenList) {
        tokenList[userToken].forEach(value=>{
            _validTokenHashList.push(value.hash);
        })
    }

    validTokenHashList = [..._validTokenHashList];
}


function removeExpiredToken(){
    const tokenList = configManager.getGuildtData("token");
    const nowDate = (new Date()).getTime();

    for (const userToken in tokenList) {
        tokenList[userToken] = userToken.filter(value=>{
            if(value.expires<=nowDate) return true;
        })
    }

    configManager.setGuildtData("token", tokenList);
    updateTokenLists();
}

exports.create = create;
exports.AuthenticateToken = AuthenticateToken;
exports.updateTokenLists = updateTokenLists;
exports.removeExpiredToken = removeExpiredToken;