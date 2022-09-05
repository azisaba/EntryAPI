/*

created by huda0209
EntryReSender for discord bot

ran by node.js

2022-9-6

*/

'use strict'

class Recruitment{
    constructor(id, name, mention, reception) {
        /**
         * @type {Number} 募集id
         */
        this.id = id;

        /**
         * @type {String} 募集名
         */
        this.name = name;

        /**
         * @type {String} 応募受付時のメンション
         */
        this.mention = mention;

        /**
         * @type {Boolean} 募集受付状態
         */
        this.reception = reception;
    }
}
module.exports = Recruitment;

//setMention, setReception, delete, setName ...