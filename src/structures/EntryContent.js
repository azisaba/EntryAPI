/*

created by huda0209
EntryReSender for discord bot

ran by node.js

2022-9-8

*/

'use strict'

const {Entry} = require("./Entry");

class EntryContent{
    constructor(reasonForApplying, career, participatingProject, availableTimeOfDay, availableDaysOfWeek, availableTimeZone, skill, job, playtime, selfPR, entryRecruitments) {
        /**
         * @type {String} 志望理由
         */
        this.reasonForApplying = reasonForApplying;

        /**
         * @type {String} 運営経験
         */
        this.career = career;

        /**
         * @type {String} 関わっているプロジェクト
         */
        this.participatingProject = participatingProject;

        /**
         * @type {String} 一日に活動できる時間
         */
        this.availableTimeOfDay = availableTimeOfDay;

        /**
         * @type {String} 活動可能な曜日
         */
        this.availableDaysOfWeek = availableDaysOfWeek;

        /**
         * @type {String} 活動可能な時間帯
         */
        this.availableTimeZone = availableTimeZone;

        /**
         * @type {String} 所持技術
         */
        this.skill = skill;

        /**
         * @type {String} 希望職種
         */
        this.job = job;

        /**
         * @type {String} アジ鯖プレイ時間
         */
        this.playtime = playtime;

        /**
         * @type {String} 自己PR
         */
        this.selfPR = selfPR;
    }
}

module.exports = EntryContent;