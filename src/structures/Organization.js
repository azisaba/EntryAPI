'use strict'

const {TextChannel} = require("discord.js");

class Organization{
    constructor(name, sign, channel, description=null) {
        /**
         * @type {String} 組織名
         */
        this.name = name;

        /**
         * @type {String} 組織固有記号
         */
        this.sign = sign;

        /**
         * @type {TextChannel} 組織応募情報送信チャンネル
         */
        this.channel = channel;

        /**
         * @type {String} 組織説明
         */
        this.description = description
    }

    /**
     * 組織応募情報を送信するチャンネルを設定する。
     * @param {TextChannel} channel 組織応募情報送信チャンネル
     */
    setChannel(channel){
        this.channel = channel;
    }

    /**
     * 組織説明を設定する。
     * @param {String} description 組織説明
     */
    setDescription(description){
        this.description = description;
    }

    //delete ...
}

module.exports = Organization;