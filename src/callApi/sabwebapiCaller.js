'use strict'

const configManager = require("../config/configManager");
const cacheManager = require("../util/cacheManager");
const auth = require("./sabwebapiAuthentication");
const authData = configManager.getBotData("punishmentAPI");

const playerDataCache = new cacheManager(120);
const punishmentCache = new cacheManager(120);
const accountsCache = new cacheManager(120)

exports.getPlayerDataByUUID = async (uuid)=>{
    if(playerDataCache.exist(uuid)){
        return playerDataCache.get(uuid);
    }

    const option = {
        method : "GET",
        headers: {
            "Content-type": "application/json",
            "X-SpicyAzisaBan-Session": await auth.getToken(),
            "Origin" : "https://spicyazisaban.azisaba.net"
        }
    }
    return await fetch(`${authData.url}/players/get/${uuid}`, option)
        .then(async r => {
            playerDataCache.set(uuid, r)
            return await r.json();
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
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "X-SpicyAzisaBan-Session": await auth.getToken(),
            "Origin" : "https://spicyazisaban.azisaba.net"
        },
        body: JSON.stringify({
            "query": name,
            "type": "players,punishments"
        })
    }
    return fetch(`${authData.url}/misc/search`, option)
        .then(async r => {
            if(!r.ok) return null;
            const players = await (await r.json()).players;

            if (players.length === 0) return null;
            const player = players.find(value => {
                return value.name === name;
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
            playerDataCache.set(player.uuid, player)
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
        method: "GET",
        headers: {
            "Content-type": "application/json",
            "X-SpicyAzisaBan-Session": await auth.getToken(),
            "Origin" : "https://spicyazisaban.azisaba.net"
        }
    }
    return await fetch(`${authData.url}/punishments/get/${punishmentId}`, option)
        .then(async r => {
            playerDataCache.set(punishmentId, r)
            return await r.json();
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
    const token = await auth.getToken();
    const option = {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            "X-SpicyAzisaBan-Session": token,
            "Origin": "https://spicyazisaban.azisaba.net"
        }
    }
    return await fetch(`${authData.url}/players/find_accounts/${uuid}`, option)
        .then(async r => {
            const res = await r.json();
            accountsCache.set(uuid, res);
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
        method: "GET",
        headers: {
            "Content-type": "application/json",
            "X-SpicyAzisaBan-Session": await auth.getToken(),
            "Origin" : "https://spicyazisaban.azisaba.net"
        }
    }
    return  fetch(`${authData.url}/players/find_accounts/${uuid}`, option)
        .then(async r => {
            const res = await r.json();
            accountsCache.set(uuid, res);
            return res.punishments;
        })
        .catch(e => {
            console.log(e);
            return null;
        })
}