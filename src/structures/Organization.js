/*

created by huda0209
EntryReSender for discord bot

ran by node.js

2022-9-6

*/

'use strict'

class Organization{
    constructor(name, sign, channelId) {
        /**
         * @type {String} 組織名
         */
        this.name = name;

        /**
         * @type {sign} 組織固有記号
         */
        this.sign = sign;

        /**
         * @type {Boolean} 組織応募情報送信チャンネル
         */
        this.channelId = channelId;
    }

    //delete, setChannelId ...
}