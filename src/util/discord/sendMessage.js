/*

created by huda0209
EntryReSender for discord bot 
 
ran by node.js

2022-7-19

*/

'use strict'

const configManager = require("../../config/configManager");
let DiscordClient = null;

exports.momentMessage = async(channelId, content)=>{
    const message = await(await DiscordClient.channels.fetch(channelId)).send(content);
    message.delete();
}

exports.init = (_DiscordClient)=>{
    DiscordClient = _DiscordClient;
}