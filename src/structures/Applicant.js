/*

created by huda0209
EntryReSender for discord bot

ran by node.js

2022-9-23

*/

'use strict'

const {MinecraftPlayer} = require("./MinecraftPlayer");
const {GuildMember} = require("discord.js");
const {Punishment} = require("./Punishment");

class Applicant{
    constructor(name, minecraftPlayer, DiscordGuildMember, punishments, twitterId=null) {
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
         * @type {String|null} 応募者のTwitterのId
         */
        this.twitterId = twitterId;
    }

    getEmbedFields(){
        const buildField = (name, value)=>{
            return {
                name : name,
                value : value
            }
        }

        const fields = [];
        fields.push(buildField("名前", this.name));
        fields.push(buildField("MCID", `[${this.minecraft.username}](https://spicyazisaban.azisaba.net/search?q=${this.minecraft.username})`));
        fields.push(buildField("Discordユーザー名", `<@${this.discord.id}>`));
        fields.push(buildField("Twitter", this.twitterId ?`[${this.minecraft.username}](https://twitter.com/${this.minecraft.username})` : "もっていない"));
        return fields;
    }
}

module.exports = Applicant;