/*
created by huda0209

checkVersion.js :module  Check the version of the source code in the same directory.
 ver. 2.1.0

depend: fs
        https

ran by node.js
2022-9-18
*/
"use strict"

exports.SourceInfo={name:"checkVersion", version:"2.0.0", requrl:"UtilsVersion"};

const fs = require("fs");
const https = require("https");

const requestList = {
    "UtilsVersion" : "https://raw.githubusercontent.com/huda0209/Versions/main/UtilsVersion.json"
}

let dataCahce = undefined;
let expires = Date.now()

fs.readdir(__dirname, (err, files) => {
    files.forEach(async fileName => {
        if(!fileName.endsWith(".js")) return;

        let sourceInfo = null;
        let source;
        let OriginalVersion;

        try{
            source = require(`./${fileName}`);
        }catch(e){
            console.log(` \u001b[41m ERROR \u001b[0m \u001b[31mFailed to load "${fileName}.\u001b[0m`);
            console.log(e);
            return;
        }
        
        sourceInfo = source.SourceInfo;

        if(!sourceInfo){
            console.log(` \u001b[41m ERROR \u001b[0m \u001b[31mFailed to read property "SourceInfo" in ${fileName}.\u001b[0m`);
            return;
        }

        const url = requestList[sourceInfo.requrl] ?  requestList[sourceInfo.requrl] : sourceInfo.requrl;

        if(expires>Date.now()){
            console.log("ee")
            OriginalVersion = dataCahce[sourceInfo.name];
            if(OriginalVersion==undefined){
                console.log(` \u001b[43m WARN \u001b[0m \u001b[36m${fileName}\u001b[0m \u001b[33mis NOT set to version data\u001b[0m in remote verseion file.\u001b[0m`);
                return;
            }
            if(OriginalVersion != sourceInfo.version) console.log(` \u001b[43m WARN \u001b[0m \u001b[36m${fileName}\u001b[0m has an \u001b[32mupdate\u001b[0m. \u001b[41m${sourceInfo.version}\u001b[0m(now)=>\u001b[32m${OriginalVersion}\u001b[0m(new)\u001b[0m`);
        }

        dataCahce = await request(url);
        expires = Date.now() + 120*1000;

        OriginalVersion = dataCahce[sourceInfo.name];

        if(OriginalVersion==undefined){
            console.log(` \u001b[43m WARN \u001b[0m \u001b[36m${fileName}\u001b[0m \u001b[33mis NOT set to version data\u001b[0m in remote verseion file.\u001b[0m`);
            return;
        }
        if(OriginalVersion != sourceInfo.version) console.log(` \u001b[43m WARN \u001b[0m \u001b[36m${fileName}\u001b[0m has an \u001b[32mupdate\u001b[0m. \u001b[41m${sourceInfo.version}\u001b[0m(now)=>\u001b[32m${OriginalVersion}\u001b[0m(new)\u001b[0m`);
    
    })
});

const request = (url)=>{
    return new Promise((resolve, reject)=>{
        https.get(url, res=>{
            const bodyArray = []
    
            res.on("data", chunk=>{
                bodyArray.push(chunk);
            })
            let response;
            res.on("end", ()=>{
                try{
                    response = JSON.parse(Buffer.concat(bodyArray));
                }catch(error){
                    console.log(` \u001b[41m ERROR \u001b[0m \u001b[31mFailed to parse text to json.\u001b[0m`);
                    console.log(error);
                    reject(error);
                    return;
                }
                resolve(response);
            })
    
        }).on("error", (error)=>{
            console.log(` \u001b[41m ERROR \u001b[0m \u001b[31mFailed to run https request.\u001b[0m`)
            console.log(error);
            reject(error);
            return;
        })
    })
}