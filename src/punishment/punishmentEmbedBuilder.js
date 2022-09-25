/*

created by huda0209
EntryReSender for discord bot

ran by node.js

2022-9-23

*/

'use strict'

const Discord = require("discord.js");


/**
 * 処罰情報のサマリーのEmbedを構築する
 * @param {Array<Punishment>}punishments
 * @return {{embeds: *[]}}
 */
exports.buildPlayerSummary = async (punishments)=>{
    const list = (await Promise.all(punishments)).map(async punishment=>{
            return `[#${(punishment.id)}](https://spicyazisaban.azisaba.net/punishments/view?id=${punishment.id}) ${punishment.type} ${await (await punishment).getReason()} 処罰日:<t:${Math.floor((await punishment).startTime.getTime()/1000)}:D> ${await (await punishment).isActive() ? "" : "解除済"}`;
        })

    return {embeds: [new Discord.MessageEmbed()
            .setTitle(`${(await punishments[0]).target.username}の処罰サマリー`)
            .setColor("#3C3C3C")
            .setDescription((await Promise.all(list)).join("\n"))
            .setFooter({"text" : "SpicyAzisaBan"})
        ]}
}