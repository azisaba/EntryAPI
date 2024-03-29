

const configManager = require("./configManager");
const discordAPI = require("../callApi/discordjsApiCaller");
const Organization = require("../structures/Organization");
const Recruitment = require("../structures/Recruitment");

const {Collection} = require("@discordjs/collection")

const recruitments = new Collection();

/**
 * 募集情報のデータをClassオブジェクトに格納する
 * @return {Promise<void>}
 */
exports.init = async ()=>{
    const recruitmentsJsonObj = configManager.getAllgRecruitmentsData();

    for (const key in recruitmentsJsonObj) {
        const orgSign = key.match(/[a-z]{2}/)[0];
        const orgJson = configManager.getOrgData(orgSign);

        const organization = new Organization(
            orgJson.name,
            orgSign,
            await discordAPI.getChannelFromChannelId(orgJson.channelId)
        )

        recruitments.set(key,
            new Recruitment(
                key,
                recruitmentsJsonObj[key].name,
                organization,
                recruitmentsJsonObj[key].mention,
                recruitmentsJsonObj[key].reception
            )
        )
    }
}

/**
 * 募集情報を取得する
 * @param {String}id
 * @return {Recruitment}
 */
exports.getById = (id)=>{
    return recruitments.has(id) ? recruitments.get(id) : recruitments.get("default");
}