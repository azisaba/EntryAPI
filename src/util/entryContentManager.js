/*

created by huda0209
EntryReSender for discord bot 
 
ran by node.js

2022-7-18

*/

'use strict'

const Discord = require("discord.js");
const configManager = require("../config/configManager");

const firstTopics =  [];
const secondTopics = [];

exports.init = ()=>{
    configManager.getRecruitSystemData("requestBody").forEach(value=>{firstTopics.push(value)});
    const TopicsList = configManager.getRecruitSystemData("TopicsList");
    for(const key in TopicsList) secondTopics.push(key);
    console.log(secondTopics)
}

exports.checkEntryDataForm = (entryData)=>{
    let correct = true;
    firstTopics.forEach(value=>{
        if(!entryData[value]) correct=false
    })

    secondTopics.forEach(value=>{
        if(!entryData["contents"][value]) correct=false;
    })

    return correct;
}

exports.formatToEmbedFromEntryData = (entryData)=>{
    const color = !existRecruitment(entryData.RecruitmentId) ? "#f90906" : !receptionRecruitment(entryData.RecruitmentId) ? "#ffb60d" : "#06f919"
    console.log(buildEmbedField(entryData.contents))
    return {embeds: [new Discord.MessageEmbed()
        .setTitle(`${configManager.getRecruitmentsData(entryData.RecruitmentId).name}(${entryData.RecruitmentId}) - 応募ID ${entryData.entryId}`)
        .setColor(color)
        .setURL("https://docs.google.com/spreadsheets/d/1CA12Yu6Q4WYUsRAfz4uP7bfQsORrYlgKqpZrxIoz1mo/")
        .setTimestamp(entryData.timestamp)
        .setFooter({"text" : "アジ鯖 人事システム"})
        .addFields(buildEmbedField(entryData.contents))
    ]}
}

function existRecruitment(RecruitmentId){
    if(configManager.getRecruitmentsData(RecruitmentId) != undefined) return true;
    return false;
}

function receptionRecruitment(RecruitmentId){
    const RecruitmentsData = configManager.getRecruitmentsData(RecruitmentId);
    if(RecruitmentsData==undefined) throw Error("The element does not exist.");
    if(RecruitmentsData.reception) return true
    return false;
}

function buildEmbedField(contents){
    const field = [];
    for(const key of secondTopics) {
        console.log(`${key} : ${configManager.getRecruitSystemData("TopicsList")[key]}`)
        if(key==="mcid"){
            field.push({
                name : configManager.getRecruitSystemData("TopicsList")[key],
                value : `[${contents[key]}](https://spicyazisaban.azisaba.net/search?q=${contents[key]})`
            });
            continue;
        }
        if(key==="twitterId" && contents[key]!=null){
            field.push({
                name : configManager.getRecruitSystemData("TopicsList")[key],
                value : `[${contents[key]}](https://twitter.com/${contents[key]})`
            });
            continue;
        }
        if(key==="discordId"){
            field.push({
                name : configManager.getRecruitSystemData("TopicsList")[key],
                value : `<@${contents[key]}>`
            })
            continue;
        }
        if(key==="discordUserName") continue;
        field.push({
            name : configManager.getRecruitSystemData("TopicsList")[key],
            value : contents[key]
        })
    }

    return field;
}