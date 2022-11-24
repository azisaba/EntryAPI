'use strict'

const {TextChannel} = require("discord.js");

class Organization{
    constructor(name, sign, channel) {
        /**
         * @type {String} 組織名
         */
        this.name = name;

        /**
         * @type {sign} 組織固有記号
         */
        this.sign = sign;

        /**
         * @type {TextChannel} 組織応募情報送信チャンネル
         */
        this.channel = channel;
    }

    /**
     * 組織応募情報を送信するチャンネルを設定する。
     * @param {TextChannel} channel 組織応募情報送信チャンネル
     */
    setChannel(channel){
        this.channel = channel;
    }
    //delete ...
}

module.exports = Organization;