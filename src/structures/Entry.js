'use strict'

const {TextChannel,ThreadChannel} = require("discord.js")
const {EntryContent} = require("./EntryContent");
const {Applicant} = require("./Applicant");
const {Recruitment} = require("./Recruitment");

const discordAPI = require("../callApi/discordjsApiCaller");

class Entry{
    constructor(entryId, recruitment,applicant, entryContent, entryRecruitments, timestamp) {
        /**
         * @type {String} 応募Id
         */
        this.entryId = entryId;

        /**
         * @type {EntryContent} 応募内容
         */
        this.entryContent = entryContent;

        /**
         * @type {Applicant}応募者の基本データ
         */
        this.applicant = applicant;

        /**
         * @type {Date} 応募したタイムスタンプ
         */
        this.timestamp = timestamp;

        /**
         * @type {Recruitment} 応募した募集情報
         */
        this.recruitment = recruitment;

        /**
         * @type {Array<Entry>} 他に応募した募集
         */
        this.entryRecruitments = entryRecruitments;

        /**
         * @type {TextChannel|ThreadChannel} 応募情報を送信するチャンネル
         */
        this.channel = null;
    }


    /**
     * 応募情報送信チャンネルにスレッドを作成する
     * @return {Promise<void>}
     */
    createThreadChannelWithStartMsg(){
        const symbol = this.recruitment.id==="default" ? "💥" : !this.recruitment.reception? "⚠" :"🟩";
        const threadName = `${symbol}[${this.applicant.minecraft.username}] ${this.recruitment.name}(${this.recruitment.id}) - 応募ID ${this.entryId}`;

        this.channel = discordAPI.createPublicThreadWithStartMessage(this.recruitment.organization.channel.id.toString(), threadName, threadName)
                            .then(res=>{return res})
                            .catch(e=>{})
    }

    /**
     * 応募情報送信チャンネルにメッセージを送信する
     * @param message
     * @return {Promise<void>}
     */
    async sendMessage(message=""){
        if(this.channel) {
            (await this.channel).send(message).catch(e=>{})
            return;
        }
        this.recruitment.organization.channel.send(message).catch(e=>{});
    }

    /**
     * 応募情報を送信するチャンネルを設定する
     * @param {TextChannel|ThreadChannel}channel
     * @return void
     */
    setChannel(channel) {
        this.channel = channel;
    }

    /**
     * 応募情報を送信するチャンネルを取得する
     * @return {TextChannel|ThreadChannel}
     */
    getChannel() {
        return this.channel;
    }

}

module.exports = Entry;