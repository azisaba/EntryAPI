

const {Client, GuildMember, AnyChannel} = require("discord.js")
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

exports.init = init;