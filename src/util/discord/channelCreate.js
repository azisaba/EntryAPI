/*

created by huda0209
EntryReSender for discord bot 
 
ran by node.js

2022-7-19

*/

const configManager = require("../../config/configManager");
let DiscordClient = null;

exports.createPublicThread = async(parentChannelId, threadName)=>{
    const thread = await(await DiscordClient.channels.fetch(parentChannelId)).threads.create({
		name: threadName,
		autoArchiveDuration: configManager.getRecruitSystemData("archiveDuration"),
		}
	)
    return thread;
}

exports.createPublicThreadWithStartMessage = async(parentChannelId, threadName, startMessage)=>{
    if(!startMessage) return null;//throw errorでもいいかも

    const message = await(await DiscordClient.channels.fetch(parentChannelId)).send(startMessage);
    const thread = await message.startThread({
        name: threadName,
		autoArchiveDuration: configManager.getRecruitSystemData("archiveDuration")
    })
    return thread;
}

exports.init = (_DiscordClient)=>{
    DiscordClient = _DiscordClient;
}