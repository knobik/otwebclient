"use strict";
exports.__esModule = true;
var Otc;
(function (Otc) {
    Otc[Otc["TILE_PIXELS"] = 32] = "TILE_PIXELS";
    Otc[Otc["MAX_ELEVATION"] = 24] = "MAX_ELEVATION";
    Otc[Otc["SEA_FLOOR"] = 7] = "SEA_FLOOR";
    Otc[Otc["UNDERGROUND_FLOOR"] = 8] = "UNDERGROUND_FLOOR";
    Otc[Otc["MAX_Z"] = 15] = "MAX_Z";
    Otc[Otc["AWARE_UNDEGROUND_FLOOR_RANGE"] = 2] = "AWARE_UNDEGROUND_FLOOR_RANGE";
    Otc[Otc["INVISIBLE_TICKS_PER_FRAME"] = 500] = "INVISIBLE_TICKS_PER_FRAME";
    Otc[Otc["ITEM_TICKS_PER_FRAME"] = 500] = "ITEM_TICKS_PER_FRAME";
    Otc[Otc["ANIMATED_TEXT_DURATION"] = 1000] = "ANIMATED_TEXT_DURATION";
    Otc[Otc["STATIC_DURATION_PER_CHARACTER"] = 60] = "STATIC_DURATION_PER_CHARACTER";
    Otc[Otc["MIN_STATIC_TEXT_DURATION"] = 3000] = "MIN_STATIC_TEXT_DURATION";
    Otc[Otc["MAX_STATIC_TEXT_WIDTH"] = 200] = "MAX_STATIC_TEXT_WIDTH";
    Otc[Otc["MAX_AUTOWALK_STEPS_RETRY"] = 10] = "MAX_AUTOWALK_STEPS_RETRY";
    Otc[Otc["MAX_AUTOWALK_DIST"] = 127] = "MAX_AUTOWALK_DIST";
})(Otc = exports.Otc || (exports.Otc = {}));
var DrawFlags;
(function (DrawFlags) {
    DrawFlags[DrawFlags["DrawGround"] = 1] = "DrawGround";
    DrawFlags[DrawFlags["DrawGroundBorders"] = 2] = "DrawGroundBorders";
    DrawFlags[DrawFlags["DrawOnBottom"] = 4] = "DrawOnBottom";
    DrawFlags[DrawFlags["DrawOnTop"] = 8] = "DrawOnTop";
    DrawFlags[DrawFlags["DrawItems"] = 16] = "DrawItems";
    DrawFlags[DrawFlags["DrawCreatures"] = 32] = "DrawCreatures";
    DrawFlags[DrawFlags["DrawEffects"] = 64] = "DrawEffects";
    DrawFlags[DrawFlags["DrawMissiles"] = 128] = "DrawMissiles";
    DrawFlags[DrawFlags["DrawCreaturesInformation"] = 256] = "DrawCreaturesInformation";
    DrawFlags[DrawFlags["DrawStaticTexts"] = 512] = "DrawStaticTexts";
    DrawFlags[DrawFlags["DrawAnimatedTexts"] = 1024] = "DrawAnimatedTexts";
    DrawFlags[DrawFlags["DrawAnimations"] = 2048] = "DrawAnimations";
    DrawFlags[DrawFlags["DrawBars"] = 4096] = "DrawBars";
    DrawFlags[DrawFlags["DrawNames"] = 8192] = "DrawNames";
    DrawFlags[DrawFlags["DrawLights"] = 16384] = "DrawLights";
    DrawFlags[DrawFlags["DrawManaBar"] = 32768] = "DrawManaBar";
    DrawFlags[DrawFlags["DrawWalls"] = 12] = "DrawWalls";
    DrawFlags[DrawFlags["DrawEverything"] = 65535] = "DrawEverything";
})(DrawFlags = exports.DrawFlags || (exports.DrawFlags = {}));
var DatOpts;
(function (DatOpts) {
    DatOpts[DatOpts["DatGround"] = 0] = "DatGround";
    DatOpts[DatOpts["DatGroundClip"] = 1] = "DatGroundClip";
    DatOpts[DatOpts["DatOnBottom"] = 2] = "DatOnBottom";
    DatOpts[DatOpts["DatOnTop"] = 3] = "DatOnTop";
    DatOpts[DatOpts["DatContainer"] = 4] = "DatContainer";
    DatOpts[DatOpts["DatStackable"] = 5] = "DatStackable";
    DatOpts[DatOpts["DatForceUse"] = 6] = "DatForceUse";
    DatOpts[DatOpts["DatMultiUse"] = 7] = "DatMultiUse";
    DatOpts[DatOpts["DatWritable"] = 8] = "DatWritable";
    DatOpts[DatOpts["DatWritableOnce"] = 9] = "DatWritableOnce";
    DatOpts[DatOpts["DatFluidContainer"] = 10] = "DatFluidContainer";
    DatOpts[DatOpts["DatSplash"] = 11] = "DatSplash";
    DatOpts[DatOpts["DatBlockWalk"] = 12] = "DatBlockWalk";
    DatOpts[DatOpts["DatNotMoveable"] = 13] = "DatNotMoveable";
    DatOpts[DatOpts["DatBlockProjectile"] = 14] = "DatBlockProjectile";
    DatOpts[DatOpts["DatBlockPathFind"] = 15] = "DatBlockPathFind";
    DatOpts[DatOpts["DatPickupable"] = 16] = "DatPickupable";
    DatOpts[DatOpts["DatHangable"] = 17] = "DatHangable";
    DatOpts[DatOpts["DatHookSouth"] = 18] = "DatHookSouth";
    DatOpts[DatOpts["DatHookEast"] = 19] = "DatHookEast";
    DatOpts[DatOpts["DatRotable"] = 20] = "DatRotable";
    DatOpts[DatOpts["DatLight"] = 21] = "DatLight";
    DatOpts[DatOpts["DatDontHide"] = 22] = "DatDontHide";
    DatOpts[DatOpts["DatTranslucent"] = 23] = "DatTranslucent";
    DatOpts[DatOpts["DatDisplacement"] = 24] = "DatDisplacement";
    DatOpts[DatOpts["DatElevation"] = 25] = "DatElevation";
    DatOpts[DatOpts["DatLyingCorpse"] = 26] = "DatLyingCorpse";
    DatOpts[DatOpts["DatAnimateAlways"] = 27] = "DatAnimateAlways";
    DatOpts[DatOpts["DatMinimapColor"] = 28] = "DatMinimapColor";
    DatOpts[DatOpts["DatLensHelp"] = 29] = "DatLensHelp";
    DatOpts[DatOpts["DatFullGround"] = 30] = "DatFullGround";
    DatOpts[DatOpts["DatIgnoreLook"] = 31] = "DatIgnoreLook";
    DatOpts[DatOpts["DatCloth"] = 32] = "DatCloth";
    DatOpts[DatOpts["DatAnimation"] = 33] = "DatAnimation";
    DatOpts[DatOpts["DatLastOpt"] = 255] = "DatLastOpt";
})(DatOpts = exports.DatOpts || (exports.DatOpts = {}));
var InventorySlot;
(function (InventorySlot) {
    InventorySlot[InventorySlot["InventorySlotHead"] = 1] = "InventorySlotHead";
    InventorySlot[InventorySlot["InventorySlotNecklace"] = 2] = "InventorySlotNecklace";
    InventorySlot[InventorySlot["InventorySlotBackpack"] = 3] = "InventorySlotBackpack";
    InventorySlot[InventorySlot["InventorySlotArmor"] = 4] = "InventorySlotArmor";
    InventorySlot[InventorySlot["InventorySlotRight"] = 5] = "InventorySlotRight";
    InventorySlot[InventorySlot["InventorySlotLeft"] = 6] = "InventorySlotLeft";
    InventorySlot[InventorySlot["InventorySlotLegs"] = 7] = "InventorySlotLegs";
    InventorySlot[InventorySlot["InventorySlotFeet"] = 8] = "InventorySlotFeet";
    InventorySlot[InventorySlot["InventorySlotRing"] = 9] = "InventorySlotRing";
    InventorySlot[InventorySlot["InventorySlotAmmo"] = 10] = "InventorySlotAmmo";
    InventorySlot[InventorySlot["InventorySlotPurse"] = 11] = "InventorySlotPurse";
    InventorySlot[InventorySlot["InventorySlotExt1"] = 12] = "InventorySlotExt1";
    InventorySlot[InventorySlot["InventorySlotExt2"] = 13] = "InventorySlotExt2";
    InventorySlot[InventorySlot["InventorySlotExt3"] = 14] = "InventorySlotExt3";
    InventorySlot[InventorySlot["InventorySlotExt4"] = 15] = "InventorySlotExt4";
    InventorySlot[InventorySlot["LastInventorySlot"] = 16] = "LastInventorySlot";
})(InventorySlot = exports.InventorySlot || (exports.InventorySlot = {}));
var Statistic;
(function (Statistic) {
    Statistic[Statistic["Health"] = 0] = "Health";
    Statistic[Statistic["MaxHealth"] = 1] = "MaxHealth";
    Statistic[Statistic["FreeCapacity"] = 2] = "FreeCapacity";
    Statistic[Statistic["Experience"] = 3] = "Experience";
    Statistic[Statistic["Level"] = 4] = "Level";
    Statistic[Statistic["LevelPercent"] = 5] = "LevelPercent";
    Statistic[Statistic["Mana"] = 6] = "Mana";
    Statistic[Statistic["MaxMana"] = 7] = "MaxMana";
    Statistic[Statistic["MagicLevel"] = 8] = "MagicLevel";
    Statistic[Statistic["MagicLevelPercent"] = 9] = "MagicLevelPercent";
    Statistic[Statistic["Soul"] = 10] = "Soul";
    Statistic[Statistic["Stamina"] = 11] = "Stamina";
    Statistic[Statistic["LastStatistic"] = 12] = "LastStatistic";
})(Statistic = exports.Statistic || (exports.Statistic = {}));
var Skill;
(function (Skill) {
    Skill[Skill["Fist"] = 0] = "Fist";
    Skill[Skill["Club"] = 1] = "Club";
    Skill[Skill["Sword"] = 2] = "Sword";
    Skill[Skill["Axe"] = 3] = "Axe";
    Skill[Skill["Distance"] = 4] = "Distance";
    Skill[Skill["Shielding"] = 5] = "Shielding";
    Skill[Skill["Fishing"] = 6] = "Fishing";
    Skill[Skill["CriticalChance"] = 7] = "CriticalChance";
    Skill[Skill["CriticalDamage"] = 8] = "CriticalDamage";
    Skill[Skill["LifeLeechChance"] = 9] = "LifeLeechChance";
    Skill[Skill["LifeLeechAmount"] = 10] = "LifeLeechAmount";
    Skill[Skill["ManaLeechChance"] = 11] = "ManaLeechChance";
    Skill[Skill["ManaLeechAmount"] = 12] = "ManaLeechAmount";
    Skill[Skill["LastSkill"] = 13] = "LastSkill";
})(Skill = exports.Skill || (exports.Skill = {}));
var Direction;
(function (Direction) {
    Direction[Direction["North"] = 0] = "North";
    Direction[Direction["East"] = 1] = "East";
    Direction[Direction["South"] = 2] = "South";
    Direction[Direction["West"] = 3] = "West";
    Direction[Direction["NorthEast"] = 4] = "NorthEast";
    Direction[Direction["SouthEast"] = 5] = "SouthEast";
    Direction[Direction["SouthWest"] = 6] = "SouthWest";
    Direction[Direction["NorthWest"] = 7] = "NorthWest";
    Direction[Direction["InvalidDirection"] = 8] = "InvalidDirection";
})(Direction = exports.Direction || (exports.Direction = {}));
var FluidsColor;
(function (FluidsColor) {
    FluidsColor[FluidsColor["FluidTransparent"] = 0] = "FluidTransparent";
    FluidsColor[FluidsColor["FluidBlue"] = 1] = "FluidBlue";
    FluidsColor[FluidsColor["FluidRed"] = 2] = "FluidRed";
    FluidsColor[FluidsColor["FluidBrown"] = 3] = "FluidBrown";
    FluidsColor[FluidsColor["FluidGreen"] = 4] = "FluidGreen";
    FluidsColor[FluidsColor["FluidYellow"] = 5] = "FluidYellow";
    FluidsColor[FluidsColor["FluidWhite"] = 6] = "FluidWhite";
    FluidsColor[FluidsColor["FluidPurple"] = 7] = "FluidPurple";
})(FluidsColor = exports.FluidsColor || (exports.FluidsColor = {}));
var FluidsType;
(function (FluidsType) {
    FluidsType[FluidsType["FluidNone"] = 0] = "FluidNone";
    FluidsType[FluidsType["FluidWater"] = 1] = "FluidWater";
    FluidsType[FluidsType["FluidMana"] = 2] = "FluidMana";
    FluidsType[FluidsType["FluidBeer"] = 3] = "FluidBeer";
    FluidsType[FluidsType["FluidOil"] = 4] = "FluidOil";
    FluidsType[FluidsType["FluidBlood"] = 5] = "FluidBlood";
    FluidsType[FluidsType["FluidSlime"] = 6] = "FluidSlime";
    FluidsType[FluidsType["FluidMud"] = 7] = "FluidMud";
    FluidsType[FluidsType["FluidLemonade"] = 8] = "FluidLemonade";
    FluidsType[FluidsType["FluidMilk"] = 9] = "FluidMilk";
    FluidsType[FluidsType["FluidWine"] = 10] = "FluidWine";
    FluidsType[FluidsType["FluidHealth"] = 11] = "FluidHealth";
    FluidsType[FluidsType["FluidUrine"] = 12] = "FluidUrine";
    FluidsType[FluidsType["FluidRum"] = 13] = "FluidRum";
    FluidsType[FluidsType["FluidFruidJuice"] = 14] = "FluidFruidJuice";
    FluidsType[FluidsType["FluidCoconutMilk"] = 15] = "FluidCoconutMilk";
    FluidsType[FluidsType["FluidTea"] = 16] = "FluidTea";
    FluidsType[FluidsType["FluidMead"] = 17] = "FluidMead";
})(FluidsType = exports.FluidsType || (exports.FluidsType = {}));
var FightModes;
(function (FightModes) {
    FightModes[FightModes["FightOffensive"] = 1] = "FightOffensive";
    FightModes[FightModes["FightBalanced"] = 2] = "FightBalanced";
    FightModes[FightModes["FightDefensive"] = 3] = "FightDefensive";
})(FightModes = exports.FightModes || (exports.FightModes = {}));
var ChaseModes;
(function (ChaseModes) {
    ChaseModes[ChaseModes["DontChase"] = 0] = "DontChase";
    ChaseModes[ChaseModes["ChaseOpponent"] = 1] = "ChaseOpponent";
})(ChaseModes = exports.ChaseModes || (exports.ChaseModes = {}));
var PVPModes;
(function (PVPModes) {
    PVPModes[PVPModes["WhiteDove"] = 0] = "WhiteDove";
    PVPModes[PVPModes["WhiteHand"] = 1] = "WhiteHand";
    PVPModes[PVPModes["YellowHand"] = 2] = "YellowHand";
    PVPModes[PVPModes["RedFist"] = 3] = "RedFist";
})(PVPModes = exports.PVPModes || (exports.PVPModes = {}));
var PlayerSkulls;
(function (PlayerSkulls) {
    PlayerSkulls[PlayerSkulls["SkullNone"] = 0] = "SkullNone";
    PlayerSkulls[PlayerSkulls["SkullYellow"] = 1] = "SkullYellow";
    PlayerSkulls[PlayerSkulls["SkullGreen"] = 2] = "SkullGreen";
    PlayerSkulls[PlayerSkulls["SkullWhite"] = 3] = "SkullWhite";
    PlayerSkulls[PlayerSkulls["SkullRed"] = 4] = "SkullRed";
    PlayerSkulls[PlayerSkulls["SkullBlack"] = 5] = "SkullBlack";
    PlayerSkulls[PlayerSkulls["SkullOrange"] = 6] = "SkullOrange";
})(PlayerSkulls = exports.PlayerSkulls || (exports.PlayerSkulls = {}));
;
var PlayerShields;
(function (PlayerShields) {
    PlayerShields[PlayerShields["ShieldNone"] = 0] = "ShieldNone";
    PlayerShields[PlayerShields["ShieldWhiteYellow"] = 1] = "ShieldWhiteYellow";
    PlayerShields[PlayerShields["ShieldWhiteBlue"] = 2] = "ShieldWhiteBlue";
    PlayerShields[PlayerShields["ShieldBlue"] = 3] = "ShieldBlue";
    PlayerShields[PlayerShields["ShieldYellow"] = 4] = "ShieldYellow";
    PlayerShields[PlayerShields["ShieldBlueSharedExp"] = 5] = "ShieldBlueSharedExp";
    PlayerShields[PlayerShields["ShieldYellowSharedExp"] = 6] = "ShieldYellowSharedExp";
    PlayerShields[PlayerShields["ShieldBlueNoSharedExpBlink"] = 7] = "ShieldBlueNoSharedExpBlink";
    PlayerShields[PlayerShields["ShieldYellowNoSharedExpBlink"] = 8] = "ShieldYellowNoSharedExpBlink";
    PlayerShields[PlayerShields["ShieldBlueNoSharedExp"] = 9] = "ShieldBlueNoSharedExp";
    PlayerShields[PlayerShields["ShieldYellowNoSharedExp"] = 10] = "ShieldYellowNoSharedExp";
    PlayerShields[PlayerShields["ShieldGray"] = 11] = "ShieldGray"; // 11 member of another party
})(PlayerShields = exports.PlayerShields || (exports.PlayerShields = {}));
var PlayerEmblems;
(function (PlayerEmblems) {
    PlayerEmblems[PlayerEmblems["EmblemNone"] = 0] = "EmblemNone";
    PlayerEmblems[PlayerEmblems["EmblemGreen"] = 1] = "EmblemGreen";
    PlayerEmblems[PlayerEmblems["EmblemRed"] = 2] = "EmblemRed";
    PlayerEmblems[PlayerEmblems["EmblemBlue"] = 3] = "EmblemBlue";
    PlayerEmblems[PlayerEmblems["EmblemMember"] = 4] = "EmblemMember";
    PlayerEmblems[PlayerEmblems["EmblemOther"] = 5] = "EmblemOther";
})(PlayerEmblems = exports.PlayerEmblems || (exports.PlayerEmblems = {}));
var CreatureIcons;
(function (CreatureIcons) {
    CreatureIcons[CreatureIcons["NpcIconNone"] = 0] = "NpcIconNone";
    CreatureIcons[CreatureIcons["NpcIconChat"] = 1] = "NpcIconChat";
    CreatureIcons[CreatureIcons["NpcIconTrade"] = 2] = "NpcIconTrade";
    CreatureIcons[CreatureIcons["NpcIconQuest"] = 3] = "NpcIconQuest";
    CreatureIcons[CreatureIcons["NpcIconTradeQuest"] = 4] = "NpcIconTradeQuest";
})(CreatureIcons = exports.CreatureIcons || (exports.CreatureIcons = {}));
var PlayerStates;
(function (PlayerStates) {
    PlayerStates[PlayerStates["IconNone"] = 0] = "IconNone";
    PlayerStates[PlayerStates["IconPoison"] = 1] = "IconPoison";
    PlayerStates[PlayerStates["IconBurn"] = 2] = "IconBurn";
    PlayerStates[PlayerStates["IconEnergy"] = 4] = "IconEnergy";
    PlayerStates[PlayerStates["IconDrunk"] = 8] = "IconDrunk";
    PlayerStates[PlayerStates["IconManaShield"] = 16] = "IconManaShield";
    PlayerStates[PlayerStates["IconParalyze"] = 32] = "IconParalyze";
    PlayerStates[PlayerStates["IconHaste"] = 64] = "IconHaste";
    PlayerStates[PlayerStates["IconSwords"] = 128] = "IconSwords";
    PlayerStates[PlayerStates["IconDrowning"] = 256] = "IconDrowning";
    PlayerStates[PlayerStates["IconFreezing"] = 512] = "IconFreezing";
    PlayerStates[PlayerStates["IconDazzled"] = 1024] = "IconDazzled";
    PlayerStates[PlayerStates["IconCursed"] = 2048] = "IconCursed";
    PlayerStates[PlayerStates["IconPartyBuff"] = 4096] = "IconPartyBuff";
    PlayerStates[PlayerStates["IconPzBlock"] = 8192] = "IconPzBlock";
    PlayerStates[PlayerStates["IconPz"] = 16384] = "IconPz";
    PlayerStates[PlayerStates["IconBleeding"] = 32768] = "IconBleeding";
    PlayerStates[PlayerStates["IconHungry"] = 65536] = "IconHungry";
})(PlayerStates = exports.PlayerStates || (exports.PlayerStates = {}));
var MessageMode;
(function (MessageMode) {
    MessageMode[MessageMode["MessageNone"] = 0] = "MessageNone";
    MessageMode[MessageMode["MessageSay"] = 1] = "MessageSay";
    MessageMode[MessageMode["MessageWhisper"] = 2] = "MessageWhisper";
    MessageMode[MessageMode["MessageYell"] = 3] = "MessageYell";
    MessageMode[MessageMode["MessagePrivateFrom"] = 4] = "MessagePrivateFrom";
    MessageMode[MessageMode["MessagePrivateTo"] = 5] = "MessagePrivateTo";
    MessageMode[MessageMode["MessageChannelManagement"] = 6] = "MessageChannelManagement";
    MessageMode[MessageMode["MessageChannel"] = 7] = "MessageChannel";
    MessageMode[MessageMode["MessageChannelHighlight"] = 8] = "MessageChannelHighlight";
    MessageMode[MessageMode["MessageSpell"] = 9] = "MessageSpell";
    MessageMode[MessageMode["MessageNpcFrom"] = 10] = "MessageNpcFrom";
    MessageMode[MessageMode["MessageNpcTo"] = 11] = "MessageNpcTo";
    MessageMode[MessageMode["MessageGamemasterBroadcast"] = 12] = "MessageGamemasterBroadcast";
    MessageMode[MessageMode["MessageGamemasterChannel"] = 13] = "MessageGamemasterChannel";
    MessageMode[MessageMode["MessageGamemasterPrivateFrom"] = 14] = "MessageGamemasterPrivateFrom";
    MessageMode[MessageMode["MessageGamemasterPrivateTo"] = 15] = "MessageGamemasterPrivateTo";
    MessageMode[MessageMode["MessageLogin"] = 16] = "MessageLogin";
    MessageMode[MessageMode["MessageWarning"] = 17] = "MessageWarning";
    MessageMode[MessageMode["MessageGame"] = 18] = "MessageGame";
    MessageMode[MessageMode["MessageFailure"] = 19] = "MessageFailure";
    MessageMode[MessageMode["MessageLook"] = 20] = "MessageLook";
    MessageMode[MessageMode["MessageDamageDealed"] = 21] = "MessageDamageDealed";
    MessageMode[MessageMode["MessageDamageReceived"] = 22] = "MessageDamageReceived";
    MessageMode[MessageMode["MessageHeal"] = 23] = "MessageHeal";
    MessageMode[MessageMode["MessageExp"] = 24] = "MessageExp";
    MessageMode[MessageMode["MessageDamageOthers"] = 25] = "MessageDamageOthers";
    MessageMode[MessageMode["MessageHealOthers"] = 26] = "MessageHealOthers";
    MessageMode[MessageMode["MessageExpOthers"] = 27] = "MessageExpOthers";
    MessageMode[MessageMode["MessageStatus"] = 28] = "MessageStatus";
    MessageMode[MessageMode["MessageLoot"] = 29] = "MessageLoot";
    MessageMode[MessageMode["MessageTradeNpc"] = 30] = "MessageTradeNpc";
    MessageMode[MessageMode["MessageGuild"] = 31] = "MessageGuild";
    MessageMode[MessageMode["MessagePartyManagement"] = 32] = "MessagePartyManagement";
    MessageMode[MessageMode["MessageParty"] = 33] = "MessageParty";
    MessageMode[MessageMode["MessageBarkLow"] = 34] = "MessageBarkLow";
    MessageMode[MessageMode["MessageBarkLoud"] = 35] = "MessageBarkLoud";
    MessageMode[MessageMode["MessageReport"] = 36] = "MessageReport";
    MessageMode[MessageMode["MessageHotkeyUse"] = 37] = "MessageHotkeyUse";
    MessageMode[MessageMode["MessageTutorialHint"] = 38] = "MessageTutorialHint";
    MessageMode[MessageMode["MessageThankyou"] = 39] = "MessageThankyou";
    MessageMode[MessageMode["MessageMarket"] = 40] = "MessageMarket";
    MessageMode[MessageMode["MessageMana"] = 41] = "MessageMana";
    MessageMode[MessageMode["MessageBeyondLast"] = 42] = "MessageBeyondLast";
    // deprecated
    MessageMode[MessageMode["MessageMonsterYell"] = 43] = "MessageMonsterYell";
    MessageMode[MessageMode["MessageMonsterSay"] = 44] = "MessageMonsterSay";
    MessageMode[MessageMode["MessageRed"] = 45] = "MessageRed";
    MessageMode[MessageMode["MessageBlue"] = 46] = "MessageBlue";
    MessageMode[MessageMode["MessageRVRChannel"] = 47] = "MessageRVRChannel";
    MessageMode[MessageMode["MessageRVRAnswer"] = 48] = "MessageRVRAnswer";
    MessageMode[MessageMode["MessageRVRContinue"] = 49] = "MessageRVRContinue";
    MessageMode[MessageMode["MessageGameHighlight"] = 50] = "MessageGameHighlight";
    MessageMode[MessageMode["MessageNpcFromStartBlock"] = 51] = "MessageNpcFromStartBlock";
    MessageMode[MessageMode["LastMessage"] = 52] = "LastMessage";
    MessageMode[MessageMode["MessageInvalid"] = 255] = "MessageInvalid";
})(MessageMode = exports.MessageMode || (exports.MessageMode = {}));
var GameFeature;
(function (GameFeature) {
    GameFeature[GameFeature["GameProtocolChecksum"] = 1] = "GameProtocolChecksum";
    GameFeature[GameFeature["GameAccountNames"] = 2] = "GameAccountNames";
    GameFeature[GameFeature["GameChallengeOnLogin"] = 3] = "GameChallengeOnLogin";
    GameFeature[GameFeature["GamePenalityOnDeath"] = 4] = "GamePenalityOnDeath";
    GameFeature[GameFeature["GameNameOnNpcTrade"] = 5] = "GameNameOnNpcTrade";
    GameFeature[GameFeature["GameDoubleFreeCapacity"] = 6] = "GameDoubleFreeCapacity";
    GameFeature[GameFeature["GameDoubleExperience"] = 7] = "GameDoubleExperience";
    GameFeature[GameFeature["GameTotalCapacity"] = 8] = "GameTotalCapacity";
    GameFeature[GameFeature["GameSkillsBase"] = 9] = "GameSkillsBase";
    GameFeature[GameFeature["GamePlayerRegenerationTime"] = 10] = "GamePlayerRegenerationTime";
    GameFeature[GameFeature["GameChannelPlayerList"] = 11] = "GameChannelPlayerList";
    GameFeature[GameFeature["GamePlayerMounts"] = 12] = "GamePlayerMounts";
    GameFeature[GameFeature["GameEnvironmentEffect"] = 13] = "GameEnvironmentEffect";
    GameFeature[GameFeature["GameCreatureEmblems"] = 14] = "GameCreatureEmblems";
    GameFeature[GameFeature["GameItemAnimationPhase"] = 15] = "GameItemAnimationPhase";
    GameFeature[GameFeature["GameMagicEffectU16"] = 16] = "GameMagicEffectU16";
    GameFeature[GameFeature["GamePlayerMarket"] = 17] = "GamePlayerMarket";
    GameFeature[GameFeature["GameSpritesU32"] = 18] = "GameSpritesU32";
    // 19 unused
    GameFeature[GameFeature["GameOfflineTrainingTime"] = 20] = "GameOfflineTrainingTime";
    GameFeature[GameFeature["GamePurseSlot"] = 21] = "GamePurseSlot";
    GameFeature[GameFeature["GameFormatCreatureName"] = 22] = "GameFormatCreatureName";
    GameFeature[GameFeature["GameSpellList"] = 23] = "GameSpellList";
    GameFeature[GameFeature["GameClientPing"] = 24] = "GameClientPing";
    GameFeature[GameFeature["GameExtendedClientPing"] = 25] = "GameExtendedClientPing";
    GameFeature[GameFeature["GameDoubleHealth"] = 28] = "GameDoubleHealth";
    GameFeature[GameFeature["GameDoubleSkills"] = 29] = "GameDoubleSkills";
    GameFeature[GameFeature["GameChangeMapAwareRange"] = 30] = "GameChangeMapAwareRange";
    GameFeature[GameFeature["GameMapMovePosition"] = 31] = "GameMapMovePosition";
    GameFeature[GameFeature["GameAttackSeq"] = 32] = "GameAttackSeq";
    GameFeature[GameFeature["GameBlueNpcNameColor"] = 33] = "GameBlueNpcNameColor";
    GameFeature[GameFeature["GameDiagonalAnimatedText"] = 34] = "GameDiagonalAnimatedText";
    GameFeature[GameFeature["GameLoginPending"] = 35] = "GameLoginPending";
    GameFeature[GameFeature["GameNewSpeedLaw"] = 36] = "GameNewSpeedLaw";
    GameFeature[GameFeature["GameForceFirstAutoWalkStep"] = 37] = "GameForceFirstAutoWalkStep";
    GameFeature[GameFeature["GameMinimapRemove"] = 38] = "GameMinimapRemove";
    GameFeature[GameFeature["GameDoubleShopSellAmount"] = 39] = "GameDoubleShopSellAmount";
    GameFeature[GameFeature["GameContainerPagination"] = 40] = "GameContainerPagination";
    GameFeature[GameFeature["GameThingMarks"] = 41] = "GameThingMarks";
    GameFeature[GameFeature["GameLooktypeU16"] = 42] = "GameLooktypeU16";
    GameFeature[GameFeature["GamePlayerStamina"] = 43] = "GamePlayerStamina";
    GameFeature[GameFeature["GamePlayerAddons"] = 44] = "GamePlayerAddons";
    GameFeature[GameFeature["GameMessageStatements"] = 45] = "GameMessageStatements";
    GameFeature[GameFeature["GameMessageLevel"] = 46] = "GameMessageLevel";
    GameFeature[GameFeature["GameNewFluids"] = 47] = "GameNewFluids";
    GameFeature[GameFeature["GamePlayerStateU16"] = 48] = "GamePlayerStateU16";
    GameFeature[GameFeature["GameNewOutfitProtocol"] = 49] = "GameNewOutfitProtocol";
    GameFeature[GameFeature["GamePVPMode"] = 50] = "GamePVPMode";
    GameFeature[GameFeature["GameWritableDate"] = 51] = "GameWritableDate";
    GameFeature[GameFeature["GameAdditionalVipInfo"] = 52] = "GameAdditionalVipInfo";
    GameFeature[GameFeature["GameBaseSkillU16"] = 53] = "GameBaseSkillU16";
    GameFeature[GameFeature["GameCreatureIcons"] = 54] = "GameCreatureIcons";
    GameFeature[GameFeature["GameHideNpcNames"] = 55] = "GameHideNpcNames";
    GameFeature[GameFeature["GameSpritesAlphaChannel"] = 56] = "GameSpritesAlphaChannel";
    GameFeature[GameFeature["GamePremiumExpiration"] = 57] = "GamePremiumExpiration";
    GameFeature[GameFeature["GameBrowseField"] = 58] = "GameBrowseField";
    GameFeature[GameFeature["GameEnhancedAnimations"] = 59] = "GameEnhancedAnimations";
    GameFeature[GameFeature["GameOGLInformation"] = 60] = "GameOGLInformation";
    GameFeature[GameFeature["GameMessageSizeCheck"] = 61] = "GameMessageSizeCheck";
    GameFeature[GameFeature["GamePreviewState"] = 62] = "GamePreviewState";
    GameFeature[GameFeature["GameLoginPacketEncryption"] = 63] = "GameLoginPacketEncryption";
    GameFeature[GameFeature["GameClientVersion"] = 64] = "GameClientVersion";
    GameFeature[GameFeature["GameContentRevision"] = 65] = "GameContentRevision";
    GameFeature[GameFeature["GameExperienceBonus"] = 66] = "GameExperienceBonus";
    GameFeature[GameFeature["GameAuthenticator"] = 67] = "GameAuthenticator";
    GameFeature[GameFeature["GameUnjustifiedPoints"] = 68] = "GameUnjustifiedPoints";
    GameFeature[GameFeature["GameSessionKey"] = 69] = "GameSessionKey";
    GameFeature[GameFeature["GameDeathType"] = 70] = "GameDeathType";
    GameFeature[GameFeature["GameIdleAnimations"] = 71] = "GameIdleAnimations";
    GameFeature[GameFeature["GameKeepUnawareTiles"] = 72] = "GameKeepUnawareTiles";
    GameFeature[GameFeature["GameIngameStore"] = 73] = "GameIngameStore";
    GameFeature[GameFeature["GameIngameStoreHighlights"] = 74] = "GameIngameStoreHighlights";
    GameFeature[GameFeature["GameIngameStoreServiceType"] = 75] = "GameIngameStoreServiceType";
    GameFeature[GameFeature["GameAdditionalSkills"] = 76] = "GameAdditionalSkills";
    GameFeature[GameFeature["LastGameFeature"] = 101] = "LastGameFeature";
})(GameFeature = exports.GameFeature || (exports.GameFeature = {}));
var PathFindResult;
(function (PathFindResult) {
    PathFindResult[PathFindResult["PathFindResultOk"] = 0] = "PathFindResultOk";
    PathFindResult[PathFindResult["PathFindResultSamePosition"] = 1] = "PathFindResultSamePosition";
    PathFindResult[PathFindResult["PathFindResultImpossible"] = 2] = "PathFindResultImpossible";
    PathFindResult[PathFindResult["PathFindResultTooFar"] = 3] = "PathFindResultTooFar";
    PathFindResult[PathFindResult["PathFindResultNoWay"] = 4] = "PathFindResultNoWay";
})(PathFindResult = exports.PathFindResult || (exports.PathFindResult = {}));
var PathFindFlags;
(function (PathFindFlags) {
    PathFindFlags[PathFindFlags["PathFindAllowNotSeenTiles"] = 1] = "PathFindAllowNotSeenTiles";
    PathFindFlags[PathFindFlags["PathFindAllowCreatures"] = 2] = "PathFindAllowCreatures";
    PathFindFlags[PathFindFlags["PathFindAllowNonPathable"] = 4] = "PathFindAllowNonPathable";
    PathFindFlags[PathFindFlags["PathFindAllowNonWalkable"] = 8] = "PathFindAllowNonWalkable";
})(PathFindFlags = exports.PathFindFlags || (exports.PathFindFlags = {}));
var AutomapFlags;
(function (AutomapFlags) {
    AutomapFlags[AutomapFlags["MapMarkTick"] = 0] = "MapMarkTick";
    AutomapFlags[AutomapFlags["MapMarkQuestion"] = 1] = "MapMarkQuestion";
    AutomapFlags[AutomapFlags["MapMarkExclamation"] = 2] = "MapMarkExclamation";
    AutomapFlags[AutomapFlags["MapMarkStar"] = 3] = "MapMarkStar";
    AutomapFlags[AutomapFlags["MapMarkCross"] = 4] = "MapMarkCross";
    AutomapFlags[AutomapFlags["MapMarkTemple"] = 5] = "MapMarkTemple";
    AutomapFlags[AutomapFlags["MapMarkKiss"] = 6] = "MapMarkKiss";
    AutomapFlags[AutomapFlags["MapMarkShovel"] = 7] = "MapMarkShovel";
    AutomapFlags[AutomapFlags["MapMarkSword"] = 8] = "MapMarkSword";
    AutomapFlags[AutomapFlags["MapMarkFlag"] = 9] = "MapMarkFlag";
    AutomapFlags[AutomapFlags["MapMarkLock"] = 10] = "MapMarkLock";
    AutomapFlags[AutomapFlags["MapMarkBag"] = 11] = "MapMarkBag";
    AutomapFlags[AutomapFlags["MapMarkSkull"] = 12] = "MapMarkSkull";
    AutomapFlags[AutomapFlags["MapMarkDollar"] = 13] = "MapMarkDollar";
    AutomapFlags[AutomapFlags["MapMarkRedNorth"] = 14] = "MapMarkRedNorth";
    AutomapFlags[AutomapFlags["MapMarkRedSouth"] = 15] = "MapMarkRedSouth";
    AutomapFlags[AutomapFlags["MapMarkRedEast"] = 16] = "MapMarkRedEast";
    AutomapFlags[AutomapFlags["MapMarkRedWest"] = 17] = "MapMarkRedWest";
    AutomapFlags[AutomapFlags["MapMarkGreenNorth"] = 18] = "MapMarkGreenNorth";
    AutomapFlags[AutomapFlags["MapMarkGreenSouth"] = 19] = "MapMarkGreenSouth";
})(AutomapFlags = exports.AutomapFlags || (exports.AutomapFlags = {}));
var VipState;
(function (VipState) {
    VipState[VipState["VipStateOffline"] = 0] = "VipStateOffline";
    VipState[VipState["VipStateOnline"] = 1] = "VipStateOnline";
    VipState[VipState["VipStatePending"] = 2] = "VipStatePending";
})(VipState = exports.VipState || (exports.VipState = {}));
var SpeedFormula;
(function (SpeedFormula) {
    SpeedFormula[SpeedFormula["SpeedFormulaA"] = 0] = "SpeedFormulaA";
    SpeedFormula[SpeedFormula["SpeedFormulaB"] = 1] = "SpeedFormulaB";
    SpeedFormula[SpeedFormula["SpeedFormulaC"] = 2] = "SpeedFormulaC";
    SpeedFormula[SpeedFormula["LastSpeedFormula"] = 3] = "LastSpeedFormula";
})(SpeedFormula = exports.SpeedFormula || (exports.SpeedFormula = {}));
var Blessings;
(function (Blessings) {
    Blessings[Blessings["BlessingNone"] = 0] = "BlessingNone";
    Blessings[Blessings["BlessingAdventurer"] = 1] = "BlessingAdventurer";
    Blessings[Blessings["BlessingSpiritualShielding"] = 2] = "BlessingSpiritualShielding";
    Blessings[Blessings["BlessingEmbraceOfTibia"] = 4] = "BlessingEmbraceOfTibia";
    Blessings[Blessings["BlessingFireOfSuns"] = 8] = "BlessingFireOfSuns";
    Blessings[Blessings["BlessingWisdomOfSolitude"] = 16] = "BlessingWisdomOfSolitude";
    Blessings[Blessings["BlessingSparkOfPhoenix"] = 32] = "BlessingSparkOfPhoenix";
})(Blessings = exports.Blessings || (exports.Blessings = {}));
var DeathType;
(function (DeathType) {
    DeathType[DeathType["DeathRegular"] = 0] = "DeathRegular";
    DeathType[DeathType["DeathBlessed"] = 1] = "DeathBlessed";
})(DeathType = exports.DeathType || (exports.DeathType = {}));
var StoreProductTypes;
(function (StoreProductTypes) {
    StoreProductTypes[StoreProductTypes["ProductTypeOther"] = 0] = "ProductTypeOther";
    StoreProductTypes[StoreProductTypes["ProductTypeNameChange"] = 1] = "ProductTypeNameChange";
})(StoreProductTypes = exports.StoreProductTypes || (exports.StoreProductTypes = {}));
var StoreErrorTypes;
(function (StoreErrorTypes) {
    StoreErrorTypes[StoreErrorTypes["StoreNoError"] = -1] = "StoreNoError";
    StoreErrorTypes[StoreErrorTypes["StorePurchaseError"] = 0] = "StorePurchaseError";
    StoreErrorTypes[StoreErrorTypes["StoreNetworkError"] = 1] = "StoreNetworkError";
    StoreErrorTypes[StoreErrorTypes["StoreHistoryError"] = 2] = "StoreHistoryError";
    StoreErrorTypes[StoreErrorTypes["StoreTransferError"] = 3] = "StoreTransferError";
    StoreErrorTypes[StoreErrorTypes["StoreInformation"] = 4] = "StoreInformation";
})(StoreErrorTypes = exports.StoreErrorTypes || (exports.StoreErrorTypes = {}));
var StoreStates;
(function (StoreStates) {
    StoreStates[StoreStates["StateNone"] = 0] = "StateNone";
    StoreStates[StoreStates["StateNew"] = 1] = "StateNew";
    StoreStates[StoreStates["StateSale"] = 2] = "StateSale";
    StoreStates[StoreStates["StateTimed"] = 3] = "StateTimed";
})(StoreStates = exports.StoreStates || (exports.StoreStates = {}));
var FrameGroupType;
(function (FrameGroupType) {
    FrameGroupType[FrameGroupType["FrameGroupDefault"] = 0] = "FrameGroupDefault";
    FrameGroupType[FrameGroupType["FrameGroupIdle"] = 0] = "FrameGroupIdle";
    FrameGroupType[FrameGroupType["FrameGroupMoving"] = 1] = "FrameGroupMoving";
})(FrameGroupType = exports.FrameGroupType || (exports.FrameGroupType = {}));
var ThingCategory;
(function (ThingCategory) {
    ThingCategory[ThingCategory["ThingCategoryItem"] = 0] = "ThingCategoryItem";
    ThingCategory[ThingCategory["ThingCategoryCreature"] = 1] = "ThingCategoryCreature";
    ThingCategory[ThingCategory["ThingCategoryEffect"] = 2] = "ThingCategoryEffect";
    ThingCategory[ThingCategory["ThingCategoryMissile"] = 3] = "ThingCategoryMissile";
    ThingCategory[ThingCategory["ThingInvalidCategory"] = 4] = "ThingInvalidCategory";
    ThingCategory[ThingCategory["ThingLastCategory"] = 4] = "ThingLastCategory";
})(ThingCategory = exports.ThingCategory || (exports.ThingCategory = {}));
var ThingAttr;
(function (ThingAttr) {
    ThingAttr[ThingAttr["ThingAttrGround"] = 0] = "ThingAttrGround";
    ThingAttr[ThingAttr["ThingAttrGroundBorder"] = 1] = "ThingAttrGroundBorder";
    ThingAttr[ThingAttr["ThingAttrOnBottom"] = 2] = "ThingAttrOnBottom";
    ThingAttr[ThingAttr["ThingAttrOnTop"] = 3] = "ThingAttrOnTop";
    ThingAttr[ThingAttr["ThingAttrContainer"] = 4] = "ThingAttrContainer";
    ThingAttr[ThingAttr["ThingAttrStackable"] = 5] = "ThingAttrStackable";
    ThingAttr[ThingAttr["ThingAttrForceUse"] = 6] = "ThingAttrForceUse";
    ThingAttr[ThingAttr["ThingAttrMultiUse"] = 7] = "ThingAttrMultiUse";
    ThingAttr[ThingAttr["ThingAttrWritable"] = 8] = "ThingAttrWritable";
    ThingAttr[ThingAttr["ThingAttrWritableOnce"] = 9] = "ThingAttrWritableOnce";
    ThingAttr[ThingAttr["ThingAttrFluidContainer"] = 10] = "ThingAttrFluidContainer";
    ThingAttr[ThingAttr["ThingAttrSplash"] = 11] = "ThingAttrSplash";
    ThingAttr[ThingAttr["ThingAttrNotWalkable"] = 12] = "ThingAttrNotWalkable";
    ThingAttr[ThingAttr["ThingAttrNotMoveable"] = 13] = "ThingAttrNotMoveable";
    ThingAttr[ThingAttr["ThingAttrBlockProjectile"] = 14] = "ThingAttrBlockProjectile";
    ThingAttr[ThingAttr["ThingAttrNotPathable"] = 15] = "ThingAttrNotPathable";
    ThingAttr[ThingAttr["ThingAttrPickupable"] = 16] = "ThingAttrPickupable";
    ThingAttr[ThingAttr["ThingAttrHangable"] = 17] = "ThingAttrHangable";
    ThingAttr[ThingAttr["ThingAttrHookSouth"] = 18] = "ThingAttrHookSouth";
    ThingAttr[ThingAttr["ThingAttrHookEast"] = 19] = "ThingAttrHookEast";
    ThingAttr[ThingAttr["ThingAttrRotateable"] = 20] = "ThingAttrRotateable";
    ThingAttr[ThingAttr["ThingAttrLight"] = 21] = "ThingAttrLight";
    ThingAttr[ThingAttr["ThingAttrDontHide"] = 22] = "ThingAttrDontHide";
    ThingAttr[ThingAttr["ThingAttrTranslucent"] = 23] = "ThingAttrTranslucent";
    ThingAttr[ThingAttr["ThingAttrDisplacement"] = 24] = "ThingAttrDisplacement";
    ThingAttr[ThingAttr["ThingAttrElevation"] = 25] = "ThingAttrElevation";
    ThingAttr[ThingAttr["ThingAttrLyingCorpse"] = 26] = "ThingAttrLyingCorpse";
    ThingAttr[ThingAttr["ThingAttrAnimateAlways"] = 27] = "ThingAttrAnimateAlways";
    ThingAttr[ThingAttr["ThingAttrMinimapColor"] = 28] = "ThingAttrMinimapColor";
    ThingAttr[ThingAttr["ThingAttrLensHelp"] = 29] = "ThingAttrLensHelp";
    ThingAttr[ThingAttr["ThingAttrFullGround"] = 30] = "ThingAttrFullGround";
    ThingAttr[ThingAttr["ThingAttrLook"] = 31] = "ThingAttrLook";
    ThingAttr[ThingAttr["ThingAttrCloth"] = 32] = "ThingAttrCloth";
    ThingAttr[ThingAttr["ThingAttrMarket"] = 33] = "ThingAttrMarket";
    ThingAttr[ThingAttr["ThingAttrUsable"] = 34] = "ThingAttrUsable";
    ThingAttr[ThingAttr["ThingAttrWrapable"] = 35] = "ThingAttrWrapable";
    ThingAttr[ThingAttr["ThingAttrUnwrapable"] = 36] = "ThingAttrUnwrapable";
    ThingAttr[ThingAttr["ThingAttrTopEffect"] = 37] = "ThingAttrTopEffect";
    // additional
    ThingAttr[ThingAttr["ThingAttrOpacity"] = 100] = "ThingAttrOpacity";
    ThingAttr[ThingAttr["ThingAttrNotPreWalkable"] = 101] = "ThingAttrNotPreWalkable";
    ThingAttr[ThingAttr["ThingAttrFloorChange"] = 252] = "ThingAttrFloorChange";
    ThingAttr[ThingAttr["ThingAttrNoMoveAnimation"] = 253] = "ThingAttrNoMoveAnimation";
    ThingAttr[ThingAttr["ThingAttrChargeable"] = 254] = "ThingAttrChargeable";
    ThingAttr[ThingAttr["ThingLastAttr"] = 255] = "ThingLastAttr";
})(ThingAttr = exports.ThingAttr || (exports.ThingAttr = {}));
var SpriteMask;
(function (SpriteMask) {
    SpriteMask[SpriteMask["SpriteMaskRed"] = 1] = "SpriteMaskRed";
    SpriteMask[SpriteMask["SpriteMaskGreen"] = 2] = "SpriteMaskGreen";
    SpriteMask[SpriteMask["SpriteMaskBlue"] = 3] = "SpriteMaskBlue";
    SpriteMask[SpriteMask["SpriteMaskYellow"] = 4] = "SpriteMaskYellow";
})(SpriteMask = exports.SpriteMask || (exports.SpriteMask = {}));
var AnimationPhase;
(function (AnimationPhase) {
    AnimationPhase[AnimationPhase["AnimPhaseAutomatic"] = -1] = "AnimPhaseAutomatic";
    AnimationPhase[AnimationPhase["AnimPhaseRandom"] = 254] = "AnimPhaseRandom";
    AnimationPhase[AnimationPhase["AnimPhaseAsync"] = 255] = "AnimPhaseAsync";
})(AnimationPhase = exports.AnimationPhase || (exports.AnimationPhase = {}));
var AnimationDirection;
(function (AnimationDirection) {
    AnimationDirection[AnimationDirection["AnimDirForward"] = 0] = "AnimDirForward";
    AnimationDirection[AnimationDirection["AnimDirBackward"] = 1] = "AnimDirBackward";
})(AnimationDirection = exports.AnimationDirection || (exports.AnimationDirection = {}));
var Tilestate;
(function (Tilestate) {
    Tilestate[Tilestate["TILESTATE_NONE"] = 0] = "TILESTATE_NONE";
    Tilestate[Tilestate["TILESTATE_PROTECTIONZONE"] = 1] = "TILESTATE_PROTECTIONZONE";
    Tilestate[Tilestate["TILESTATE_TRASHED"] = 2] = "TILESTATE_TRASHED";
    Tilestate[Tilestate["TILESTATE_OPTIONALZONE"] = 4] = "TILESTATE_OPTIONALZONE";
    Tilestate[Tilestate["TILESTATE_NOLOGOUT"] = 8] = "TILESTATE_NOLOGOUT";
    Tilestate[Tilestate["TILESTATE_HARDCOREZONE"] = 16] = "TILESTATE_HARDCOREZONE";
    Tilestate[Tilestate["TILESTATE_REFRESH"] = 32] = "TILESTATE_REFRESH";
    // internal usage
    Tilestate[Tilestate["TILESTATE_HOUSE"] = 64] = "TILESTATE_HOUSE";
    Tilestate[Tilestate["TILESTATE_TELEPORT"] = 131072] = "TILESTATE_TELEPORT";
    Tilestate[Tilestate["TILESTATE_MAGICFIELD"] = 262144] = "TILESTATE_MAGICFIELD";
    Tilestate[Tilestate["TILESTATE_MAILBOX"] = 524288] = "TILESTATE_MAILBOX";
    Tilestate[Tilestate["TILESTATE_TRASHHOLDER"] = 1048576] = "TILESTATE_TRASHHOLDER";
    Tilestate[Tilestate["TILESTATE_BED"] = 2097152] = "TILESTATE_BED";
    Tilestate[Tilestate["TILESTATE_DEPOT"] = 4194304] = "TILESTATE_DEPOT";
    Tilestate[Tilestate["TILESTATE_TRANSLUECENT_LIGHT"] = 8388608] = "TILESTATE_TRANSLUECENT_LIGHT";
    Tilestate[Tilestate["TILESTATE_LAST"] = 16777216] = "TILESTATE_LAST";
})(Tilestate = exports.Tilestate || (exports.Tilestate = {}));
