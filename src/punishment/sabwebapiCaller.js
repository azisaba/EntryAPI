/*

created by huda0209
EntryReSender for discord bot

ran by node.js

2022-7-29

*/

'use strict'

const request = require('request-promise');
const configManager = require("../config/configManager");
const cacheManager = require("../util/cacheManager");
const auth = require("./sabwebapiAuthentication");
const authData = configManager.getBotData("punishmentAPI");

const playerDataCache = new cacheManager();
const punishmentCache = new cacheManager();
const accountsCache = new cacheManager()

exports.getPlayerData = async (uuid)=>{
    if(playerDataCache.exist(uuid)){
        return playerDataCache.get(uuid);
    }

    const option = {
        url : `${authData.url}/players/get/${uuid}`,
        headers: {
            "Content-type": "application/json",
            "X-SpicyAzisaBan-Session": await auth.getToken(),
            "Origin" : "https://spicyazisaban.azisaba.net"
        }
    }
    return request.get(option)
        .then(r => {
            playerDataCache.set(uuid, r, (new Date()).setMinutes((new Date()).getMinutes()+2))
            return JSON.parse(r, "utf-8");
        })
        .catch(e => {
            console.log(e);
            return null;
        });
}


exports.getPunishmentData = async (punishmentId)=>{
    if(punishmentCache.exist(punishmentId)){
        return punishmentCache.get(punishmentId);
    }
    const option = {
        url : `${authData.url}/punishments/get/${punishmentId}`,
        headers: {
            "Content-type": "application/json",
            "X-SpicyAzisaBan-Session": await auth.getToken(),
            "Origin" : "https://spicyazisaban.azisaba.net"
        }
    }
    return  request.get(option)
        .then(r => {
            playerDataCache.set(punishmentId, r, (new Date()).setMinutes((new Date()).getMinutes()+2))
            return JSON.parse(r, "utf-8");
        })
        .catch(e => {
            console.log(e);
            return null;
        })
}

exports.getPossessionAccounts = async (uuid)=>{
    if(accountsCache.exist(uuid)){
        return accountsCache.get(uuid).player;
    }
    const option = {
        url : `${authData.url}/players/find_accounts/${uuid}`,
        headers: {
            "Content-type": "application/json",
            "X-SpicyAzisaBan-Session": await auth.getToken(),
            "Origin" : "https://spicyazisaban.azisaba.net"
        }
    }
    return  request.get(option)
        .then(r => {
            const res = JSON.parse(r, "utf-8");
            accountsCache.set(uuid, res, (new Date()).setMinutes((new Date()).getMinutes()+2))
            return res.players;
        })
        .catch(e => {
            console.log(e);
            return null;
        })
}


exports.getPossessionAccountsPunishments = async (uuid)=>{
    if(accountsCache.exist(uuid)){
        return accountsCache.get(uuid).punishments;
    }
    const option = {
        url : `${authData.url}/players/find_accounts/${uuid}`,
        headers: {
            "Content-type": "application/json",
            "X-SpicyAzisaBan-Session": await auth.getToken(),
            "Origin" : "https://spicyazisaban.azisaba.net"
        }
    }
    return  request.get(option)
        .then(r => {
            const res = JSON.parse(r, "utf-8");
            accountsCache.set(uuid, res, (new Date()).setMinutes((new Date()).getMinutes()+2))
            return res.punishments;
        })
        .catch(e => {
            console.log(e);
            return null;
        })
}