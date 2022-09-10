/*

created by huda0209
EntryReSender for discord bot

ran by node.js

2022-8-11

*/

'use strict'

const configManager = require("../config/configManager");
const TokenCache = new (require("../util/cacheManager"))();

async function login(){
    const authData = configManager.getBotData("punishmentAPI");

    const option = {
        method : "POST",
        headers : {
            "Content-type": "application/json",
            "Origin" : "https://spicyazisaban.azisaba.net"
        },
        body : JSON.stringify({
            email: authData.mail,
            password: authData.password,
            mfa_token: ""
        })
    };

    const token = await fetch(`${authData.url}/i_users/login`, option)
        .then(async res=>{
            if(res.ok) return (await res.json()).state;
            return null;
        })
        .catch(e=>{
            console.log(e);
            return null;
        });

    return token;
}

function logout(token){
    const authData = configManager.getBotData("punishmentAPI");
    const option = {
        method : "POST",
        headers: {
            "Content-type": "application/json",
            "X-SpicyAzisaBan-Session" : token,
            "Origin" : "https://spicyazisaban.azisaba.net"
        }
    };

    fetch(`${authData.url}/i_users/logout`, option)
        .then(r=>{
            console.log(r);
        })
        .then(e=>{
            console.log(e);
        });
}

exports.getToken = async ()=>{
    if(!TokenCache.exist("token")){
        const token = await login();
        TokenCache.set("token", token, (new Date()).setDate(((new Date()).getDate()+7)));
        return token;
    }

    if(TokenCache.get("token")){
        return TokenCache.get("token").data;
    }

    const token = await login();
    TokenCache.set("token", token, (new Date()).setDate(((new Date()).getDate()+7)));
    return token;
}

exports.invalidateToken = async ()=>{
    if(!TokenCache.exist("token")) return;

    const nowDate = (new Date()).getTime();
    if(TokenCache.get("token")) return;

    await logout(TokenCache.get("token").data);
}