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
CREATE TABLE "activity" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR,
    "characterlevelmin" INTEGER NOT NULL,
    "characterlevelmax" INTEGER NOT NULL,
    "skillid" UUID,
    "skillidrequiredvalue" INTEGER,
    "pvpchance" INTEGER NOT NULL,
    "racerestrictiontype" INTEGER NOT NULL,
    "raceid" UUID,
    "careerrestrictiontype" INTEGER NOT NULL,
    "careerid" UUID,
    "imageid" UUID,
    "imagebackgroundcolor" VARCHAR(10),
    "isdeleted" BOOLEAN NOT NULL,
    "notes" VARCHAR(3000),
    "gender" INTEGER,
    "singlebattleintroscript" VARCHAR,
    "groupbattleintroscript" VARCHAR,

    CONSTRAINT "activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "activityresult" (
    "id" UUID NOT NULL,
    "result" VARCHAR,
    "battleturns" VARCHAR,
    "cash" INTEGER NOT NULL,
    "experience" INTEGER NOT NULL,
    "health" INTEGER,
    "pvpwins" INTEGER,
    "pvplosses" INTEGER,
    "customitemid1" UUID,
    "customitemid2" UUID,
    "activityid" UUID NOT NULL,
    "featid" UUID,
    "skillid" UUID,
    "isnewskill" BOOLEAN,
    "resultscalculateddate" TIMESTAMP(6),
    "resultsallocateddate" TIMESTAMP(6),
    "characterid" UUID,
    "issuccess" BOOLEAN,
    "battleevents" VARCHAR,

    CONSTRAINT "activityresult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "adventure" (
    "id" UUID NOT NULL,
    "name" VARCHAR(50),
    "activityid" UUID NOT NULL,
    "itemidrequired" UUID,
    "itemconsumedonsuccess" BOOLEAN NOT NULL,
    "gender" INTEGER,
    "introductionscript" VARCHAR(5000),
    "adventurechecktypeid" UUID NOT NULL,
    "fighttargettypeidcheck" UUID,
    "raceidfightcheck" UUID,
    "careeridfightcheck" UUID,
    "masknamefightcheck" VARCHAR(100),
    "levelfightcheck" INTEGER,
    "usecharacterimagefightcheck" BOOLEAN,
    "maskimagebgcolorfightcheck" VARCHAR(10),
    "imageidmaskfightcheck" UUID,
    "skillidcheck" UUID,
    "skillvaluecheck" INTEGER,
    "failurescript" VARCHAR(5000),
    "successscript" VARCHAR(5000),
    "itemidreward" UUID,
    "cashreward" INTEGER NOT NULL,
    "itemtypeiddrop" UUID,
    "itemdropany" BOOLEAN NOT NULL,
    "itemdroprelated" BOOLEAN NOT NULL,
    "itemdropkeywords" VARCHAR(100),
    "isdeleted" BOOLEAN NOT NULL,
    "featidreward" UUID,

    CONSTRAINT "adventure_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "battlepool" (
    "id" UUID NOT NULL,
    "characterid" UUID NOT NULL,
    "groupid" UUID,
    "characterlevel" INTEGER NOT NULL,
    "battlelevel" DECIMAL(18,2) NOT NULL,
    "dateadded" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "battlepool_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "career" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(1000),
    "gender" INTEGER,
    "isdeleted" BOOLEAN NOT NULL,
    "gameid" INTEGER NOT NULL,
    "itemid1" UUID,
    "itemid2" UUID,
    "skillid1" UUID,
    "skillid2" UUID,
    "featid1" UUID,
    "featid2" UUID,

    CONSTRAINT "career_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "careerrace" (
    "id" UUID NOT NULL,
    "careerid" UUID NOT NULL,
    "raceid" UUID NOT NULL,
    "maleweight" INTEGER NOT NULL,
    "femaleweight" INTEGER NOT NULL,
    "malename" VARCHAR(255) NOT NULL,
    "femalename" VARCHAR(255) NOT NULL,
    "bio" VARCHAR(255) NOT NULL,
    "malebio" VARCHAR(255) NOT NULL,
    "femalebio" VARCHAR(50) NOT NULL,
    "flavortext" VARCHAR(255) NOT NULL,

    CONSTRAINT "careerrace_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "character" (
    "id" UUID NOT NULL,
    "userid" UUID NOT NULL,
    "careerid" UUID NOT NULL,
    "raceid" UUID NOT NULL,
    "imageid" UUID NOT NULL,
    "levelid" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "experience" INTEGER NOT NULL,
    "gender" INTEGER NOT NULL,
    "health" INTEGER NOT NULL,
    "maxhealth" INTEGER NOT NULL,
    "biography" VARCHAR NOT NULL,
    "activityresult" VARCHAR,
    "isdeleted" BOOLEAN NOT NULL,
    "datecreated" TIMESTAMP(6) NOT NULL,
    "skillpoints" INTEGER NOT NULL,
    "activityresultid" UUID,
    "activityid" UUID,
    "pvpwins" INTEGER NOT NULL,
    "pvplosses" INTEGER NOT NULL,
    "pvprating" DOUBLE PRECISION NOT NULL,
    "isnpc" BOOLEAN NOT NULL,
    "groupid" UUID,
    "datelastactivityselected" TIMESTAMP(6) NOT NULL,
    "isretired" BOOLEAN NOT NULL,

    CONSTRAINT "character_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "characterfeat" (
    "id" UUID NOT NULL,
    "characterid" UUID NOT NULL,
    "featid" UUID NOT NULL,
    "rank" INTEGER NOT NULL,
    "isequipped" BOOLEAN NOT NULL,

    CONSTRAINT "characterfeat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "charactergroup" (
    "id" UUID NOT NULL,
    "characterid" UUID NOT NULL,
    "groupid" UUID NOT NULL,

    CONSTRAINT "charactergroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "characterskill" (
    "id" UUID NOT NULL,
    "characterid" UUID NOT NULL,
    "skillid" UUID NOT NULL,
    "value" INTEGER NOT NULL,
    "freepointvalue" INTEGER NOT NULL,

    CONSTRAINT "characterskill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customitem" (
    "id" UUID NOT NULL,
    "itemid" UUID NOT NULL,
    "name" VARCHAR(255),
    "description" VARCHAR(3000),
    "flavortext" VARCHAR(3000),
    "notrade" BOOLEAN NOT NULL,

    CONSTRAINT "customitem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "effect" (
    "id" UUID NOT NULL,
    "name" VARCHAR(50),
    "effectdurationtypeid" UUID,
    "duration" INTEGER,
    "attackmodifier" INTEGER NOT NULL,
    "attackkeyword" VARCHAR(255),
    "defensemodifier" INTEGER NOT NULL,
    "defensekeyword" VARCHAR(255),
    "damagehealing" INTEGER NOT NULL,
    "armormodifier" INTEGER NOT NULL,
    "weapondamagemodifier" INTEGER NOT NULL,
    "isdeleted" BOOLEAN NOT NULL,

    CONSTRAINT "effect_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "feat" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255),
    "description" VARCHAR(255),
    "featcastmodeid" UUID,
    "reactiveevent" VARCHAR(255),
    "featreactiveeventinitiatorid" UUID,
    "cooldown" INTEGER NOT NULL,
    "skillid" UUID,
    "skillrequiredvalue" INTEGER,
    "featspecialmechanicid" UUID,
    "cashprize" INTEGER NOT NULL,
    "feattargettypeidtarget1" UUID,
    "gendertarget1" INTEGER,
    "damagehealingtarget1" INTEGER NOT NULL,
    "racerestrictiontypetarget1" INTEGER NOT NULL,
    "raceidtarget1" UUID,
    "careerrestrictiontypetarget1" INTEGER NOT NULL,
    "careeridtarget1" UUID,
    "effectidtarget1" UUID,
    "feattargettypeidtarget2" UUID,
    "gendertarget2" INTEGER,
    "damagehealingtarget2" INTEGER NOT NULL,
    "racerestrictiontypetarget2" INTEGER NOT NULL,
    "raceidtarget2" UUID,
    "careerrestrictiontypetarget2" INTEGER NOT NULL,
    "careeridtarget2" UUID,
    "effectidtarget2" UUID,
    "target1onlyscript" VARCHAR NOT NULL,
    "target2onlyscript" VARCHAR NOT NULL,
    "successscript" VARCHAR NOT NULL,
    "failurescript" VARCHAR NOT NULL,
    "isdeleted" BOOLEAN NOT NULL,
    "imageid" UUID,
    "racerestrictiontype" INTEGER,
    "raceid" UUID,
    "careerrestrictiontype" INTEGER,
    "careerid" UUID,
    "gender" INTEGER,
    "level" INTEGER NOT NULL,

    CONSTRAINT "feat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "forumcategory" (
    "id" UUID NOT NULL,
    "cssclass" VARCHAR(50),
    "title" VARCHAR(200),
    "creationdate" TIMESTAMP(6) NOT NULL,
    "isdeleted" BOOLEAN NOT NULL,
    "displaypriority" INTEGER,
    "islocked" BOOLEAN NOT NULL,

    CONSTRAINT "forumcategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "forumpost" (
    "id" UUID NOT NULL,
    "userid" UUID NOT NULL,
    "forumthreadid" UUID NOT NULL,
    "content" VARCHAR(5000),
    "creationdate" TIMESTAMP(6) NOT NULL,
    "isdeleted" BOOLEAN NOT NULL,

    CONSTRAINT "forumpost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "forumthread" (
    "id" UUID NOT NULL,
    "userid" UUID NOT NULL,
    "forumcategoryid" UUID NOT NULL,
    "content" VARCHAR(5000),
    "islocked" BOOLEAN NOT NULL,
    "issticky" BOOLEAN NOT NULL,
    "creationdate" TIMESTAMP(6) NOT NULL,
    "isdeleted" BOOLEAN NOT NULL,
    "title" VARCHAR(200),

    CONSTRAINT "forumthread_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gender" (
    "id" UUID NOT NULL,
    "name" VARCHAR(50),

    CONSTRAINT "gender_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "group" (
    "id" UUID NOT NULL,
    "startdatetime" TIMESTAMP(6) NOT NULL,
    "enddatetime" TIMESTAMP(6),
    "duration" DECIMAL(18,0) NOT NULL,
    "wins" INTEGER NOT NULL,
    "losses" INTEGER NOT NULL,
    "runtimes" INTEGER NOT NULL,

    CONSTRAINT "group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "item" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255),
    "itemtypeid" UUID NOT NULL,
    "characterlevel" INTEGER NOT NULL,
    "flavortext" VARCHAR(3000),
    "description" TEXT,
    "healing" INTEGER NOT NULL,
    "armor" INTEGER NOT NULL,
    "attack" INTEGER NOT NULL,
    "attackkeyword" VARCHAR(25),
    "damage" INTEGER NOT NULL,
    "damagevariance" DOUBLE PRECISION NOT NULL,
    "hitscript" VARCHAR(100),
    "critscript" VARCHAR(100),
    "missscript" VARCHAR(100),
    "defense" INTEGER NOT NULL,
    "defensekeyword" VARCHAR(50),
    "defendscript" VARCHAR(100),
    "isdeleted" BOOLEAN NOT NULL,
    "imageid" UUID,
    "imagebackgroundcolor" VARCHAR(10),
    "notes" VARCHAR(3000),
    "racerestrictiontype" INTEGER NOT NULL,
    "raceid" UUID,
    "careerrestrictiontype" INTEGER NOT NULL,
    "careerid" UUID,
    "notrade" BOOLEAN NOT NULL,
    "featid" UUID,
    "notradeafterequip" BOOLEAN NOT NULL,
    "isvisibleininventory" BOOLEAN NOT NULL,

    CONSTRAINT "item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "itemslot" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255),

    CONSTRAINT "itemslot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "itemtype" (
    "id" UUID NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "isdeleted" BOOLEAN NOT NULL,

    CONSTRAINT "itemtype_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "race" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "isdeleted" BOOLEAN NOT NULL,
    "itemid1" UUID,
    "itemid2" UUID,
    "skillid1" UUID,
    "skillid2" UUID,
    "featid1" UUID,
    "featid2" UUID,

    CONSTRAINT "race_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "runtime" (
    "id" UUID NOT NULL,
    "time" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "runtime_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "skill" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "learningscript" VARCHAR NOT NULL,
    "gameid" INTEGER NOT NULL,
    "isdeleted" BOOLEAN NOT NULL,
    "careerid" UUID,
    "description" VARCHAR(255),

    CONSTRAINT "skill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "useritem" (
    "id" UUID NOT NULL,
    "userid" UUID NOT NULL,
    "customitemid" UUID NOT NULL,
    "characterid" UUID,
    "itemslotid" UUID,
    "itemslotvariation" INTEGER,

    CONSTRAINT "useritem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "adventurechecktype" (
    "id" UUID NOT NULL,
    "name" VARCHAR(50) NOT NULL,

    CONSTRAINT "adventurechecktype_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "careeradventure" (
    "id" UUID NOT NULL,
    "careerid" UUID NOT NULL,
    "adventureid" UUID NOT NULL,

    CONSTRAINT "careeradventure_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "characterforhire" (
    "id" UUID NOT NULL,
    "userid" UUID NOT NULL,
    "careerraceid" UUID NOT NULL,
    "gender" INTEGER NOT NULL,
    "expirationdate" TIMESTAMP(6) NOT NULL,
    "ishired" BOOLEAN NOT NULL,

    CONSTRAINT "characterforhire_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "characterlevel" (
    "id" UUID NOT NULL,
    "level" INTEGER NOT NULL,
    "maxexperience" INTEGER NOT NULL,

    CONSTRAINT "characterlevel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "effectdurationtype" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255),

    CONSTRAINT "effectdurationtype_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "effectskillbonus" (
    "id" UUID NOT NULL,
    "effectid" UUID NOT NULL,
    "skillid" UUID NOT NULL,
    "bonus" INTEGER NOT NULL,

    CONSTRAINT "effectskillbonus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "effectspecialmechanic" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255),

    CONSTRAINT "effectspecialmechanic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "effectspecialmechaniccombo" (
    "id" UUID NOT NULL,
    "effectid" UUID NOT NULL,
    "effectspecialmechanicid" UUID NOT NULL,

    CONSTRAINT "effectspecialmechaniccombo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "featcastmode" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255),

    CONSTRAINT "featcastmode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "featreactiveeventinitiator" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255),

    CONSTRAINT "featreactiveeventinitiator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "featspecialmechanic" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255),

    CONSTRAINT "featspecialmechanic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "feattargettype" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255),

    CONSTRAINT "feattargettype_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fighttargettype" (
    "id" UUID NOT NULL,
    "name" VARCHAR(50) NOT NULL,

    CONSTRAINT "fighttargettype_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "image" (
    "id" UUID NOT NULL,
    "imagecategoryid" UUID NOT NULL,
    "filename" VARCHAR(50) NOT NULL,
    "isdeleted" BOOLEAN NOT NULL,
    "raceid" UUID,
    "careerid" UUID,
    "genderid" UUID,
    "gender" INTEGER,

    CONSTRAINT "image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "imagecategory" (
    "id" UUID NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "isdeleted" BOOLEAN NOT NULL,

    CONSTRAINT "imagecategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "itemequippableinslot" (
    "id" UUID NOT NULL,
    "itemid" UUID NOT NULL,
    "itemslotid" UUID NOT NULL,

    CONSTRAINT "itemequippableinslot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "itemskillbonus" (
    "id" UUID NOT NULL,
    "itemid" UUID NOT NULL,
    "skillid" UUID NOT NULL,
    "bonus" INTEGER NOT NULL,

    CONSTRAINT "itemskillbonus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "phrase" (
    "id" UUID NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "isdeleted" BOOLEAN NOT NULL,

    CONSTRAINT "phrase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "phrasevariation" (
    "id" UUID NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "phraseid" UUID NOT NULL,

    CONSTRAINT "phrasevariation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "phrasevariationterm" (
    "id" UUID NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "phrasevariationid" UUID,
    "phraseid" UUID NOT NULL,

    CONSTRAINT "phrasevariationterm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "raceadventure" (
    "id" UUID NOT NULL,
    "raceid" UUID NOT NULL,
    "adventureid" UUID NOT NULL,

    CONSTRAINT "raceadventure_pkey" PRIMARY KEY ("id")
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
ALTER TABLE "activity" ADD CONSTRAINT "activity_careerid_fkey" FOREIGN KEY ("careerid") REFERENCES "career"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activity" ADD CONSTRAINT "activity_raceid_fkey" FOREIGN KEY ("raceid") REFERENCES "race"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activity" ADD CONSTRAINT "activity_skillid_fkey" FOREIGN KEY ("skillid") REFERENCES "skill"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activity" ADD CONSTRAINT "activity_imageid_fkey" FOREIGN KEY ("imageid") REFERENCES "image"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activityresult" ADD CONSTRAINT "activityresult_characterid_fkey" FOREIGN KEY ("characterid") REFERENCES "character"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activityresult" ADD CONSTRAINT "activityresult_customitemid1_fkey" FOREIGN KEY ("customitemid1") REFERENCES "customitem"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activityresult" ADD CONSTRAINT "activityresult_customitemid2_fkey" FOREIGN KEY ("customitemid2") REFERENCES "customitem"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activityresult" ADD CONSTRAINT "activityresult_featid_fkey" FOREIGN KEY ("featid") REFERENCES "feat"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activityresult" ADD CONSTRAINT "activityresult_skillid_fkey" FOREIGN KEY ("skillid") REFERENCES "skill"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "adventure" ADD CONSTRAINT "adventure_careeridfightcheck_fkey" FOREIGN KEY ("careeridfightcheck") REFERENCES "career"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "adventure" ADD CONSTRAINT "adventure_featidreward_fkey" FOREIGN KEY ("featidreward") REFERENCES "feat"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "adventure" ADD CONSTRAINT "adventure_itemidrequired_fkey" FOREIGN KEY ("itemidrequired") REFERENCES "item"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "adventure" ADD CONSTRAINT "adventure_itemidreward_fkey" FOREIGN KEY ("itemidreward") REFERENCES "item"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "adventure" ADD CONSTRAINT "adventure_itemtypeiddrop_fkey" FOREIGN KEY ("itemtypeiddrop") REFERENCES "itemtype"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "adventure" ADD CONSTRAINT "adventure_raceidfightcheck_fkey" FOREIGN KEY ("raceidfightcheck") REFERENCES "race"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "adventure" ADD CONSTRAINT "adventure_skillidcheck_fkey" FOREIGN KEY ("skillidcheck") REFERENCES "skill"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "adventure" ADD CONSTRAINT "adventure_adventurechecktypeid_fkey" FOREIGN KEY ("adventurechecktypeid") REFERENCES "adventurechecktype"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "adventure" ADD CONSTRAINT "adventure_fighttargettypeidcheck_fkey" FOREIGN KEY ("fighttargettypeidcheck") REFERENCES "fighttargettype"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "adventure" ADD CONSTRAINT "adventure_imageidmaskfightcheck_fkey" FOREIGN KEY ("imageidmaskfightcheck") REFERENCES "image"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "battlepool" ADD CONSTRAINT "battlepool_characterid_fkey" FOREIGN KEY ("characterid") REFERENCES "character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "battlepool" ADD CONSTRAINT "battlepool_groupid_fkey" FOREIGN KEY ("groupid") REFERENCES "group"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "career" ADD CONSTRAINT "career_featid1_fkey" FOREIGN KEY ("featid1") REFERENCES "feat"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "career" ADD CONSTRAINT "career_featid2_fkey" FOREIGN KEY ("featid2") REFERENCES "feat"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "career" ADD CONSTRAINT "career_itemid1_fkey" FOREIGN KEY ("itemid1") REFERENCES "item"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "career" ADD CONSTRAINT "career_itemid2_fkey" FOREIGN KEY ("itemid2") REFERENCES "item"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "career" ADD CONSTRAINT "career_skillid1_fkey" FOREIGN KEY ("skillid1") REFERENCES "skill"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "career" ADD CONSTRAINT "career_skillid2_fkey" FOREIGN KEY ("skillid2") REFERENCES "skill"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "careerrace" ADD CONSTRAINT "careerrace_careerid_fkey" FOREIGN KEY ("careerid") REFERENCES "career"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "careerrace" ADD CONSTRAINT "careerrace_raceid_fkey" FOREIGN KEY ("raceid") REFERENCES "race"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "character" ADD CONSTRAINT "character_activityid_fkey" FOREIGN KEY ("activityid") REFERENCES "activity"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "character" ADD CONSTRAINT "character_careerid_fkey" FOREIGN KEY ("careerid") REFERENCES "career"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "character" ADD CONSTRAINT "character_raceid_fkey" FOREIGN KEY ("raceid") REFERENCES "race"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "character" ADD CONSTRAINT "character_levelid_fkey" FOREIGN KEY ("levelid") REFERENCES "characterlevel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "character" ADD CONSTRAINT "character_imageid_fkey" FOREIGN KEY ("imageid") REFERENCES "image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "characterfeat" ADD CONSTRAINT "characterfeat_characterid_fkey" FOREIGN KEY ("characterid") REFERENCES "character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "characterfeat" ADD CONSTRAINT "characterfeat_featid_fkey" FOREIGN KEY ("featid") REFERENCES "feat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "charactergroup" ADD CONSTRAINT "charactergroup_characterid_fkey" FOREIGN KEY ("characterid") REFERENCES "character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "charactergroup" ADD CONSTRAINT "charactergroup_groupid_fkey" FOREIGN KEY ("groupid") REFERENCES "group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "characterskill" ADD CONSTRAINT "characterskill_characterid_fkey" FOREIGN KEY ("characterid") REFERENCES "character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "characterskill" ADD CONSTRAINT "characterskill_skillid_fkey" FOREIGN KEY ("skillid") REFERENCES "skill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customitem" ADD CONSTRAINT "customitem_itemid_fkey" FOREIGN KEY ("itemid") REFERENCES "item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "effect" ADD CONSTRAINT "effect_effectdurationtypeid_fkey" FOREIGN KEY ("effectdurationtypeid") REFERENCES "effectdurationtype"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feat" ADD CONSTRAINT "feat_careerid_fkey" FOREIGN KEY ("careerid") REFERENCES "career"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feat" ADD CONSTRAINT "feat_careeridtarget1_fkey" FOREIGN KEY ("careeridtarget1") REFERENCES "career"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feat" ADD CONSTRAINT "feat_careeridtarget2_fkey" FOREIGN KEY ("careeridtarget2") REFERENCES "career"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feat" ADD CONSTRAINT "feat_effectidtarget1_fkey" FOREIGN KEY ("effectidtarget1") REFERENCES "effect"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feat" ADD CONSTRAINT "feat_effectidtarget2_fkey" FOREIGN KEY ("effectidtarget2") REFERENCES "effect"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feat" ADD CONSTRAINT "feat_raceidtarget1_fkey" FOREIGN KEY ("raceidtarget1") REFERENCES "race"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feat" ADD CONSTRAINT "feat_raceidtarget2_fkey" FOREIGN KEY ("raceidtarget2") REFERENCES "race"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feat" ADD CONSTRAINT "feat_featcastmodeid_fkey" FOREIGN KEY ("featcastmodeid") REFERENCES "featcastmode"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feat" ADD CONSTRAINT "feat_featreactiveeventinitiatorid_fkey" FOREIGN KEY ("featreactiveeventinitiatorid") REFERENCES "featreactiveeventinitiator"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feat" ADD CONSTRAINT "feat_featspecialmechanicid_fkey" FOREIGN KEY ("featspecialmechanicid") REFERENCES "featspecialmechanic"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feat" ADD CONSTRAINT "feat_feattargettypeidtarget1_fkey" FOREIGN KEY ("feattargettypeidtarget1") REFERENCES "feattargettype"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feat" ADD CONSTRAINT "feat_feattargettypeidtarget2_fkey" FOREIGN KEY ("feattargettypeidtarget2") REFERENCES "feattargettype"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "forumpost" ADD CONSTRAINT "forumpost_forumthreadid_fkey" FOREIGN KEY ("forumthreadid") REFERENCES "forumthread"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "forumthread" ADD CONSTRAINT "forumthread_forumcategoryid_fkey" FOREIGN KEY ("forumcategoryid") REFERENCES "forumcategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item" ADD CONSTRAINT "item_careerid_fkey" FOREIGN KEY ("careerid") REFERENCES "career"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item" ADD CONSTRAINT "item_featid_fkey" FOREIGN KEY ("featid") REFERENCES "feat"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item" ADD CONSTRAINT "item_itemtypeid_fkey" FOREIGN KEY ("itemtypeid") REFERENCES "itemtype"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item" ADD CONSTRAINT "item_imageid_fkey" FOREIGN KEY ("imageid") REFERENCES "image"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "race" ADD CONSTRAINT "race_featid1_fkey" FOREIGN KEY ("featid1") REFERENCES "feat"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "race" ADD CONSTRAINT "race_featid2_fkey" FOREIGN KEY ("featid2") REFERENCES "feat"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "race" ADD CONSTRAINT "race_itemid1_fkey" FOREIGN KEY ("itemid1") REFERENCES "item"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "race" ADD CONSTRAINT "race_itemid2_fkey" FOREIGN KEY ("itemid2") REFERENCES "item"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "race" ADD CONSTRAINT "race_skillid1_fkey" FOREIGN KEY ("skillid1") REFERENCES "skill"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "race" ADD CONSTRAINT "race_skillid2_fkey" FOREIGN KEY ("skillid2") REFERENCES "skill"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "skill" ADD CONSTRAINT "skill_careerid_fkey" FOREIGN KEY ("careerid") REFERENCES "career"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "useritem" ADD CONSTRAINT "useritem_characterid_fkey" FOREIGN KEY ("characterid") REFERENCES "character"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "useritem" ADD CONSTRAINT "useritem_customitemid_fkey" FOREIGN KEY ("customitemid") REFERENCES "customitem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "useritem" ADD CONSTRAINT "useritem_itemslotid_fkey" FOREIGN KEY ("itemslotid") REFERENCES "itemslot"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "careeradventure" ADD CONSTRAINT "careeradventure_adventureid_fkey" FOREIGN KEY ("adventureid") REFERENCES "adventure"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "careeradventure" ADD CONSTRAINT "careeradventure_careerid_fkey" FOREIGN KEY ("careerid") REFERENCES "career"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "characterforhire" ADD CONSTRAINT "characterforhire_careerraceid_fkey" FOREIGN KEY ("careerraceid") REFERENCES "careerrace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "effectskillbonus" ADD CONSTRAINT "effectskillbonus_effectid_fkey" FOREIGN KEY ("effectid") REFERENCES "effect"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "effectskillbonus" ADD CONSTRAINT "effectskillbonus_skillid_fkey" FOREIGN KEY ("skillid") REFERENCES "skill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "effectspecialmechaniccombo" ADD CONSTRAINT "effectspecialmechaniccombo_effectid_fkey" FOREIGN KEY ("effectid") REFERENCES "effect"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "effectspecialmechaniccombo" ADD CONSTRAINT "effectspecialmechaniccombo_effectspecialmechanicid_fkey" FOREIGN KEY ("effectspecialmechanicid") REFERENCES "effectspecialmechanic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "image" ADD CONSTRAINT "image_careerid_fkey" FOREIGN KEY ("careerid") REFERENCES "career"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "image" ADD CONSTRAINT "image_genderid_fkey" FOREIGN KEY ("genderid") REFERENCES "gender"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "image" ADD CONSTRAINT "image_raceid_fkey" FOREIGN KEY ("raceid") REFERENCES "race"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "image" ADD CONSTRAINT "image_imagecategoryid_fkey" FOREIGN KEY ("imagecategoryid") REFERENCES "imagecategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itemequippableinslot" ADD CONSTRAINT "itemequippableinslot_itemid_fkey" FOREIGN KEY ("itemid") REFERENCES "item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itemequippableinslot" ADD CONSTRAINT "itemequippableinslot_itemslotid_fkey" FOREIGN KEY ("itemslotid") REFERENCES "itemslot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itemskillbonus" ADD CONSTRAINT "itemskillbonus_itemid_fkey" FOREIGN KEY ("itemid") REFERENCES "item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itemskillbonus" ADD CONSTRAINT "itemskillbonus_skillid_fkey" FOREIGN KEY ("skillid") REFERENCES "skill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "phrasevariation" ADD CONSTRAINT "phrasevariation_phraseid_fkey" FOREIGN KEY ("phraseid") REFERENCES "phrase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "phrasevariationterm" ADD CONSTRAINT "phrasevariationterm_phraseid_fkey" FOREIGN KEY ("phraseid") REFERENCES "phrase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "phrasevariationterm" ADD CONSTRAINT "phrasevariationterm_phrasevariationid_fkey" FOREIGN KEY ("phrasevariationid") REFERENCES "phrasevariation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "raceadventure" ADD CONSTRAINT "raceadventure_adventureid_fkey" FOREIGN KEY ("adventureid") REFERENCES "adventure"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "raceadventure" ADD CONSTRAINT "raceadventure_raceid_fkey" FOREIGN KEY ("raceid") REFERENCES "race"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
