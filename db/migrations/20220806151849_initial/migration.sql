-- CreateEnum
CREATE TYPE "TokenType" AS ENUM ('RESET_PASSWORD');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "hashedPassword" TEXT,
    "role" TEXT NOT NULL DEFAULT 'USER',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "expiresAt" TIMESTAMP(3),
    "handle" TEXT NOT NULL,
    "hashedSessionToken" TEXT,
    "antiCSRFToken" TEXT,
    "publicData" TEXT,
    "privateData" TEXT,
    "userId" INTEGER,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Token" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "hashedToken" TEXT NOT NULL,
    "type" "TokenType" NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "sentTo" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Token_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Activity" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR,
    "characterLevelMin" INTEGER NOT NULL,
    "characterLevelMax" INTEGER NOT NULL,
    "skillId" UUID,
    "skillIdRequiredValue" INTEGER,
    "pvpChance" INTEGER NOT NULL,
    "raceRestrictionType" INTEGER NOT NULL,
    "raceId" UUID,
    "careerRestrictionType" INTEGER NOT NULL,
    "careerId" UUID,
    "imageId" UUID,
    "imageBackgroundColor" VARCHAR(10),
    "isDeleted" BOOLEAN NOT NULL,
    "notes" VARCHAR(3000),
    "gender" INTEGER,
    "singleBattleIntroScript" VARCHAR,
    "groupBattleIntroScript" VARCHAR,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActivityResult" (
    "id" UUID NOT NULL,
    "result" VARCHAR,
    "battleTurns" VARCHAR,
    "cash" INTEGER NOT NULL,
    "experience" INTEGER NOT NULL,
    "health" INTEGER,
    "pvpWins" INTEGER,
    "pvpLosses" INTEGER,
    "customItemId1" UUID,
    "customItemId2" UUID,
    "activityId" UUID NOT NULL,
    "featId" UUID,
    "skillId" UUID,
    "isNewSkill" BOOLEAN,
    "resultsCalculatedDate" TIMESTAMP(6),
    "resultsAllocatedDate" TIMESTAMP(6),
    "characterId" UUID,
    "isSuccess" BOOLEAN,
    "battleEvents" VARCHAR,

    CONSTRAINT "ActivityResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Adventure" (
    "id" UUID NOT NULL,
    "name" VARCHAR(50),
    "activityId" UUID NOT NULL,
    "itemIdRequired" UUID,
    "itemConsumedOnSuccess" BOOLEAN NOT NULL,
    "gender" INTEGER,
    "introductionScript" VARCHAR(5000),
    "adventureCheckTypeId" UUID NOT NULL,
    "fightTargetTypeIdCheck" UUID,
    "raceIdFightCheck" UUID,
    "careerIdFightCheck" UUID,
    "maskNameFightCheck" VARCHAR(100),
    "levelFightCheck" INTEGER,
    "useCharacterImageFightCheck" BOOLEAN,
    "maskImageBgColorFightCheck" VARCHAR(10),
    "imageIdMaskFightCheck" UUID,
    "skillIdCheck" UUID,
    "skillValueCheck" INTEGER,
    "failureScript" VARCHAR(5000),
    "successScript" VARCHAR(5000),
    "itemIdReward" UUID,
    "cashReward" INTEGER NOT NULL,
    "itemTypeIdDrop" UUID,
    "itemDropAny" BOOLEAN NOT NULL,
    "itemDropRelated" BOOLEAN NOT NULL,
    "itemDropKeywords" VARCHAR(100),
    "isDeleted" BOOLEAN NOT NULL,
    "featIdReward" UUID,

    CONSTRAINT "Adventure_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BattlePool" (
    "id" UUID NOT NULL,
    "characterId" UUID NOT NULL,
    "groupId" UUID,
    "characterLevel" INTEGER NOT NULL,
    "battleLevel" DECIMAL(18,2) NOT NULL,
    "dateAdded" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "BattlePool_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Career" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(1000),
    "gender" INTEGER,
    "isDeleted" BOOLEAN NOT NULL,
    "gameId" INTEGER NOT NULL,
    "itemId1" UUID,
    "itemId2" UUID,
    "skillId1" UUID,
    "skillId2" UUID,
    "featId1" UUID,
    "featId2" UUID,

    CONSTRAINT "Career_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CareerRace" (
    "id" UUID NOT NULL,
    "careerId" UUID NOT NULL,
    "raceId" UUID NOT NULL,
    "maleWeight" INTEGER NOT NULL,
    "femaleWeight" INTEGER NOT NULL,
    "maleName" VARCHAR(255) NOT NULL,
    "femaleName" VARCHAR(255) NOT NULL,
    "bio" VARCHAR(255) NOT NULL,
    "maleBio" VARCHAR(255) NOT NULL,
    "femaleBio" VARCHAR(50) NOT NULL,
    "flavorText" VARCHAR(255) NOT NULL,

    CONSTRAINT "CareerRace_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Character" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "careerId" UUID NOT NULL,
    "raceId" UUID NOT NULL,
    "imageId" UUID NOT NULL,
    "levelId" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "experience" INTEGER NOT NULL,
    "gender" INTEGER NOT NULL,
    "health" INTEGER NOT NULL,
    "maxHealth" INTEGER NOT NULL,
    "biography" VARCHAR NOT NULL,
    "activityResult" VARCHAR,
    "isDeleted" BOOLEAN NOT NULL,
    "dateCreated" TIMESTAMP(6) NOT NULL,
    "skillPoints" INTEGER NOT NULL,
    "activityResultId" UUID,
    "activityId" UUID,
    "pvpWins" INTEGER NOT NULL,
    "pvpLosses" INTEGER NOT NULL,
    "pvpRating" DOUBLE PRECISION NOT NULL,
    "isNpc" BOOLEAN NOT NULL,
    "groupId" UUID,
    "dateLastActivitySelected" TIMESTAMP(6) NOT NULL,
    "isRetired" BOOLEAN NOT NULL,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CharacterFeat" (
    "id" UUID NOT NULL,
    "characterId" UUID NOT NULL,
    "featId" UUID NOT NULL,
    "rank" INTEGER NOT NULL,
    "isEquipped" BOOLEAN NOT NULL,

    CONSTRAINT "CharacterFeat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CharacterGroup" (
    "id" UUID NOT NULL,
    "characterId" UUID NOT NULL,
    "groupId" UUID NOT NULL,

    CONSTRAINT "CharacterGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CharacterSkill" (
    "id" UUID NOT NULL,
    "characterId" UUID NOT NULL,
    "skillId" UUID NOT NULL,
    "value" INTEGER NOT NULL,
    "freePointValue" INTEGER NOT NULL,

    CONSTRAINT "CharacterSkill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomItem" (
    "id" UUID NOT NULL,
    "itemid" UUID NOT NULL,
    "name" VARCHAR(255),
    "description" VARCHAR(3000),
    "flavorText" VARCHAR(3000),
    "noTrade" BOOLEAN NOT NULL,

    CONSTRAINT "CustomItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Effect" (
    "id" UUID NOT NULL,
    "name" VARCHAR(50),
    "effectDurationTypeId" UUID,
    "duration" INTEGER,
    "attackModifier" INTEGER NOT NULL,
    "attackKeyword" VARCHAR(255),
    "defenseModifier" INTEGER NOT NULL,
    "defenseKeyword" VARCHAR(255),
    "damageHealing" INTEGER NOT NULL,
    "armorModifier" INTEGER NOT NULL,
    "weaponDamageModifier" INTEGER NOT NULL,
    "isDeleted" BOOLEAN NOT NULL,

    CONSTRAINT "Effect_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Feat" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255),
    "description" VARCHAR(255),
    "featCastModeId" UUID,
    "reactiveEvent" VARCHAR(255),
    "featReactiveEventInitiatorId" UUID,
    "cooldown" INTEGER NOT NULL,
    "skillId" UUID,
    "skillRequiredValue" INTEGER,
    "featSpecialMechanicId" UUID,
    "cashPrize" INTEGER NOT NULL,
    "featTargetTypeIdTarget1" UUID,
    "genderTarget1" INTEGER,
    "damageHealingTarget1" INTEGER NOT NULL,
    "raceRestrictionTypeTarget1" INTEGER NOT NULL,
    "raceIdTarget1" UUID,
    "careerRestrictionTypeTarget1" INTEGER NOT NULL,
    "careerIdTarget1" UUID,
    "effectIdTarget1" UUID,
    "featTargetTypeIdTarget2" UUID,
    "genderTarget2" INTEGER,
    "damageHealingTarget2" INTEGER NOT NULL,
    "raceRestrictionTypeTarget2" INTEGER NOT NULL,
    "raceIdTarget2" UUID,
    "careerRestrictionTypeTarget2" INTEGER NOT NULL,
    "careerIdTarget2" UUID,
    "effectIdTarget2" UUID,
    "target1OnlyScript" VARCHAR NOT NULL,
    "target2OnlyScript" VARCHAR NOT NULL,
    "successScript" VARCHAR NOT NULL,
    "failureScript" VARCHAR NOT NULL,
    "isDeleted" BOOLEAN NOT NULL,
    "imageId" UUID,
    "raceRestrictionType" INTEGER,
    "raceId" UUID,
    "careerRestrictionType" INTEGER,
    "careerId" UUID,
    "gender" INTEGER,
    "level" INTEGER NOT NULL,

    CONSTRAINT "Feat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ForumCategory" (
    "id" UUID NOT NULL,
    "cssClass" VARCHAR(50),
    "title" VARCHAR(200),
    "creationDate" TIMESTAMP(6) NOT NULL,
    "isDeleted" BOOLEAN NOT NULL,
    "displayPriority" INTEGER,
    "isLocked" BOOLEAN NOT NULL,

    CONSTRAINT "ForumCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ForumPost" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "forumThreadId" UUID NOT NULL,
    "content" VARCHAR(5000),
    "creationDate" TIMESTAMP(6) NOT NULL,
    "isDeleted" BOOLEAN NOT NULL,

    CONSTRAINT "ForumPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ForumThread" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "forumCategoryId" UUID NOT NULL,
    "content" VARCHAR(5000),
    "isLocked" BOOLEAN NOT NULL,
    "isSticky" BOOLEAN NOT NULL,
    "creationDate" TIMESTAMP(6) NOT NULL,
    "isDeleted" BOOLEAN NOT NULL,
    "title" VARCHAR(200),

    CONSTRAINT "ForumThread_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Gender" (
    "id" UUID NOT NULL,
    "name" VARCHAR(50),

    CONSTRAINT "Gender_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Group" (
    "id" UUID NOT NULL,
    "startDateTime" TIMESTAMP(6) NOT NULL,
    "endDateTime" TIMESTAMP(6),
    "duration" DECIMAL(18,0) NOT NULL,
    "wins" INTEGER NOT NULL,
    "losses" INTEGER NOT NULL,
    "runTimes" INTEGER NOT NULL,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255),
    "itemTypeId" UUID NOT NULL,
    "characterLevel" INTEGER NOT NULL,
    "flavorText" VARCHAR(3000),
    "description" TEXT,
    "healing" INTEGER NOT NULL,
    "armor" INTEGER NOT NULL,
    "attack" INTEGER NOT NULL,
    "attackKeyword" VARCHAR(25),
    "damage" INTEGER NOT NULL,
    "damageVariance" DOUBLE PRECISION NOT NULL,
    "hitScript" VARCHAR(100),
    "critScript" VARCHAR(100),
    "missScript" VARCHAR(100),
    "defense" INTEGER NOT NULL,
    "defenseKeyword" VARCHAR(50),
    "defendScript" VARCHAR(100),
    "isDeleted" BOOLEAN NOT NULL,
    "imageId" UUID,
    "imageBackgroundColor" VARCHAR(10),
    "notes" VARCHAR(3000),
    "raceRestrictionType" INTEGER NOT NULL,
    "raceId" UUID,
    "careerRestrictionType" INTEGER NOT NULL,
    "careerId" UUID,
    "noTrade" BOOLEAN NOT NULL,
    "featId" UUID,
    "noTradeAfterEquip" BOOLEAN NOT NULL,
    "isVisibleInInventory" BOOLEAN NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemSlot" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255),

    CONSTRAINT "ItemSlot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemType" (
    "id" UUID NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "isDeleted" BOOLEAN NOT NULL,

    CONSTRAINT "ItemType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Race" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "isDeleted" BOOLEAN NOT NULL,
    "itemId1" UUID,
    "itemId2" UUID,
    "skillId1" UUID,
    "skillId2" UUID,
    "featId1" UUID,
    "featId2" UUID,

    CONSTRAINT "Race_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Runtime" (
    "id" UUID NOT NULL,
    "time" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "Runtime_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Skill" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255),
    "learningScript" VARCHAR NOT NULL,
    "careerId" UUID,
    "isDeleted" BOOLEAN NOT NULL,
    "gameId" INTEGER NOT NULL,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserItem" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "customItemId" UUID NOT NULL,
    "characterId" UUID,
    "itemSlotId" UUID,
    "itemSlotVariation" INTEGER,

    CONSTRAINT "UserItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdventureCheckType" (
    "id" UUID NOT NULL,
    "name" VARCHAR(50) NOT NULL,

    CONSTRAINT "AdventureCheckType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CareerAdventure" (
    "id" UUID NOT NULL,
    "careerId" UUID NOT NULL,
    "adventureId" UUID NOT NULL,

    CONSTRAINT "CareerAdventure_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CharacterForHire" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "careerRaceId" UUID NOT NULL,
    "gender" INTEGER NOT NULL,
    "expirationDate" TIMESTAMP(6) NOT NULL,
    "isHired" BOOLEAN NOT NULL,

    CONSTRAINT "CharacterForHire_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CharacterLevel" (
    "id" UUID NOT NULL,
    "level" INTEGER NOT NULL,
    "maxExperience" INTEGER NOT NULL,

    CONSTRAINT "CharacterLevel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EffectDurationType" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255),

    CONSTRAINT "EffectDurationType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EffectSkillBonus" (
    "id" UUID NOT NULL,
    "effectId" UUID NOT NULL,
    "skillId" UUID NOT NULL,
    "bonus" INTEGER NOT NULL,

    CONSTRAINT "EffectSkillBonus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EffectSpecialMechanic" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255),

    CONSTRAINT "EffectSpecialMechanic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EffectSpecialMechanicCombo" (
    "id" UUID NOT NULL,
    "effectId" UUID NOT NULL,
    "effectSpecialMechanicId" UUID NOT NULL,

    CONSTRAINT "EffectSpecialMechanicCombo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeatCastMode" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255),

    CONSTRAINT "FeatCastMode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeatReactiveEventInitiator" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255),

    CONSTRAINT "FeatReactiveEventInitiator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeatSpecialMechanic" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255),

    CONSTRAINT "FeatSpecialMechanic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeatTargetType" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255),

    CONSTRAINT "FeatTargetType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FightTargetType" (
    "id" UUID NOT NULL,
    "name" VARCHAR(50) NOT NULL,

    CONSTRAINT "FightTargetType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" UUID NOT NULL,
    "imageCategoryId" UUID NOT NULL,
    "filename" VARCHAR(50) NOT NULL,
    "isDeleted" BOOLEAN NOT NULL,
    "raceId" UUID,
    "careerId" UUID,
    "genderId" UUID,
    "gender" INTEGER,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ImageCategory" (
    "id" UUID NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "isDeleted" BOOLEAN NOT NULL,

    CONSTRAINT "ImageCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemEquippableInSlot" (
    "id" UUID NOT NULL,
    "itemId" UUID NOT NULL,
    "itemSlotId" UUID NOT NULL,

    CONSTRAINT "ItemEquippableInSlot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemSkillBonus" (
    "id" UUID NOT NULL,
    "itemId" UUID NOT NULL,
    "skillId" UUID NOT NULL,
    "bonus" INTEGER NOT NULL,

    CONSTRAINT "ItemSkillBonus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Phrase" (
    "id" UUID NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "isDeleted" BOOLEAN NOT NULL,

    CONSTRAINT "Phrase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PhraseVariation" (
    "id" UUID NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "phraseId" UUID NOT NULL,

    CONSTRAINT "PhraseVariation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PhraseVariationTerm" (
    "id" UUID NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "phraseVariationId" UUID,
    "phraseId" UUID NOT NULL,

    CONSTRAINT "PhraseVariationTerm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RaceAdventure" (
    "id" UUID NOT NULL,
    "raceId" UUID NOT NULL,
    "adventureId" UUID NOT NULL,

    CONSTRAINT "RaceAdventure_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Session_handle_key" ON "Session"("handle");

-- CreateIndex
CREATE UNIQUE INDEX "Token_hashedToken_type_key" ON "Token"("hashedToken", "type");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_careerId_fkey" FOREIGN KEY ("careerId") REFERENCES "Career"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_raceId_fkey" FOREIGN KEY ("raceId") REFERENCES "Race"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityResult" ADD CONSTRAINT "ActivityResult_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityResult" ADD CONSTRAINT "ActivityResult_customItemId1_fkey" FOREIGN KEY ("customItemId1") REFERENCES "CustomItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityResult" ADD CONSTRAINT "ActivityResult_customItemId2_fkey" FOREIGN KEY ("customItemId2") REFERENCES "CustomItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityResult" ADD CONSTRAINT "ActivityResult_featId_fkey" FOREIGN KEY ("featId") REFERENCES "Feat"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityResult" ADD CONSTRAINT "ActivityResult_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Adventure" ADD CONSTRAINT "Adventure_careerIdFightCheck_fkey" FOREIGN KEY ("careerIdFightCheck") REFERENCES "Career"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Adventure" ADD CONSTRAINT "Adventure_featIdReward_fkey" FOREIGN KEY ("featIdReward") REFERENCES "Feat"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Adventure" ADD CONSTRAINT "Adventure_itemIdRequired_fkey" FOREIGN KEY ("itemIdRequired") REFERENCES "Item"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Adventure" ADD CONSTRAINT "Adventure_itemIdReward_fkey" FOREIGN KEY ("itemIdReward") REFERENCES "Item"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Adventure" ADD CONSTRAINT "Adventure_itemTypeIdDrop_fkey" FOREIGN KEY ("itemTypeIdDrop") REFERENCES "ItemType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Adventure" ADD CONSTRAINT "Adventure_raceIdFightCheck_fkey" FOREIGN KEY ("raceIdFightCheck") REFERENCES "Race"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Adventure" ADD CONSTRAINT "Adventure_skillIdCheck_fkey" FOREIGN KEY ("skillIdCheck") REFERENCES "Skill"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Adventure" ADD CONSTRAINT "Adventure_adventureCheckTypeId_fkey" FOREIGN KEY ("adventureCheckTypeId") REFERENCES "AdventureCheckType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Adventure" ADD CONSTRAINT "Adventure_fightTargetTypeIdCheck_fkey" FOREIGN KEY ("fightTargetTypeIdCheck") REFERENCES "FightTargetType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Adventure" ADD CONSTRAINT "Adventure_imageIdMaskFightCheck_fkey" FOREIGN KEY ("imageIdMaskFightCheck") REFERENCES "Image"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BattlePool" ADD CONSTRAINT "BattlePool_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BattlePool" ADD CONSTRAINT "BattlePool_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Career" ADD CONSTRAINT "Career_featId1_fkey" FOREIGN KEY ("featId1") REFERENCES "Feat"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Career" ADD CONSTRAINT "Career_featId2_fkey" FOREIGN KEY ("featId2") REFERENCES "Feat"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Career" ADD CONSTRAINT "Career_itemId1_fkey" FOREIGN KEY ("itemId1") REFERENCES "Item"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Career" ADD CONSTRAINT "Career_itemId2_fkey" FOREIGN KEY ("itemId2") REFERENCES "Item"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Career" ADD CONSTRAINT "Career_skillId1_fkey" FOREIGN KEY ("skillId1") REFERENCES "Skill"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Career" ADD CONSTRAINT "Career_skillId2_fkey" FOREIGN KEY ("skillId2") REFERENCES "Skill"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CareerRace" ADD CONSTRAINT "CareerRace_careerId_fkey" FOREIGN KEY ("careerId") REFERENCES "Career"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CareerRace" ADD CONSTRAINT "CareerRace_raceId_fkey" FOREIGN KEY ("raceId") REFERENCES "Race"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_careerId_fkey" FOREIGN KEY ("careerId") REFERENCES "Career"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_raceId_fkey" FOREIGN KEY ("raceId") REFERENCES "Race"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "CharacterLevel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterFeat" ADD CONSTRAINT "CharacterFeat_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterFeat" ADD CONSTRAINT "CharacterFeat_featId_fkey" FOREIGN KEY ("featId") REFERENCES "Feat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterGroup" ADD CONSTRAINT "CharacterGroup_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterGroup" ADD CONSTRAINT "CharacterGroup_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterSkill" ADD CONSTRAINT "CharacterSkill_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterSkill" ADD CONSTRAINT "CharacterSkill_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomItem" ADD CONSTRAINT "CustomItem_itemid_fkey" FOREIGN KEY ("itemid") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Effect" ADD CONSTRAINT "Effect_effectDurationTypeId_fkey" FOREIGN KEY ("effectDurationTypeId") REFERENCES "EffectDurationType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feat" ADD CONSTRAINT "Feat_careerId_fkey" FOREIGN KEY ("careerId") REFERENCES "Career"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feat" ADD CONSTRAINT "Feat_careerIdTarget1_fkey" FOREIGN KEY ("careerIdTarget1") REFERENCES "Career"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feat" ADD CONSTRAINT "Feat_careerIdTarget2_fkey" FOREIGN KEY ("careerIdTarget2") REFERENCES "Career"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feat" ADD CONSTRAINT "Feat_effectIdTarget1_fkey" FOREIGN KEY ("effectIdTarget1") REFERENCES "Effect"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feat" ADD CONSTRAINT "Feat_effectIdTarget2_fkey" FOREIGN KEY ("effectIdTarget2") REFERENCES "Effect"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feat" ADD CONSTRAINT "Feat_raceIdTarget1_fkey" FOREIGN KEY ("raceIdTarget1") REFERENCES "Race"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feat" ADD CONSTRAINT "Feat_raceIdTarget2_fkey" FOREIGN KEY ("raceIdTarget2") REFERENCES "Race"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feat" ADD CONSTRAINT "Feat_featCastModeId_fkey" FOREIGN KEY ("featCastModeId") REFERENCES "FeatCastMode"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feat" ADD CONSTRAINT "Feat_featReactiveEventInitiatorId_fkey" FOREIGN KEY ("featReactiveEventInitiatorId") REFERENCES "FeatReactiveEventInitiator"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feat" ADD CONSTRAINT "Feat_featSpecialMechanicId_fkey" FOREIGN KEY ("featSpecialMechanicId") REFERENCES "FeatSpecialMechanic"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feat" ADD CONSTRAINT "Feat_featTargetTypeIdTarget1_fkey" FOREIGN KEY ("featTargetTypeIdTarget1") REFERENCES "FeatTargetType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feat" ADD CONSTRAINT "Feat_featTargetTypeIdTarget2_fkey" FOREIGN KEY ("featTargetTypeIdTarget2") REFERENCES "FeatTargetType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ForumPost" ADD CONSTRAINT "ForumPost_forumThreadId_fkey" FOREIGN KEY ("forumThreadId") REFERENCES "ForumThread"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ForumThread" ADD CONSTRAINT "ForumThread_forumCategoryId_fkey" FOREIGN KEY ("forumCategoryId") REFERENCES "ForumCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_careerId_fkey" FOREIGN KEY ("careerId") REFERENCES "Career"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_featId_fkey" FOREIGN KEY ("featId") REFERENCES "Feat"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_itemTypeId_fkey" FOREIGN KEY ("itemTypeId") REFERENCES "ItemType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Race" ADD CONSTRAINT "Race_featId1_fkey" FOREIGN KEY ("featId1") REFERENCES "Feat"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Race" ADD CONSTRAINT "Race_featId2_fkey" FOREIGN KEY ("featId2") REFERENCES "Feat"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Race" ADD CONSTRAINT "Race_itemId1_fkey" FOREIGN KEY ("itemId1") REFERENCES "Item"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Race" ADD CONSTRAINT "Race_itemId2_fkey" FOREIGN KEY ("itemId2") REFERENCES "Item"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Race" ADD CONSTRAINT "Race_skillId1_fkey" FOREIGN KEY ("skillId1") REFERENCES "Skill"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Race" ADD CONSTRAINT "Race_skillId2_fkey" FOREIGN KEY ("skillId2") REFERENCES "Skill"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Skill" ADD CONSTRAINT "Skill_careerId_fkey" FOREIGN KEY ("careerId") REFERENCES "Career"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserItem" ADD CONSTRAINT "UserItem_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserItem" ADD CONSTRAINT "UserItem_customItemId_fkey" FOREIGN KEY ("customItemId") REFERENCES "CustomItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserItem" ADD CONSTRAINT "UserItem_itemSlotId_fkey" FOREIGN KEY ("itemSlotId") REFERENCES "ItemSlot"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CareerAdventure" ADD CONSTRAINT "CareerAdventure_adventureId_fkey" FOREIGN KEY ("adventureId") REFERENCES "Adventure"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CareerAdventure" ADD CONSTRAINT "CareerAdventure_careerId_fkey" FOREIGN KEY ("careerId") REFERENCES "Career"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterForHire" ADD CONSTRAINT "CharacterForHire_careerRaceId_fkey" FOREIGN KEY ("careerRaceId") REFERENCES "CareerRace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EffectSkillBonus" ADD CONSTRAINT "EffectSkillBonus_effectId_fkey" FOREIGN KEY ("effectId") REFERENCES "Effect"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EffectSkillBonus" ADD CONSTRAINT "EffectSkillBonus_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EffectSpecialMechanicCombo" ADD CONSTRAINT "EffectSpecialMechanicCombo_effectId_fkey" FOREIGN KEY ("effectId") REFERENCES "Effect"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EffectSpecialMechanicCombo" ADD CONSTRAINT "EffectSpecialMechanicCombo_effectSpecialMechanicId_fkey" FOREIGN KEY ("effectSpecialMechanicId") REFERENCES "EffectSpecialMechanic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_careerId_fkey" FOREIGN KEY ("careerId") REFERENCES "Career"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_genderId_fkey" FOREIGN KEY ("genderId") REFERENCES "Gender"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_raceId_fkey" FOREIGN KEY ("raceId") REFERENCES "Race"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_imageCategoryId_fkey" FOREIGN KEY ("imageCategoryId") REFERENCES "ImageCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemEquippableInSlot" ADD CONSTRAINT "ItemEquippableInSlot_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemEquippableInSlot" ADD CONSTRAINT "ItemEquippableInSlot_itemSlotId_fkey" FOREIGN KEY ("itemSlotId") REFERENCES "ItemSlot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemSkillBonus" ADD CONSTRAINT "ItemSkillBonus_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemSkillBonus" ADD CONSTRAINT "ItemSkillBonus_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PhraseVariation" ADD CONSTRAINT "PhraseVariation_phraseId_fkey" FOREIGN KEY ("phraseId") REFERENCES "Phrase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PhraseVariationTerm" ADD CONSTRAINT "PhraseVariationTerm_phraseId_fkey" FOREIGN KEY ("phraseId") REFERENCES "Phrase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PhraseVariationTerm" ADD CONSTRAINT "PhraseVariationTerm_phraseVariationId_fkey" FOREIGN KEY ("phraseVariationId") REFERENCES "PhraseVariation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RaceAdventure" ADD CONSTRAINT "RaceAdventure_adventureId_fkey" FOREIGN KEY ("adventureId") REFERENCES "Adventure"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RaceAdventure" ADD CONSTRAINT "RaceAdventure_raceId_fkey" FOREIGN KEY ("raceId") REFERENCES "Race"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
