/*

created by huda0209
EntryReSender for discord bot 

main.js
 
ran by node.js

2022-9-10

*/
'use strict'

//node.js modules
const fs = require('fs');
const express = require("express");
const bodyParser = require('body-parser');
const discord = require("discord.js");
require('date-utils');

//other 
const DiscordClient = new discord.Client({intents: ["GUILDS", "GUILD_MESSAGES"], partials: ["USER", "MESSAGE", "CHANNEL"]});
const logger = require('./src/util/logFile');
const configManager = require("./src/config/configManager");
const Package = require("./package.json");
const apiMiddleware = require("./src/listener/httpRequest");
const tokenManager = require("./src/authorization/tokenManager");
const sabwebapiAuth = require("./src/callApi/sabwebapiAuthentication");
const sab = require("./src/callApi/sabwebapiCaller")

//init
require("./src/util/discord/channelCreate").init(DiscordClient);
require("./src/entry/receiveEntry").init(DiscordClient);
require("./src/util/discord/sendMessage").init(DiscordClient);
require("./src/entry/entryContentManager").init();
const apiSrv = express();



apiSrv.use(bodyParser.json({extended: true}));
apiSrv.use('/', apiMiddleware.middleware);

logger.info(`This service is standing now...`);
process.on("exit", ()=>{
	sabwebapiAuth.invalidateToken();
	configManager.saveConfig();
	DiscordClient.destroy();
    logger.info(`service end.`);
    logger.hasLastLog();
    console.log("Exitting...");
});

process.on("SIGINT", ()=>{
	process.exit(0);
});

//start the discord bot
DiscordClient.on("ready", () => {
	logger.info(`bot is ready! ver. ${Package.version} \n        login: {cyan}${DiscordClient.user.tag}{reset}\n`);
	DiscordClient.user.setActivity(`ver. ${Package.version}`, { type: 'PLAYING' });
});

//start the http api server
apiSrv.listen(configManager.getBotData("PORT"), ()=>{
	logger.info(`http api server is ready!${configManager.getBotData("PORT")}\n        start up : {green}${(new Date()).toFormat('DDD MMM DD YYYY HH24:MI:SS')}{reset}\n`);
});


let token;
if(process.argv.length == 3){
  	switch(process.argv[2]){
  	  	case "main" :
  	    	token = configManager.getBotData("MAIN_TOKEN");
  	    	break;
  	  	case "dev" :
  	    	if(!configManager.getBotData("DEV_TOKEN")){
				logger.error(`Don't have a property "{red}DIV_TOKEN{reset}" in {green}setting.json{reset}.`);
				process.exit(0);
			}
  	    	token = configManager.getBotData("DEV_TOKEN");
			require("./src/util/checkVersion");
  	    	break;
  	  	default :
  	    	logger.error(`Unknown command. \nUsage \n {green}node main.js main{reset} : use main token \n {green}node main.js div{reset} : use divelopment token`);
  	    	process.exit(0);
  	};
}else if(process.argv.length == 2){
	token = configManager.getBotData("MAIN_TOKEN");
}else{
	logger.error(`Unknown command. \nUsage \n {green}node main.js main{reset} : use main token \n {green}node main.js div{reset} : use divelopment token`);
	process.exit(0);
}

DiscordClient.login(token)
	.then(res=>{
		logger.info(`Succeed to login the discord service.`);
	})
	.catch(error=>{
		logger.error(`Could not login the discord service.\n${error}`);
	});