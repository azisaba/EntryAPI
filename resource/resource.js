/*
DON'T TOUCH!!
*/

module.exports =  {
    "setting.json" : {
        pass : "./config/setting.json",
        keys : {
            NAME : {
                canEmpty : false,
                replace : false,
                default : "EntryAPI"
            },
            MAIN_TOKEN : {
                canEmpty : false,
                replace : false,
                default : ""
            },
            DEV_TOKEN : {
                canEmpty : true,
                replace : false,
                default : ""
            },
            PREFIX : {
                canEmpty : false,
                replace : false,
                default : "//"
            },
            COMMAND : {
                canEmpty : false,
                replace : false,
                default : "ers"
            },
            PORT : {
                canEmpty : false,
                replace : false,
                default : 3000
            }
        }
    },

    "RecruitmentsData.json" : {
        pass : "./config/RecruitmentsData.json",
        keys : {}
    },
    "OrgData.json" : {
        pass : "./config/OrgData.json",
        keys : {}
    },
    "guildData.json" : {
        pass : "./config/guildData.json",
        keys : {}
    },
    "recruitSystem.json" : {
        pass : "./config/recruitSystem.json",
        keys : {}
    },
    "reviewEntries.json" : {
        pass : "./config/reviewEntries.json",
        keys : {}
    }
}
