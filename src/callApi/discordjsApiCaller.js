

const {Client, GuildMember, TextChannel, ThreadChannel, AnyChannel} = require("discord.js")
const configManager = require("../config/configManager");
let client = null;
/**
 * 初期化する
 * @param {Client}_client
 * @return void
 */
const init = (_client)=>{
    client = new Promise(resolve => {
        _client.on("ready", ()=>{
            resolve(_client);
        })
    })

}
/**
 * idで指定したギルドの、idで指定ユーザーのGuildMemberを取得する
 * @param {String}guildId
 * @param {String}userId
 * @return {GuildMember}
 */
exports.getGuildMemberFromUserIdAndGuildId = async (guildId, userId) => {
    return (await(await client).guilds.fetch(guildId)).members.fetch(userId);
}

/**
 * idで指定したチャンネルのAnyChannelを取得する
 * @param channelId
 * @return {AnyChannel}
 */
exports.getChannelFromChannelId = async (channelId) =>{
    return (await client).channels.fetch(channelId);
}

/**
 * 指定したチャンネルにパブリックスレッドを作成する
 * @param {String}parentChannelId
 * @param {String}threadName
 * @return {Promise<ThreadChannel>}
 */
exports.createPublicThread = async(parentChannelId, threadName)=>{
    const thread = await(await (await client).channels.fetch(parentChannelId)).threads.create({
            name: threadName,
            autoArchiveDuration: configManager.getRecruitSystemData("archiveDuration"),
        }
    )
    return thread;
}

/**
 * 指定したチャンネルに、指定した開始メッセージのパブリックスレッドを作成する
 * @param {String}parentChannelId
 * @param {String}threadName
 * @param {String}startMessage
 * @return {Promise<ThreadChannel>}
 */
exports.createPublicThreadWithStartMessage = async(parentChannelId, threadName, startMessage)=>{
    const message = await(await (await client).channels.fetch(parentChannelId)).send(startMessage);
    return await message.startThread({
        name: threadName,
        autoArchiveDuration: configManager.getRecruitSystemData("archiveDuration")
    });
}

/**
 * 一瞬メッセージを送信し、即座に削除する
 * @param {String}channelId
 * @param {String}content
 * @return {Promise<void>}
 */
exports.momentMessage = async(channelId, content)=>{
    const message = await(await DiscordClient.channels.fetch(channelId)).send(content);
    message.delete();
}

exports.init = init;