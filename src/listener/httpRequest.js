'use strict'

const router = require("express").Router();
const tokenManager = require("../authorization/tokenManager");
const entryManager = require("../entry/entryContentManager");
const recruitmentManager = require("../config/RecruitmentsManager");

const Applicant = require("../structures/Applicant");
const EntryContent = require("../structures/EntryContent");
const Entry = require("../structures/Entry");

const buildMinecraftPlayer = require("../buildStructure/buildMinecraftPlayer");
const buildPunishment = require("../buildStructure/buildPunishment");
const discordjsAPI = require("../callApi/discordjsApiCaller");

const {EventEmitter} = require("events")
/**
 * @type {EventEmitter}
 */
let entryEvent = null;

router.post('/', async(req,res)=>{
    const token = req.headers.token
    
    if(!token){
        res.status(401).send(`Unauthorized`);
        //log.info(`Unknown User(${req.ip}) accessed for main(ip return). Method: Get, ResponceCode: 400, ResponceBody: ${messageTemplate.NoSessionID}`);
        return;
    }
    
    if(tokenManager.AuthenticateToken(token)){
        res.status(403).send("Forbidden");
        //log.info(`Unknown User(${req.ip}) accessed for main(ip return). Method: Get, ResponceCode: 403, ResponceBody: ${messageTemplate.UnKnownSessionId}`);
        return;
    }
    
    const reqBody = req.body;
    if(!entryManager.checkEntryDataForm(reqBody)){
        res.status(400).send(`Bad Request`);
        return;
    }
    res.status(200).send("ok");

    //reasonForApplying, career, participatingProject, availableTimeOfDay, availableDaysOfWeek, availableTimeZone, skills, job, playtime, selfPR
    const entryContent = new EntryContent(
        reqBody.contents.reasonForApplying,
        reqBody.contents.career,
        reqBody.contents.participatingProject,
        reqBody.contents.availableTimeOfDay,
        reqBody.contents.availableDaysOfWeek,
        reqBody.contents.availableTimeZone,
        reqBody.contents.skills,
        reqBody.contents.jobs,
        reqBody.contents.playtime,
        reqBody.contents.selfPR,
    );

    const MinecraftPlayerDataOfApplicant = await buildMinecraftPlayer.buildByName(reqBody.contents.mcid);

    const applicant = new Applicant(
        reqBody.contents.name,
        MinecraftPlayerDataOfApplicant,
        reqBody.contents.discordName,
        buildPunishment.buildFromUserUUID(MinecraftPlayerDataOfApplicant.uuid),
        reqBody.contents.twitterId
    )

    const entry = new Entry(
        reqBody.entryId,
        recruitmentManager.getById(reqBody.RecruitmentId),
        applicant,
        entryContent,
        reqBody.contents.entryRecruitments.map(value=>{
           return recruitmentManager.getById(value);
        }),
        reqBody.timestamp
    )
    entryEvent.emit("receive", entry);
})

exports.middleware = router;

/**
 *
 * @param {EventEmitter}event
 */
exports.init = (event)=>{entryEvent = event;}