/*

created by huda0209
EntryReSender for discord bot 
 
ran by node.js

2022-7-18

*/

'use strict'

const router = require("express").Router();
const tokenManager = require("../token/tokenManager");
const entryManager = require("../util/entryContentManager");
const receiveEntry = require("../event/receiveEntry");


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
    receiveEntry.receiveEntry(reqBody);
    res.status(200).send("ok");
})

exports.middleware = router;