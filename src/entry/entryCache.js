/*

created by huda0209
EntryReSender for discord bot

ran by node.js

2022-7-19

*/

'use strict'

const configManager = require("../config/configManager");

exports.create = (entryData, threadId, messageId, lastMessageCreatedAt)=>{
    const data = {
        messageId: messageId,
		threadId: threadId,
		lastMessageCreatedAt: lastMessageCreatedAt,
		status: "open",
		expires: configManager.getRecruitSystemData("archiveDuration") + lastMessageCreatedAt,
		entryData : entryData
    }
    configManager.setreviewEntry(entryData.entryId)
}

exports.get = function get(entryId){
    return configManager.getReviewEntry(entryId);
}

exports.setLastMessageCreatedAt = (key, createdAt)=>{
    const data = this.get(key);
    data["lastMessageCreatedAt"] = createdAt;
    data["expires"] = createdAt + configManager.getRecruitSystemData("archiveDuration");
}

exports.setStatus = (key, status)=>{
    const data = this.get(key);
    data["status"] = status;
}

exports.checkArchive = ()=>{
    const entryCaches = configManager.getAllReviewEntreis();
    const archivedThreads = [];
    for(const key in entryCaches){
        if(entryCaches[key].expires > (new Date).getTime()) continue;
        archivedThreads.push(entryCaches[key].threadId);
    }
    return archivedThreads;
}

exports.remove = (entryId)=>{
    try{
        configManager.removeReviewEntry(entryId);
    }catch(e){

    }
}