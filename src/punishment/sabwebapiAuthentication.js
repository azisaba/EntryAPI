/*

created by huda0209
EntryReSender for discord bot

ran by node.js

2022-8-7

*/

'use strict'

const configManager = require("../config/configManager");
const TokenCache = new (require("../util/cacheManager"))();
const request = require('request-promise');

function login(){
    const authData = configManager.getBotData("punishmentAPI");
    const option = {
        url : `${authData.url}/i_users/login`,
        headers: {
            "Content-type": "application/json",
            "Origin" : "https://spicyazisaban.azisaba.net"
        },
        json: {
            email: authData.mail,
            password: authData.password,
            mfa_token: ""
        }
    }
    const token = request.post(option)
        .then(r => {
            return r.state;
        })
        .catch(e=>{
            console.log(e);
            return null;
        })
    return token;
}

function logout(token){
    const authData = configManager.getBotData("punishmentAPI");
    const option = {
        url : `${authData.url}/i_users/logout`,
        headers: {
            "Content-type": "application/json",
            "X-SpicyAzisaBan-Session" : token,
            "Origin" : "https://spicyazisaban.azisaba.net"
        }
    }
    request.post(option)
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

exports.invalidateToken = ()=>{
    if(!TokenCache.exist("token")) return;

    const nowDate = (new Date()).getTime();
    if(TokenCache.get("token")) return;

    logout(TokenCache.get("token").data);
}