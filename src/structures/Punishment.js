/*

created by huda0209
EntryReSender for discord bot

ran by node.js

2022-9-6

*/

'use strict'

const MinecraftPlayer = require("./MinecraftPlayer");

class Punishment{
    constructor(id, target, reason, type, operator, startTime, endTime, server, extra, active) {
        /**
         * @type {Number} 処罰id
         */
        this.id = id;

        /**
         * @type {MinecraftPlayer} 処罰対象プレイヤー
         */
        this.target = target;

        /**
         * @type {MinecraftPlayer} 処罰の理由
         */
        this.reason = reason;

        /**
         * @type {String} 処罰の種類
         */
        this.type = type;

        /**
         * @type {MinecraftPlayer} 処罰執行プレイヤー
         */
        this.operator = operator;

        /**
         * @type {Date} 処罰された日時
         */
        this.startTime = startTime;

        /**
         * @type {Date} 処罰が終了する日時
         */
        this.endTime = endTime;

        /**
         * @type {String} 処罰されたサーバー
         */
        this.server = server;

        /**
         * @type {Boolean} 処罰が有効か
         */
        this.active = active;
    }

    //to method
    //reason, endtime,active, proofs
}

module.exports = Punishment;