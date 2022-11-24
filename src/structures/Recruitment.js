'use strict'

const {Organization} = require("./Organization");

class Recruitment{
    constructor(id, name, organization, mention, reception) {
        /**
         * @type {String} 募集id
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
         * @type {Organization} 組織情報
         */
        this.organization = organization;

        /**
         * @type {Boolean} 募集受付状態
         */
        this.reception = reception;
    }

    /**
     * 募集名を設定する。
     * @param {String} name 募集名
     * @return {void}
     */
    setName(name){
        this.name = name;
    }

    /**
     * 応募時のメンションを設定する。
     * @param {Array<String>} mentionList メンションフォーマットの配列
     * @return {void}
     */
    setMention(mentionList){
        const DiscordIdRegexp = new RegExp("<@&?\d{18}>")
        mentionList.forEach(value => {
            if(!DiscordIdRegexp.test(value)){
                throw new Error("Discord Mention Format Error");
            }
        })
        this.mention = mentionList.join("");
    }

    /**
     * 応募受付の状態を設定する。
     * @param {Boolean} reception 募集受付状態
     */
    setReception(reception){
        this.reception = reception;
    }

}
module.exports = Recruitment;

// delete ...