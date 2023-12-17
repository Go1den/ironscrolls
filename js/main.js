let myName = "Name";
let myRace = "TBD";
let mySkill1 = "Skill 1";
let mySkill2 = "Skill 2";
let mySkill3 = "Skill 3";
let myQuestline = "Main Quest";
let runNumber = 0;
let myQuestsCompleted = 0;
let myQuestsTotal = 0;
let myQuestIndexArray = [0, 1, 2, 3, 4];
let allQuestsCompleted = false;
let visitedLocations = [];
let currentLocation = "None";
let currentCoinFlips = 0;
let coinFlipThreshold = 5;

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

function updateFlips() {
    coinFlipThreshold = document.getElementById("inputFlips").value;
    updateFlipCount();
}

function updateFlipCount() {
    document.getElementById("coinFlips").textContent = "Coin Flips to Next Location: " + currentCoinFlips + " of " + coinFlipThreshold;
}

function getRandomUnvisitedLocation() {
    let allLocations = caves.concat(dwarvenRuins, militaryForts, mines, nordicRuins, imperialTowers);
    let index = Math.floor(Math.random() * allLocations.length);
    if (visitedLocations.includes(index)) {
        return getRandomUnvisitedLocation();
    } else {
        visitedLocations.push(index);
        return allLocations[index];
    }
}

function clearLocation() {
    currentLocation = "None";
    setCurrentLocation();
}

function setCurrentLocation() {
    document.getElementById("location").textContent = "Current Location: " + currentLocation;
}

function updateLocation() {
    currentLocation = getRandomUnvisitedLocation();
    setCurrentLocation();
}

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
    myQuestIndexArray = [0, 1, 2, 3, 4]
    myQuestIndexArray = myQuestIndexArray
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)
    getNextQuest();
}

function getNextQuest() {
    idx = myQuestIndexArray.pop();
    if (idx === undefined) {
        allQuestsCompleted = true;
    }
    myQuestline = questlines[idx];
    myQuestsTotal = questAmounts[idx];
    myQuestsCompleted = 0;
    updateFields();
}

function resetCharacter() {
    myRace = "TBD";
    runNumber += 1;
    mySkill1 = "";
    mySkill2 = "";
    mySkill3 = "";
    myQuestline = "";
    myQuestsTotal = 0;
    allQuestsCompleted = false;
    visitedLocations = [];
    currentLocation = "Current Location: None";
    currentCoinFlips = 0;
}

function generateNewCharacter() {
    if (confirm("End the current run and generate a new character?")) {
        resetCharacter();
        myRace = getRandomRace();
        mySkill1 = getRandomUnassignedSkill();
        mySkill2 = getRandomUnassignedSkill();
        mySkill3 = getRandomUnassignedSkill();
        setupQuestline();
        clearLocation();
        updateFlipCount();
    }
}

function updateFields() {
    document.getElementById("nameH").textContent = "Name: " + myName;
    document.getElementById("raceH").textContent = "Race: " + myRace;
    document.getElementById("runNumberH").textContent = "Run #" + runNumber;
    document.getElementById("skill1H").textContent = mySkill1;
    document.getElementById("skill2H").textContent = mySkill2;
    document.getElementById("skill3H").textContent = mySkill3;
    document.getElementById("questlineH").textContent = myQuestline;
    document.getElementById("questProgressH").textContent = "(" + myQuestsCompleted + " of " + myQuestsTotal + " completed)";

    document.getElementById("location").textContent = currentLocation;
    document.getElementById("")
}

function setQuestCompleted(isIncreasing) {
    if (!allQuestsCompleted && isIncreasing) {
        myQuestsCompleted += 1;
        if (myQuestsCompleted >= myQuestsTotal) {
            getNextQuest();
        }
    } else {
        if (!allQuestsCompleted && myQuestsCompleted != 0) {
            myQuestsCompleted -= 1;
        }
    }
    if (allQuestsCompleted) {
        document.getElementById("questProgressH").textContent = "All quests complete!";
    } else {
        document.getElementById("questProgressH").textContent = "(" + myQuestsCompleted + " of " + myQuestsTotal + " completed)";
    }
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

function increaseCoinFlips() {
    currentCoinFlips += 1;
    updateFlipCount();
    if (currentCoinFlips >= coinFlipThreshold) {
        updateLocation();
        currentCoinFlips = 0;
        updateFlipCount();
    }
}

function flipCoin() {
    let coin = document.querySelector(".coin");
    let result = Math.floor(Math.random() * 2);
    coin.style.animation = "none";
    if (result) {
        setTimeout(function() {
            coin.style.animation = "spin-heads 3s forwards";
            setTimeout(function() {
                increaseCoinFlips();
            }, 3200);
        }, 100);

    }
    else {
        setTimeout(function() {
            coin.style.animation = "spin-tails 3s forwards";
        }, 100);
    }
}

function swapBars() {
    let topDiv = document.getElementById("topTable");
    let bottomDiv = document.getElementById("bottomTable");
    let tmpTopHTML = topDiv.innerHTML;
    let tmpBottomHTML = bottomDiv.innerHTML;

    topDiv.innerHTML = tmpBottomHTML;
    bottomDiv.innerHTML = tmpTopHTML;
}