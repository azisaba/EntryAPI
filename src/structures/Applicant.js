/*

created by huda0209
EntryReSender for discord bot

ran by node.js

2022-9-8

*/

'use strict'

const {MinecraftPlayer} = require("./MinecraftPlayer");
const {GuildMember} = require("discord.js");
const {Punishment} = require("./Punishment");

class Applicant{
    constructor(name, minecraftPlayer, DiscordGuildMember, punishment, twitterId) {
        /**
         * @type {String} 応募者の名前
         */
        this.name = name;

        /**
         * @type {MinecraftPlayer} 応募者のMinecraftのプレイヤーデータ
         */
        this.minecraft = minecraftPlayer;

        /**
         * @type {GuildMember} 応募者のDiscord(アジ鯖公式)のギルドメンバーデータ
         */
        this.discord = DiscordGuildMember;

        /**
         * @type {Punishment} 応募者のMinecraftの処罰データ
         */
        this.punishment = punishment;

        /**
         * @type {String} 応募者のTwitterのId
         */
        this.twitterId = twitterId;
    }
}

module.exports = Applicant;