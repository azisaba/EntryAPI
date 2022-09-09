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

exports.getPlayerDataByUUID = async (uuid)=>{
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

exports.getPlayerDataByName = async (name)=>{

    /*
    playerDataCache.
    if(playerDataCache.exist(uuid)){
        return playerDataCache.get(uuid);
    }
    */

    const option = {
        url : `${authData.url}/misc/search`,
        headers: {
            "Content-type": "application/json",
            "X-SpicyAzisaBan-Session": await auth.getToken(),
            "Origin" : "https://spicyazisaban.azisaba.net"
        },
        form: {
            "query": "huda0209",
            "type": "players,punishments"
        }
    }
    return request.post(option)
        .then(r => {
            const players = (JSON.parse(r, "utf-8")).players;

            if(players.length===0) return null;
            const player = players.find(value=>{
                return value.name===name;
            })

            /*フォーマットが本当は違う
            misc/search
            {
                "name": "huda0209",
                "uuid": "cb6e90f5-5a07-4089-824f-a3083b618a15",
                "last_login": 000000,
                "ip": "192.168.2.1"
            }
             */
            playerDataCache.set(player.uuid, player, (new Date()).setMinutes((new Date()).getMinutes()+2))
            return player
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