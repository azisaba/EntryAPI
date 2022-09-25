/*

created by huda0209
EntryReSender for discord bot

ran by node.js

2022-9-19

*/

'use strict'

const sabAPI = require("../callApi/sabwebapiCaller");
const azisabaAPI = require("../callApi/azisabaApiCaller");
const MinecraftPlayer = require("../structures/MinecraftPlayer");

/**
 * uuidからMinecraftPlayerクラスを組み立てる
 * @param {String}uuid
 * @return {Promise<MinecraftPlayer>}
 */
exports.buildByUUID = async (uuid)=>{
    try{
        return new MinecraftPlayer(
            (await azisabaAPI.getPlayerByUUID(uuid)).name,
            uuid
        );
    }catch (e){}//uuidをgetできない為、playerデータのnameにアクセスできないのを無理やり回避

}

/**
 * name(mcid)からMinecraftPlayerクラスを組み立てる
 * @param {String}name
 * @return {Promise<MinecraftPlayer>}
 */
exports.buildByName = async (name)=>{
    const uuid = (await azisabaAPI.getPlayerByName(name)).uuid;
    return new MinecraftPlayer(
        name,
        uuid
    );
}