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
    if (skill !== mySkill1
        && skill !== mySkill2
        && skill !== mySkill3) {
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
    document.getElementById("nameV").textContent = "Name: " + myName;
    document.getElementById("raceV").textContent = "Race: " + myRace;
    document.getElementById("runNumberV").textContent = "Run #" + runNumber;
    document.getElementById("skill1V").textContent = mySkill1;
    document.getElementById("skill2V").textContent = mySkill2;
    document.getElementById("skill3V").textContent = mySkill3;
    document.getElementById("questlineV").textContent = myQuestline;
    document.getElementById("questProgressV").textContent = myQuestsCompleted + " of " + myQuestsTotal + " completed";

    document.getElementById("nameH").textContent = "Name: " + myName;
    document.getElementById("raceH").textContent = "Race: " + myRace;
    document.getElementById("runNumberH").textContent = "Run #" + runNumber;
    document.getElementById("skill1H").textContent = mySkill1;
    document.getElementById("skill2H").textContent = mySkill2;
    document.getElementById("skill3H").textContent = mySkill3;
    document.getElementById("questlineH").textContent = myQuestline;
    document.getElementById("questProgressH").textContent = "(" + myQuestsCompleted + " of " + myQuestsTotal + " completed)";
}

function setQuestCompleted(isIncreasing) {
    if (isIncreasing) {
        myQuestsCompleted += 1;
    } else {
        myQuestsCompleted -= 1;
    }
    document.getElementById("questProgressV").textContent = myQuestsCompleted + " of " + myQuestsTotal + " completed";
    document.getElementById("questProgressH").textContent = "(" + myQuestsCompleted + " of " + myQuestsTotal + " completed)";
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

function changeLayout() {
    if (document.getElementById("radioVertical").checked) {
        document.getElementById("characterVertical").style.display = "";
        document.getElementById("characterHorizontal").style.display = "none";
    } else {
        document.getElementById("characterVertical").style.display = "none";
        document.getElementById("characterHorizontal").style.display = "";
    }
}