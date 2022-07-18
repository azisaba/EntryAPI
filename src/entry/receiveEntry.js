/*

created by huda0209
EntryReSender for discord bot 
 
ran by node.js

2022-7-18

*/

const configManager = require("../config/configManager");
const createThread = require("../util/discord/channelCreate");
const entryManager = require("../util/entryContentManager");

let DiscordClient = null;

exports.receiveEntry = async(entryData)=>{
    const orgData = configManager.getOrgData(entryData.RecruitmentId.match(/[a-z]{2}/)[0]);
    const recruitmentData = configManager.getRecruitmentsData(entryData.RecruitmentId);
    
    const symbol = recruitmentData.name===configManager.getRecruitmentsData("default").name ? "💥" : !recruitmentData.reception? "⚠" :"🟩";
    const threadName = `${symbol}[${entryData.contents.mcid}] ${recruitmentData.name}(${entryData.RecruitmentId}) - 応募ID ${entryData.entryId}`;

    const thread = await createThread.createPublicThreadWithStartMessage(orgData.channelId, threadName, threadName);
    
    const sendContents = entryManager.formatToEmbedFromEntryData(entryData);
    sendContents["content"] = recruitmentData.mention;
    console.log(thread)
    thread.send(sendContents);
};  


exports.init = (_DiscordClient)=>{
    DiscordClient = _DiscordClient;
}