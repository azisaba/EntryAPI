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
    constructor(name, minecraftPlayer, DiscordGuildMember, punishments, twitterId) {
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
         * @type {Array<Punishment>} 応募者のMinecraftの処罰データの配列
         */
        this.punishments = punishments;

        /**
         * @type {String} 応募者のTwitterのId
         */
        this.twitterId = twitterId;
    }
}

module.exports = Applicant;