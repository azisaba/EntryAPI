/*

created by huda0209
EntryReSender for discord bot

ran by node.js

2022-9-11

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

    set(key, value) {
        const expired = new Date();
        expired.setTime(expired.getTime() + this.expiredTime)
        (this.cacheMap)[key] = {data: value, expired: expired};
    }

    get(key) {
        const nowDate = (new Date()).getTime();
        const value = (this.cacheMap)[key];
        if (value.expired <= nowDate || value.expired === null) return value.data;
        this.delete(key);
        return undefined;
    }

    delete(key) {
        delete (this.cacheMap)[key];
    }

    clearAll() {
        for (const key in this.cacheMap) {
            delete (this.cacheMap)[key];
        }
    }

    exist(key) {
        const nowDate = (new Date()).getTime();
        const value = (this.cacheMap)[key];
        if (value === undefined || value.expired > nowDate) return false;
        return true;
    }
}