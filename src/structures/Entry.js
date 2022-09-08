/*

created by huda0209
EntryReSender for discord bot

ran by node.js

2022-9-8

*/

'use strict'

const {EntryContent} = require("./EntryContent");
const {Applicant} = require("./Applicant");
const {Recruitment} = require("./Recruitment");

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
    }
}

module.exports = Entry;