/*

created by huda0209
EntryReSender for discord bot

ran by node.js

2022-9-6

*/

'use strict'

const sabwebapiCaller = require("../punishment/sabwebapiCaller")
const e = require("express");

class MinecraftPlayer{
    constructor(name, uuid) {
        /**
         * @type {String} プレイヤーのユーザーネーム(mcid)
         */
        this.username = name;

        /**
         * @type {String} プレイヤーのUUID
         */
        this.uuid = uuid;
    }

    /**
     * プレイヤーの現在のipアドレスを返します。
     * @return {String} プレイヤーの現在のipアドレス
     */
    async getCurrentIpAddress(){
        const playerData = await sabwebapiCaller.getPlayerDataByUUID(this.uuid);
        return playerData.ip;
    }

    /**
     * プレイヤーが最初にログインした日時を返します。
     * @return {Date} プレイヤーの最初のログイン日時
     */
    async getFirstLoginDate(){
        const playerData = await sabwebapiCaller.getPlayerDataByUUID(this.uuid);
        return new Date(playerData.first_login);
    }

    /**
     * プレイヤーが最後にログインした日時を返します。
     * @return {Date} プレイヤーの最後のログイン日時
     */
    async getLastLoginDate(){
        const playerData = await sabwebapiCaller.getPlayerDataByUUID(this.uuid);
        return new Date(playerData.last_login);
    }

    /**
     * プレイヤーのipアドレス履歴を配列で返します。
     * @return {String} ip - ipアドレス
     * @return {Date} lastSeen - 最後に確認された日時
     * @return {Array<{ip: String, lastSeen: Date}>} ipアドレスと確認時刻のオブジェクトの配列が返る。
     */
    async getIpAddressHistory(){
        const playerData = await sabwebapiCaller.getPlayerDataByUUID(this.uuid);
        return playerData.ipAddressHistory.map(value=>{
            return {
                ip: value.ip,
                lastSeen : new Date(value.last_seen)
            }
        });
    }

    /**
     * プレイヤーのユーザーネーム履歴を配列で返します。
     * @return {String} username - ユーザーネーム
     * @return {Date} lastSeen - 最後に確認された日時
     * @return {Array<{username: String, lastSeen: Date}>} ipアドレスと確認時刻のオブジェクトの配列が返る。
     */
    async getUserNameHistory(){
        const playerData = await sabwebapiCaller.getPlayerDataByUUID(this.uuid);
        return playerData.usernameHistory.map(value=>{
            return {
                username: value.name,
                lastSeen : new Date(value.last_seen)
            }
        })
    }
}

module.exports = MinecraftPlayer;