# EntryReSender API仕様書

post body
```json
{
    "entryId" : "エントリーID",
    "RecruitmentId" : "募集ID",
    "timestamp" : "応募のタイムスタンプ",
    "contents" : {
        "name" : "呼びたい",
        "mcid" : "mcid",
        "discordId" : "Discordのユーザーid",
        "twitterId" : "TwitterID(不所持の時はnull)",
        "reasonForApplying" : "志望理由",
        "career" : "運営経験",
        "participatingProject" : "関わっているプロジェクト",
        "availableTimeOfDay" : "一日に活動可能できる時間",
        "availableDaysOfWeek" : "活動可能な曜日",
        "availableTimeZone" : "活動可能な時間帯",
        "skills" : "所持技術",
        "jobs" : "希望職種",
        "playtime" : "アジ鯖プレイ時間",
        "selfPR" : "自己PR",
        "entryRecruitments" : "応募した募集(配列)"
    }
}
```