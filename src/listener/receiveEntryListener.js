const Discord = require("discord.js");
const punishmentEmbedBuilder = require("../punishment/punishmentEmbedBuilder");


module.exports = async (event)=>{
    event.on("receive", async entry=>{
        await entry.createThreadChannelWithStartMsg();
        const applicantEmbedFormat = await (entry.applicant.getEmbedFields());

        await entry.sendMessage(
            {
                username: "アジ鯖 エントリーシート",
                content: `${entry.recruitment.mention}\nエントリーがありました！`,
                embeds: [new Discord.MessageEmbed()
                    .setTitle(`${entry.applicant.minecraft.username}の応募情報`)
                    .setColor("#3C3C3C")
                    .setURL(`https://docs.google.com/spreadsheets/d/1CA12Yu6Q4WYUsRAfz4uP7bfQsORrYlgKqpZrxIoz1mo/`)
                    .setFooter({"text" : "アジ鯖 人事システム"})
                    .addFields(applicantEmbedFormat.concat(entry.entryContent.getEmbedFields()))
                ]})

        await entry.sendMessage(await punishmentEmbedBuilder.buildPlayerSummary(entry.applicant.punishments));
    })
}