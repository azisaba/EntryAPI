"use strict"

const config = require("../util/config");

config.exist(true);
const BOT_DATA = config.loadConfig("setting.json");
const guildData = config.loadConfig("guildData.json");
const RecruitmentsData = config.loadConfig("RecruitmentsData.json");
const OrgData = config.loadConfig("OrgData.json");
const RecruitSystemData = config.loadConfig("recruitSystem.json");
const reviewEntries = config.loadConfig("reviewEntries.json");


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

exports.getAllgRecruitmentsData = ()=>{
    return RecruitmentsData;
}

exports.removeRecruitmentsData = (key)=>{
    if(RecruitmentsData[key]===undefined) throw Error("The element does not exist.")
    delete RecruitmentsData[key];
}


exports.getOrgData = (key)=>{
    return OrgData[key] ? OrgData[key] : OrgData["default"];
}

exports.setOrgData = (key, value)=>{
    OrgData[key] = value;
}

exports.getAllOrgData = ()=>{
    return OrgData;
}

exports.removeOrgData = (key)=>{
    if(OrgData[key]===undefined) throw Error("The element does not exist.")
    delete OrgData[key];
}


exports.getRecruitSystemData = (key)=>{
    return RecruitSystemData[key];
}

exports.getReviewEntry = (key)=>{
    return reviewEntries[key];
}

exports.getAllReviewEntreis = ()=>{
    return reviewEntries;
}

exports.setReviewEntry = (key, value)=>{
    reviewEntries[key] = value;
}

exports.removeReviewEntry = (key)=>{
    if(reviewEntries[key]==undefined) throw Error("The element does not exist.")
    delete reviewEntries[key];
}


exports.saveConfig = ()=>{
    config.save("guildData.json", guildData);
    config.save("RecruitmentsData.json", RecruitmentsData);
    config.save("recruitSystem.json", RecruitSystemData);
    config.save("OrgData.json", OrgData);
    config.save("reviewEntries.json", reviewEntries);
}