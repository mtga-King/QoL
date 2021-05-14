exports.mod = (mod_info) => {
    logger.logInfo(`   [MOD] Loading: ${mod_info.name} (${mod_info.version}) by ${mod_info.author}`);

	//Load Settings from settings.json
	const settings = require("../settings.js");
	const traderID = ["5ac3b934156ae10c4430e83c", "579dc571d53a0658a154fbec", "nugent"];

	//Shortcut to allow script to read/access globals.json
	let globals = fileIO.readParsed(global.db.base.globals);
	let users = fileIO.readParsed(global.db.user.configs.gameplay);

	//Set all Items as FoundInRaid (FIR)
	if (settings.FoundInRaid == true){
		if	(users.trading.buyItemsMarkedFound == false){
			users.trading.buyItemsMarkedFound = true;
		} 
	} 
	else if (settings.FoundInRaid == false){
			users.trading.buyItemsMarkedFound = false;
		}

	fileIO.write(global.db.user.configs.gameplay, users);


	//Unlock Cosmetics
	if (settings.UnlockCosmetics == true){
		for (let trader in traderID){
			let shop = fileIO.readParsed('db/traders/' + traderID[trader] + '/suits.json');
			for (let req in shop) {
				shop[req].requirements = {
					"loyaltyLevel": 0,
					"profileLevel": 1,
					"standing": 0,
					"skillRequirements": [],
					"questRequirements": [],
					"itemRequirements": shop[req].requirements.itemRequirements //want the value to stay the same
				}
			} 
			fileIO.write('db/traders/' + traderID[trader] + '/suits.json', shop);

		}
	}/* else {
		for (let trader in traderID){
			let shop = fileIO.readParsed("./db/"+traderID[trader]+"/suits.json");
			for (let req in shop) {
				shop[req].requirements = {
					"loyaltyLevel": shop[req].requirements.loyaltyLevel,
					"profileLevel": shop[req].requirements.profileLevel,
					"standing": shop[req].requirements.standing,
					"skillRequirements": shop[req].requirements.skillRequirements,
					"questRequirements": shop[req].requirements.questRequirements,
					"itemRequirements": shop[req].requirements.itemRequirements //want the value to stay the same
				}
			} 
			fileIO.write('db/traders/' + traderID[trader] + '/suits.json', shop);
		}
	}*/




	//Config node Loop

	let globalconfig = globals.data.config;

	for (let conf in globalconfig){
		if (settings.InstantDeploy == true){ //if true
			if(globalconfig[conf].TimeBeforeDeploy != 0){ //if TimeBeforeDeploy doesn't equal 0 (zero)
				globalconfig[conf].TimeBeforeDeploy = 0 //then make it equal 0 (zero)
			}
			if(globalconfig[conf].TimeBeforeDeployLocal != 0){ //if TimeBeforeDeploy doesn't yadayada
				globalconfig[conf].TimeBeforeDeployLocal = 0 //make 0 (zero)
			} 
		}	else { //if false, reset to default
				if(globalconfig[conf].TimeBeforeDeploy != 0){
					globalconfig[conf].TimeBeforeDeploy = 20
				}
				if(globalconfig[conf].TimeBeforeDeployLocal != 0){
					globalconfig[conf].TimeBeforeDeployLocal = 10
				}
			}
	
				//Remove Item Limit Restrictions
	
		if (settings.RemoveRestrictionLimitsInRaid == true){
			globalconfig[conf].RestrictionsInRaid = []; //remove restrictions
	
		} else { //reset Restrictions
			globalconfig[conf].RestrictionsInRaid = [
						{
							"TemplateId": "5449016a4bdc2d6f028b456f",
							"Value": 280000
						},
						{
							"TemplateId": "5696686a4bdc2da3298b456a",
							"Value": 4000
						},
						{
							"TemplateId": "569668774bdc2da2298b4568",
							"Value": 4000
						},
						{
							"TemplateId": "59faff1d86f7746c51718c9c",
							"Value": 3
						},
						{
							"TemplateId": "5d235b4d86f7742e017bc88a",
							"Value": 7
						},
						{
							"TemplateId": "5c0a4247e52b1a00125e1830",
							"Value": 2
						},
						{
							"TemplateId": "5c1d0c5f86f7744bb2683cf0",
							"Value": 2
						},
						{
							"TemplateId": "5c1d0d6d86f7744bb2683e1f",
							"Value": 2
						},
						{
							"TemplateId": "5c1e495a86f7743109743dfb",
							"Value": 2
						},
						{
							"TemplateId": "5ad5d7d286f77450166e0a89",
							"Value": 2
						},
						{
							"TemplateId": "5ad7247386f7747487619dc3",
							"Value": 2
						},
						{
							"TemplateId": "5448ba0b4bdc2d02308b456c",
							"Value": 3
						},
						{
							"TemplateId": "5c1e2a1e86f77431ea0ea84c",
							"Value": 2
						},
						{
							"TemplateId": "5e42c71586f7747f245e1343",
							"Value": 2
						},
						{
							"TemplateId": "5a0dc95c86f77452440fc675",
							"Value": 2
						},
						{
							"TemplateId": "5a0ee4b586f7743698200d22",
							"Value": 2
						},
						{
							"TemplateId": "5a0ee76686f7743698200d5c",
							"Value": 2
						},
						{
							"TemplateId": "5a13ef0686f7746e5a411744",
							"Value": 2
						},
						{
							"TemplateId": "5a13f24186f77410e57c5626",
							"Value": 2
						},
						{
							"TemplateId": "5a0eecf686f7740350630097",
							"Value": 2
						},
						{
							"TemplateId": "5a0f08bc86f77478f33b84c2",
							"Value": 2
						},
						{
							"TemplateId": "5aafbde786f774389d0cbc0f",
							"Value": 3
						},
						{
							"TemplateId": "5e2af55f86f7746d4159f07c",
							"Value": 1
						},
						{
							"TemplateId": "5d235bb686f77443f4331278",
							"Value": 3
						},
						{
							"TemplateId": "5c127c4486f7745625356c13",
							"Value": 2
						},
						{
							"TemplateId": "59fb023c86f7746d0d4b423c",
							"Value": 2
						},
						{
							"TemplateId": "59fafd4b86f7745ca07e1232",
							"Value": 3
						},
						{
							"TemplateId": "5c1267ee86f77416ec610f72",
							"Value": 3
						},
						{
							"TemplateId": "59faf7ca86f7740dbe19f6c2",
							"Value": 3
						},
						{
							"TemplateId": "5c0530ee86f774697952d952",
							"Value": 3
						},
						{
							"TemplateId": "5c052e6986f7746b207bc3c9",
							"Value": 3
						},
						{
							"TemplateId": "590c60fc86f77412b13fddcf",
							"Value": 3
						},
						{
							"TemplateId": "5bc9bdb8d4351e003562b8a1",
							"Value": 2
						},
						{
							"TemplateId": "5bc9c377d4351e3bac12251b",
							"Value": 3
						},
						{
							"TemplateId": "5e54f6af86f7742199090bf3",
							"Value": 2
						},
						{
							"TemplateId": "5df8a4d786f77412672a1e3b",
							"Value": 1
						},
						{
							"TemplateId": "5780cf942459777df90dcb72",
							"Value": 2
						},
						{
							"TemplateId": "5c0e774286f77468413cc5b2",
							"Value": 1
						},
						{
							"TemplateId": "5c0e805e86f774683f3dd637",
							"Value": 1
						},
						{
							"TemplateId": "5b44c6ae86f7742d1627baea",
							"Value": 1
						},
						{
							"TemplateId": "59e763f286f7742ee57895da",
							"Value": 1
						},
						{
							"TemplateId": "5ab8ebf186f7742d8b372e80",
							"Value": 1
						},
						{
							"TemplateId": "545cdae64bdc2d39198b4568",
							"Value": 1
						},
						{
							"TemplateId": "5d80c60f86f77440373c4ece",
							"Value": 2
						},
						{
							"TemplateId": "5d80c62a86f7744036212b3f",
							"Value": 2
						},
						{
							"TemplateId": "5913915886f774123603c392",
							"Value": 2
						},
						{
							"TemplateId": "5d08d21286f774736e7c94c3",
							"Value": 2
						},
						{
							"TemplateId": "5b43575a86f77424f443fe62",
							"Value": 4
						},
						{
							"TemplateId": "5bc9b720d4351e450201234b",
							"Value": 4
						},
						{
							"TemplateId": "5d1b327086f7742525194449",
							"Value": 4
						},
						{
							"TemplateId": "5e2aee0a86f774755a234b62",
							"Value": 3
						},
						{
							"TemplateId": "5c12620d86f7743f8b198b72",
							"Value": 5
						},
						{
							"TemplateId": "5c1f79a086f7746ed066fb8f",
							"Value": 2
						},
						{
							"TemplateId": "5c1e2d1f86f77431e9280bee",
							"Value": 2
						},
						{
							"TemplateId": "5d8e0db586f7744450412a42",
							"Value": 2
						},
						{
							"TemplateId": "5d0377ce86f774186372f689",
							"Value": 3
						},
						{
							"TemplateId": "590c621186f774138d11ea29",
							"Value": 4
						},
						{
							"TemplateId": "5c052f6886f7746b1e3db148",
							"Value": 3
						},
						{
							"TemplateId": "57347ca924597744596b4e71",
							"Value": 3
						}
					];
				}
	}

	

		let _match_end = globalconfig[conf].exp.match_end; //match_end node var
		
		if (settings.RunThroughRequirement.EditRunThrough == true){
			_match_end.survived_exp_requirement = settings.RunThroughRequirement.NewRunThroughExp;
			_match_end.survived_seconds_requirement = settings.RunThroughRequirement.NewRunThroughTime;
			_match_end.survivedMult = 0.75; //edit multiplier so people don't abuse the extra exp for surviving
		} else { //if false, reset to defaults
			_match_end.survived_exp_requirement = 300;
			_match_end.survived_seconds_requirement = 600;
			_match_end.survivedMult = 1.5;
		}

//Checks
	if (settings.RemoveRestrictionLimitsInRaid == true){
		logger.logInfo(`   [MOD] -- RestrictionLimitsInRaid: Edited`);
	}		else {
		logger.logInfo(`   [MOD] -- RestrictionLimitsInRaid: Default`);
	}

	if (settings.RunThroughRequirement.EditRunThrough == true){
		logger.logInfo(`   [MOD] -- RunThroughRequirements: Edited`);
	} else {
		logger.logInfo(`   [MOD] -- RunThroughRequirements: Default`);
	}

    
	fileIO.write(global.db.base.globals, globals);
	logger.logInfo(`   [MOD] Loaded: ${mod_info.name} (${mod_info.version}) by ${mod_info.author}`);
}

