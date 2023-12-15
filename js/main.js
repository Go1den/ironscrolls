let myName = "Name";
let myRace = "TBD";
let mySkill1 = "Skill 1";
let mySkill2 = "Skill 2";
let mySkill3 = "Skill 3";
let myQuestline = "Main Quest";
let runNumber = 0;
let myQuestsCompleted = 0;
let myQuestsTotal = 0;

let races = [
    "Argonian", 
    "Breton", 
    "Dark Elf", 
    "High Elf", 
    "Imperial", 
    "Khajit", 
    "Nord", 
    "Orc", 
    "Redguard", 
    "Wood Elf"
];

let skillTrees = [
    "Illusion", 
    "Conjuration", 
    "Destruction", 
    "Restoration", 
    "Alteration", 
    "Heavy Armor", 
    "Block", 
    "Two-Handed", 
    "One-Handed", 
    "Archery", 
    "Light Armor", 
    "Lockpicking", 
    "Pickpocket", 
    "Speech"
];

let questlines = [
    "Mage Guild",
    "Companions",
    "Thieves Guild",
    "Dark Brotherhood",
    "Civil War"
]

let questAmounts = [
    8,
    6,
    12,
    14,
    5
];

function getRandomRace() {
    return races[Math.floor(Math.random() * races.length)];
}

function getRandomUnassignedSkill() {
    let skill = skillTrees[Math.floor(Math.random() * skillTrees.length)];
    if (skill !== document.getElementById("skill1").textContent
        && skill !== document.getElementById("skill2").textContent
        && skill !== document.getElementById("skill3").textContent) {
        return skill;
    }
    return getRandomUnassignedSkill();
}

function setupQuestline() {
    let idx = Math.floor(Math.random() * questlines.length);
    myQuestline = questlines[idx];
    myQuestsTotal = questAmounts[idx];
}

function resetCharacter() {
    myRace = "TBD";
    runNumber += 1;
    mySkill1 = "";
    mySkill2 = "";
    mySkill3 = "";
    myQuestline = "";
    myQuestsTotal = 0;
}

function generateNewCharacter() {
    if (confirm("End the current run and generate a new character?")) {
        resetCharacter();
        myRace = getRandomRace();
        mySkill1 = getRandomUnassignedSkill();
        mySkill2 = getRandomUnassignedSkill();
        mySkill3 = getRandomUnassignedSkill();
        setupQuestline();
        myQuestsCompleted = 0;
        updateFields();
    }
}

function updateFields() {
    document.getElementById("name").textContent = "Name: " + myName;
    document.getElementById("race").textContent = "Race: " + myRace;
    document.getElementById("runNumber").textContent = "Run #" + runNumber;
    document.getElementById("skill1").textContent = mySkill1;
    document.getElementById("skill2").textContent = mySkill2;
    document.getElementById("skill3").textContent = mySkill3;
    document.getElementById("questline").textContent = myQuestline;
    document.getElementById("questProgress").textContent = myQuestsCompleted + " of " + myQuestsTotal + " completed";
}

function setQuestCompleted(isIncreasing) {
    if (isIncreasing) {
        myQuestsCompleted += 1;
    } else {
        myQuestsCompleted -= 1;
    }
    document.getElementById("questProgress").textContent = myQuestsCompleted + " of " + myQuestsTotal + " completed";
}

function updateName() {
    if (document.getElementById("inputName").value !== "") {
        myName = document.getElementById("inputName").value;
    }
    updateFields();
}

function updateRunNumber() {
    if (document.getElementById("inputRunNumber").value !== "") {
        runNumber = Number(document.getElementById("inputRunNumber").value);
    }
    updateFields();
}