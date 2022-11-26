'use strict'

const {Organization} = require("./Organization");

class Recruitment{
    /**
     * @param {String} id 募集id
     * @param {String} name 募集名
     * @param {Organization} organization 組織情報
     * @param {String} mention 応募受付時のメンション
     * @param {Boolean} reception 募集委受付状態
     * @param {String} jobDescription 業務内容
     * @param {String} recruitmentNumbers 募集人数
     * @param {String} recruitmentPeriod 募集期間
     * @param {String} employmentPeriod 採用期間
     */
    constructor(id, name, organization, mention, reception, jobDescription, recruitmentNumbers, recruitmentPeriod, employmentPeriod) {
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

        /**
         * @type {String} 業務内容
         */
        this.jobDescription = jobDescription;

        /**
         * @type {String} 募集人数
         */
        this.recruitmentNumbers = recruitmentNumbers

        /**
         * @type {String} 募集期間
         */
        this.recruitmentPeriod = recruitmentPeriod;

        /**
         * @type {String} 採用期間
         */
        this.employmentPeriod = employmentPeriod;

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

    /**
     * 業務内容を設定する。
     * @param {String} jobDescription
     */
    setJobDescription(jobDescription){
        this.jobDescription = jobDescription;
    }

    /**
     * 応募人数を設定する。
     * @param {String} recruitmentNumbers
     */
    setRecruitmentNumbers(recruitmentNumbers){
        this.recruitmentNumbers = recruitmentNumbers;
    }

    /**
     * 募集期間を設定する。
     * @param {String} recruitmentPeriod
     */
    setRecruitmentPeriod(recruitmentPeriod){
        this.recruitmentPeriod = recruitmentPeriod;
    }

    /**
     * 採用期間を設定する。
     * @param {String} employmentPeriod
     */
    setEmploymentPeriod(employmentPeriod){
        this.employmentPeriod = employmentPeriod;
    }
}
module.exports = Recruitment;

// delete ...