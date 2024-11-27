let inventory = [];

const storyText = {
    intro: "You wake up in a dark forest. You have no idea how you got here, but you see a path leading north and a strange cave to the west. What will you do?",
    pathNorth: "You walk down the path and find a small village. The villagers seem friendly and offer you a shiny sword. Do you take it?",
    caveWest: "You enter the cave and discover a treasure chest. Inside the chest is a golden key. Do you take the key?",
    swordChoice: "You now have a sword! You feel much safer in this forest. Do you continue your journey?",
    keyChoice: "You now have a golden key! Who knows what it opens? Do you keep it or leave it behind?",
    villageEnd: "You stay in the village and live a peaceful life. You've completed your adventure. Congratulations!",
    caveEnd: "You use the key to open a hidden door in the cave, leading to a magical realm. Your adventure continues!",
    badEnd: "You wander aimlessly in the forest forever, lost and alone. The adventure ends here."
};

let currentState = "intro";

const storyElement = document.getElementById('story');
const choicesElement = document.getElementById('choices');
const inventoryList = document.getElementById('inventory-list');

function updateGame() {
    switch (currentState) {
        case "intro":
            storyElement.textContent = storyText.intro;
            showChoices(["Go North", "Enter Cave"]);
            break;
        case "pathNorth":
            storyElement.textContent = storyText.pathNorth;
            showChoices(["Take the sword", "Continue without the sword"]);
            break;
        case "caveWest":
            storyElement.textContent = storyText.caveWest;
            showChoices(["Take the key", "Leave the key"]);
            break;
        case "swordChoice":
            storyElement.textContent = storyText.swordChoice;
            showChoices(["Continue the journey", "Turn back to the village"]);
            break;
        case "keyChoice":
            storyElement.textContent = storyText.keyChoice;
            showChoices(["Keep the key", "Leave the key"]);
            break;
        case "villageEnd":
            storyElement.textContent = storyText.villageEnd;
            choicesElement.innerHTML = "";
            break;
        case "caveEnd":
            storyElement.textContent = storyText.caveEnd;
            choicesElement.innerHTML = "";
            break;
        case "badEnd":
            storyElement.textContent = storyText.badEnd;
            choicesElement.innerHTML = "";
            break;
        default:
            break;
    }
}

function showChoices(options) {
    choicesElement.innerHTML = "";
    options.forEach(option => {
        let button = document.createElement("button");
        button.textContent = option;
        button.onclick = () => handleChoice(option);
        choicesElement.appendChild(button);
    });
}

function handleChoice(choice) {
    if (currentState === "intro") {
        if (choice === "Go North") {
            currentState = "pathNorth";
        } else if (choice === "Enter Cave") {
            currentState = "caveWest";
        }
    } else if (currentState === "pathNorth") {
        if (choice === "Take the sword") {
            inventory.push("Shiny Sword");
            currentState = "swordChoice";
        } else if (choice === "Continue without the sword") {
            currentState = "swordChoice";
        }
    } else if (currentState === "caveWest") {
        if (choice === "Take the key") {
            inventory.push("Golden Key");
            currentState = "keyChoice";
        } else if (choice === "Leave the key") {
            currentState = "keyChoice";
        }
    } else if (currentState === "swordChoice" || currentState === "keyChoice") {
        if (choice === "Continue the journey") {
            currentState = "villageEnd";
        } else if (choice === "Turn back to the village" || choice === "Leave the key") {
            currentState = "badEnd";
        }
    } else if (currentState === "badEnd" || currentState === "villageEnd" || currentState === "caveEnd") {
        return;
    }

    updateGame();
    updateInventory();
}

function updateInventory() {
    inventoryList.innerHTML = "";
    inventory.forEach(item => {
        let li = document.createElement("li");
        li.textContent = item;
        inventoryList.appendChild(li);
    });
}

// Start the game
updateGame();
