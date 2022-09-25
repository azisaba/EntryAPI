/*

created by huda0209
EntryReSender for discord bot

ran by node.js

2022-9-18

*/

'use strict'

const MinecraftPlayer = require("./MinecraftPlayer");
const azisabaAPI = require("../callApi/azisabaApiCaller");

class Punishment{
    /**
     * @param {Number}id
     * @param {MinecraftPlayer}target
     * @param {String}type
     * @param {MinecraftPlayer}operator
     * @param {Date}startTime
     * @param {Date|Number}endTime
     */
    constructor(id, target, type, operator, startTime, endTime) {
        /**
         * @type {Number} 処罰id
         */
        this.id = id;

        /**
         * @type {MinecraftPlayer} 処罰対象プレイヤー
         */
        this.target = target;

        /**
         * @type {String} 処罰の種類
         */
        this.type = type;

        /**
         * @type {MinecraftPlayer} 処罰執行プレイヤー
         */
        this.actor = operator;

        /**
         * @type {Date} 処罰された日時
         */
        this.startTime = startTime;

        /**
         * @type {Date} 処罰が終了する日時
         */
        this.endTime = endTime;

    }

    /**
     * 処罰された理由を取得する
     * @return {Promise<String>}
     */
    getReason() {
        return azisabaAPI.getPunishmentById(this.id)
            .then(value => {
                return value.reason;
            })
    }

    /**
     * 処罰されたサーバーを取得する
     * @return {Promise<String>}
     */
    getServer() {
        return azisabaAPI.getPunishmentById(this.id)
            .then(value => {
                return value.server;
            })
    }

    /**
     * 処罰が有効か取得する
     * @return {Promise<boolean>}
     */
    isActive() {
        return azisabaAPI.getPunishmentById(this.id)
            .then(value => {
                return value.active;
            })
    }

    //to method
    // proofs, embed
}

module.exports = Punishment;