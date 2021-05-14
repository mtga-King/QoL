//settings.js
module.exports = {
    "InstantDeploy": true,  //(CASE-SENSITIVE) true for Instant Deploy, false for Default Deploy timer(s) (Tamper)
    
    "RaidTimer":{ //Edit time you have to run around the raid (Cache)
        "EditRaidTimer": true, //(CASE SENSITIVE) true to edit, then edit number below (1 = 1 Minute)
        "NewRaidTimerTime": 90  //Set to any minute value - I prefer 90 - 120
    },

    "ExfilTimer":{ //Edit time it takes to exfil from... exfil (Cache)
        "EditExfilTimer": true, //(CASE SENSITIVE) true to edit, then edit number value (1 = 1 Second) 
        
        //Timer Types: Preset or Custom - EditExfilTimer must be true
        "RealisticExfilTimers": true, //Preset timers made by myself for *realism*
        "NewExfilTimerTime": 999  //To set new exfil timer, if RealisticExfilTimers is false - I prefer 0 - 5 (seconds)
    },

    "RunThroughRequirement":{ //Edit Run-Through nonsense (Tamper)
        "EditRunThrough": true, //true or false, false resets to default
        "NewRunThroughExp": 0, //300 EXP is default
        "NewRunThroughTime": 300, //Time in Seconds (600 = 600 seconds (10 minutes))
    },

    "UnlockExfils":{ //Unlock... exfils? (Cache)
        "UnlockExfiltrationType": true,    //true to allow use of exfils that -do not- require item; i.e. Scav Camp
        "RemovePassageRequirement": true,  //true to allow use of exfils that require item; i.e. Cliff Descent
        "AlwaysExfil":{
            "EditExfilChance": false, ////true to allow edit change percentage of exfils that aren't always open: i.e Pier Boat
            "NewExfilChancePercentage": 100, //100 means it will always be open  
        },
    },

    "RemoveRestrictionLimitsInRaid": true, //true or false, removes RestrictionInRaid parameters: i.e. Only 3 GPUs per raid   
    "RemoveContainerRestrictions": true,    //true or false, removes Secure Container and Backpack Restrictions: i.e. THICC Items Case not allowed in Backpack        
    "UnblockFoldables": true,   //true or false, removes BlocksFolding parameters: i.e Rubber Buttpad (Cache)
    "UnblockArmorVest": true,   //true or false, removes BlocksArmorVest parameters: i.e Allows Armor and Armored Rigs (Cache)
    "UnlockCosmetics": true,    //true, removes Customization parameters that aren't Money: i.e Clothes that require levels
    "FoundInRaid": true,        //true or false, gives all purchased items FoundInRaid status
}