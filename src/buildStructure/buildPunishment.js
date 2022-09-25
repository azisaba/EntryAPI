/*

created by huda0209
EntryReSender for discord bot

ran by node.js

2022-9-19

*/

'use strict'

const azisabaAPI = require("../callApi/azisabaApiCaller");
const buildMCPlayer = require("./buildMinecraftPlayer");
const Punishment = require("../structures/Punishment");

/**
 * ObjectからPunishmentクラスを組み立てる
 * @param {Object}punishData
 * @return {Punishment}
 */
const buildFromJsonObject = async(punishData)=>{
    const target = await buildMCPlayer.buildByUUID(punishData.target.uuid)
    const operator = await buildMCPlayer.buildByUUID(punishData.actor.uuid);

    return new Punishment(
        punishData.id,
        target,
        punishData.type,
        operator,
        new Date(punishData.start),
        punishData.end !== -1 ? new Date(punishData.end) : null,
    );
}
/**
 * プレイヤーuuidから複数のPunishmentクラスを組み立て、配列で返す
 * @param uuid
 * @return {Array<Promise<Punishment[]>>}
 */
exports.buildFromUserUUID = async (uuid)=>{
    const punishmentsJsonObj = await azisabaAPI.getPunishmentByPlayerUUID(uuid);
    return punishmentsJsonObj.map(value=>{
        return buildFromJsonObject(value);
    })
}

exports.buildFromJsonObject = buildFromJsonObject;