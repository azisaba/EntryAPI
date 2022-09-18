/*

created by huda0209
EntryReSender for discord bot

ran by node.js

2022-9-18

*/

'use strict'

module.exports = class CacheManager {
    cacheMap = {};

    /**
     * @param {Number} expiredTime 有効期限を秒で指定する
     */
    constructor(expiredTime) {
        this.expiredTime = expiredTime * 1000;
    }

    /**
     * 新しいデータをリストに追加する。
     * @param {String|Number} key
     * @param {Any} value
     */
    set(key, value) {
        const expired = new Date();
        expired.setTime(expired.getTime() + this.expiredTime);
        (this.cacheMap)[key] = {data: value, expired: expired};
    }

    /**
     * リストから指定されたキーのデータを取得する
     * @param {String|Number} key
     * @return {Any|undefined}
     */
    get(key) {
        const nowDate = (new Date()).getTime();
        const value = (this.cacheMap)[key];
        if ( Date.now() <= value.expired || value.expired === null) return value.data;
        this.delete(key);
        return undefined;
    }

    /**
     * 各要素に対して指定された関数を一度だけ実行する
     * @param {(
     *      value?: any
     *      )=>any} callback
     * @return void
     */
    forEach(callback){
        for (const key in this.cacheMap) {
            if ( Date.now() <= this.cacheMap[key].expired || this.cacheMap[key].expired === null) callback(this.cacheMap[key].data);
            this.delete(key);
        }
    }

    /**
     * リストから指定されたキーのデータを削除する
     * @param {String|Number} key
     */
    delete(key) {
        delete (this.cacheMap)[key];
    }

    /**
     * リストを全て削除する
     */
    clearAll() {
        for (const key in this.cacheMap) {
            delete (this.cacheMap)[key];
        }
    }

    /**
     * 指定したキーのデータがリストにあるかを返す。
     * @param {String|Number} key
     * @return {boolean}
     */
    exist(key) {
        const nowDate = (new Date()).getTime();
        const value = (this.cacheMap)[key];
        return !(value === undefined || value.expired > nowDate);
    }
}