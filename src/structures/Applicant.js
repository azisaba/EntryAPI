'use strict'

const {MinecraftPlayer} = require("./MinecraftPlayer");
const {Punishment} = require("./Punishment");

class Applicant{
    /**
     * @param name
     * @param minecraftPlayer
     * @param DiscordUserName
     * @param punishments
     * @param twitterId
     */
    constructor(name, minecraftPlayer, DiscordUserName, punishments, twitterId=null) {
        /**
         * @type {String} 応募者の名前
         */
        this.name = name;

        /**
         * @type {MinecraftPlayer} 応募者のMinecraftのプレイヤーデータ
         */
        this.minecraft = minecraftPlayer;

        /**
         * @type {String} Discordのユーザーネーム
         */
        this.DiscordUserName = DiscordUserName;

        /**
         * @type {Array<Punishment>} 応募者のMinecraftの処罰データの配列
         */
        this.punishments = punishments;

        /**
         * @type {String|null} 応募者のTwitterのId
         */
        this.twitterId = twitterId;
    }

    async getEmbedFields(){
        const buildField = (name, value)=>{
            return {
                name : name,
                value : value
            }
        }
        const fields = [];
        fields.push(buildField("名前", this.name));
        fields.push(buildField("MCID", `[${this.minecraft.username}](https://spicyazisaban.azisaba.net/search?q=${this.minecraft.username})${this.minecraft.uuid?"":"(存在しない)"}`));
        fields.push(buildField("Discordユーザー名", this.DiscordUserName));
        fields.push(buildField("Twitter", this.twitterId ?`[${this.twitterId}](https://twitter.com/${this.twitterId})` : "もっていない"));
        return fields;
    }
}

module.exports = Applicant;