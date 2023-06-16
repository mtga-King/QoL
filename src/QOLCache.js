exports.mod = (mod_info) => {
	logger.logInfo(`   [MOD] Loading: ${mod_info.name} (${mod_info.version}) by ${mod_info.author}`);

	//Load Settings from Config.json
	const config = require("../config.js");
	let locationfile = fileIO.readParsed(db.user.cache.locations); //var to store cache.locations.json
	let itemfile = fileIO.readParsed(db.user.cache.items); //var to store cache.items.json

	//Location.json Loop
	for (let map in locationfile) { //store locationfile data

		const LOCATION_FILE = locationfile[map];

		if (config.RaidTimer.EditRaidTimer) { 	//Extract Timer for All Maps
			//Find In-Raid Timer and Edit to NewRaidTimerTime
			LOCATION_FILE.base.exit_access_time = config.RaidTimer.NewRaidTimerTime;
			LOCATION_FILE.base.escape_time_limit = config.RaidTimer.NewRaidTimerTime;
		}
		//Access Exfil parameters
		for (let exf in LOCATION_FILE.base.exits) { //store base/exits parameters

			const LOCATION_BASE_EXITS = LOCATION_FILE.base.exits[exf];

			if (config.ExfilTimer.EditExfilTimer) {

				if (config.ExfilTimer.RealisticExfilTimers) {
					if (LOCATION_BASE_EXITS.ExfiltrationTime >= 5 && LOCATION_BASE_EXITS.ExfiltrationTime <= 10) {
						LOCATION_BASE_EXITS.ExfiltrationTime = 5;
					}
					if (LOCATION_BASE_EXITS.ExfiltrationTime >= 15 && LOCATION_BASE_EXITS.ExfiltrationTime <= 60) {
						LOCATION_BASE_EXITS.ExfiltrationTime = 15;
					}
				} else {
					//find ExfiltrationTime and change it to NewExfiltrationTimerTime
					LOCATION_BASE_EXITS.ExfiltrationTime = config.ExfilTimer.NewExfilTimerTime;
				}

			}
			if (config.UnlockExfils.UnlockExfiltrationType) {
				if (LOCATION_BASE_EXITS.PassageRequirement !== "WorldEvent") { //if ExfilType is not WorldEvent then
					LOCATION_BASE_EXITS.ExfiltrationType = "Individual";
				}
			}
			if (config.RemovePassageRequirement || LOCATION_BASE_EXITS.PassageRequirement !== "WorldEvent") {
				//Edit and Empty Exfil Item Requirements
				LOCATION_BASE_EXITS.Id = "";
				LOCATION_BASE_EXITS.PassageRequirement = "None"
				LOCATION_BASE_EXITS.Count = 0;
				LOCATION_BASE_EXITS.RequirementTip = "";
			}
			//Chance for Exfil to be Open
			if (config.UnlockExfils.AlwaysExfil.EditExfilChance) {
				//Edit Chance for Extract to be Open
				LOCATION_BASE_EXITS.Chance = config.UnlockExfils.AlwaysExfil.NewExfilChancePercentage
			}
		}
	}

	//Loop Checks
	if (config.ExfilTimer.EditExfilTimer) {
		logger.logInfo(`   [MOD] -- Exfil Timers: Editable`);
		if (config.ExfilTimer.RealisticExfilTimers) {
			logger.logInfo(`   [MOD] -- Realistic Exfil Timers: Set`);
		} else
			logger.logInfo(`   [MOD] -- User Set Exfil Timers: Set`);
	}
	if (config.UnlockExfils.UnlockExfiltrationType) {
		logger.logInfo(`   [MOD] -- Exfils: Unlocked`);
	} else {
		logger.logInfo(`   [MOD] -- Exfils: Default`);
	}
	if (config.RemovePassageRequirement) {
		logger.logInfo(`   [MOD] -- Passages: Unlocked`);
	}



	//Item.json Loop
	for (const ez in itemfile.data) { //Remove Item Nodes to Access _props

		const itemData = itemfile.data[ez];
		const propsData = itemfile.data[ez]._props;

		// if (itemfile.data[ez]._type != "Node") { //If _type isn't Node }

		//Remove Item Filters for Secure Containers and Backpacks based on _parentID
		if (config.RemoveContainerRestrictions) {
			if (itemData._parent === "5448bf274bdc2dfc2f8b456a"
				|| itemData._parent === "5448e53e4bdc2d60728b4567") {
				propsData.Grids[0]._props.filters = []; //0 = 1
			}
		}


		//Remove BlocksFolding from Items
		if (config.UnblockFoldables) {
			if (propsData.BlocksFolding) {
				propsData.BlocksFolding = false;
			}
		}

		//Remove BlocksArmorVest parameters
		if (config.UnblockArmorVest) {
			if (propsData.BlocksArmorVest) {
				propsData.BlocksArmorVest = false;
			}
		}
	}

	//Item Loop Checks

	if (config.RemoveContainerRestrictions) {
		logger.logInfo(`   [MOD] -- Container Restrictions: Removed`);
	} else {
		logger.logInfo(`   [MOD] -- Container Restrictions: Default`);
	}
	if (config.UnblockFoldables) {
		logger.logInfo(`   [MOD] --  Weapon Folding: Unblocked`);
	} else {
		logger.logInfo(`   [MOD] -- Weapon Folding: Default`);
	}
	if (config.UnblockArmorVest) {
		logger.logInfo(`   [MOD] -- Armor Stacking: Unlocked`);
	} else {
		logger.logInfo(`   [MOD] -- Armor Stacking: Default`);
	}



	//ExfiltrationType = Individual, SharedTimer, Manual
	//PassageRequirement = None, Empty, TransferItem, WorldEvent, ScavCooperation
	//TransferItem requires you put itemID of item needed for PassageRequirement, Count is Amount of Item
	//RequirementTip = Tooltip that tells you what you need


	fileIO.write(db.user.cache.locations, locationfile);
	fileIO.write(db.user.cache.items, itemfile);
	logger.logInfo(`   [MOD] Loaded: ${mod_info.name} (${mod_info.version}) by ${mod_info.author}`);
}
