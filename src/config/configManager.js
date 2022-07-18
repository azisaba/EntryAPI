/*

created by huda0209
EntryReSender for discord bot

ran by node.js

2022-7-18

*/

"use strict"

const config = require("../util/config");

config.exist(true);
const BOT_DATA = config.loadConfig("setting.json");
const guildData = config.loadConfig("guildData.json");
const RecruitmentsData = config.loadConfig("RecruitmentsData.json");
const OrgData = config.loadConfig("OrgData.json");
const RecruitSystemData = config.loadConfig("recruitSystem.json");


exports.getBotData = (key)=>{
    return BOT_DATA[key];
}

exports.getGuildtData = (key)=>{
    return guildData[key];
}

exports.setGuildtData = (key, value)=>{
    guildData[key] = value;
}


exports.getRecruitmentsData = (key)=>{
    return RecruitmentsData[key] ? RecruitmentsData[key] : RecruitmentsData["default"];
}

exports.setRecruitmentsData = (key, value)=>{
    RecruitmentsData[key] = value;
}

exports.removeRecruitmentsData = (key)=>{
    if(RecruitmentsData[key]==undefined) throw Error("The element does not exist.")
    delete RecruitmentsData[key];
}


exports.getOrgData = (key)=>{
    return OrgData[key] ? OrgData[key] : OrgData["default"];
}

exports.setOrgData = (key, value)=>{
    OrgData[key] = value;
}

exports.removeOrgData = (key)=>{
    if(OrgData[key]==undefined) throw Error("The element does not exist.")
    delete OrgData[key];
}


exports.getRecruitSystemData = (key)=>{
    return RecruitSystemData[key];
}

exports.saveConfig = ()=>{
    config.save("guildData.json", guildData);
    config.save("RecruitmentsData.json", RecruitmentsData);
    config.save("recruitSystem.json", RecruitSystemData);
    config.save("OrgData.json", OrgData);
}