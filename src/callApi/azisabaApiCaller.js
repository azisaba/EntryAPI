'use strict'

const configManager = require("../config/configManager");
const cacheManager = require("../util/cacheManager");

const playerDataCache = new cacheManager(120);
const punishmentCache = new cacheManager(120);
const playerPunishmentCache = new cacheManager(120);


/**
 * アジ鯖APIを利用して、uuidからMinecraftのプレイヤーデータを取得する。
 * @param {String} uuid
 * @return {Promise<Object|null>}
 */
const getPlayerByUUID = async (uuid)=>{
    if(playerDataCache.exist(uuid)) return playerDataCache.get(uuid);

    return await httpReqest("GET", `players/${uuid}`, {})
        .then(async r => {
            const response = await r.json();
            if (!r.ok) {
                console.log(response);
                return null;
            }

            playerDataCache.set(uuid, response);
            return response;
        })
        .catch(e => {
            console.log(e);
            return null;
        });
}

/**
 * アジ鯖APIを利用して、ユーザーネーム(mcid)からMinecraftのプレイヤーデータを取得する。
 * @param {String}name
 * @return {Promise<Response|null>}
 */
const getPlayerByName = async (name)=>{
    let playerCache = null;
    playerDataCache.forEach(value=>{
        if(value.name===name) playerCache=value;
    })
    if(playerCache) return playerCache;

    return await httpReqest("GET", `players/by-name/${name}`, {})
        .then(async r => {
            const response = await r.json();
            if (!r.ok) {
                console.log(response);
                return null;
            }

            playerDataCache.set(response.uuid, response);
            return response;
        })
        .catch(e => {
            console.log(e);
            return null;
        });
}

/**
 * アジ鯖APIを利用して、uuidからプレイヤーの処罰情報を取得する。
 * @param {String} uuid
 * @return {Promise<Array<Object>|null>}
 */
const getPunishmentByPlayerUUID = async (uuid) => {
    if (playerPunishmentCache.exist(uuid)) return playerPunishmentCache.get(uuid);

    return await httpReqest("GET", `players/${uuid}/punishments`)
        .then(async r => {
            const response = await r.json();
            if (!r.ok) {
                console.log(response);
                return null;
            }

            response.forEach(value=>{
                punishmentCache.set(value.id, value);
            })

            playerPunishmentCache.set(uuid, response);
            return response;
        })
        .catch(e => {
            console.log(e);
            return null;
        });
}

/**
 * アジ鯖APIを利用して、処罰idから処罰情報を取得する。
 * @param {Number} id
 * @return {Promise<Object|null>}
 */
const getPunishmentById = async (id) => {
    if (punishmentCache.exist(id)) return punishmentCache.get(id);

    return await httpReqest("GET", `punishments/${id}` )
        .then(async r => {
            const response = await r.json();
            if (!r.ok) {
                console.log(response);
                return null;
            }

            punishmentCache.set(id, response);
            return response;
        })
        .catch(e => {
            console.log(e);
            return null;
        });
}


/**
 * @param {String}method
 * @param {String}path
 * @param {Object}option
 * @return {Promise<Response>}
 */
const httpReqest = (method, path, option={})=>{
    const apiData = configManager.getBotData("azisabaAPI");
    option["method"] = method.toUpperCase();
    option["headers"] = {};
    option["headers"]["Authorization"] = `Bearer ${apiData.token}`;
    return fetch(`${apiData.url}/${path}`, option);
}

exports.getPlayerByUUID = getPlayerByUUID;
exports.getPlayerByName = getPlayerByName;
exports.getPunishmentByPlayerUUID = getPunishmentByPlayerUUID;
exports.getPunishmentById = getPunishmentById;