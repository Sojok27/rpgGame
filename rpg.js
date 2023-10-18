const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const monstersNameText = document.querySelector("#monsterName");
const monstersHealthText = document.querySelector("#monsterHealth");

let xp = parseInt(xpText.innerText);
let health = parseInt(healthText.innerText);
let gold = parseInt(goldText.innerText);
let currentWeapon = 0;
let inventory = ['stick'];
let price = 30;
// let prices = [30,60,90,120]; 
// let count = 0;
// let newCount;

// first initialization of butons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

let weapons = [
    {
        name: "sword",
        power: 30
    },
    {
        name: "dagger",
        power: 50
    },
    {
        name: "knuckles",
        power: 70
    },
    {
        name: "spear",
        power: 100
    }
];

const monsters = [
    {
        name: "slime",
        level: 2,
        health: 15
    },
    {
        name: "fanged beast",
        level: 8,
        health: 60
    },
    {
        name: "dragon",
        level: 20,
        health: 300
    }
];

// all route to locations
let locations = [
    {
        name: "Town",
        buttons: ["Go to store", "Go to cave", "Fight Dragon"],
        buttonsFunc: [goStore, goCave, fightDragon],
        text: "Welcome to dungeons and dragons where all choices you make determine your very future."
    },
    {
        name: "Store",
        buttons: ["Go to Weapon store", "Go to Health store", "Go back to Town Square"],
        buttonsFunc: [allWeapon, allHealth, town],
        text: "You are now in the store, available weapons are swords, daggers, knuckles and spears"
    },
    {
        name: "allWeapon1",
        buttons: [btnF, "Sell your Weapon", "Go back to Town Square"],
        // buttons: ["Buy Sword ("+ prices[count] +" gold)", "Sell your Weapon", "Go back to Town Square"],
        buttonsFunc: [beginnerWeapon, sellWeapon, town],
        text: "You are now in the store, available weapons are swords, daggers, knuckles and spears"
    },
    // {
    //     name: "allWeapon2",
    //     buttons: ["Buy Dagger (50 gold)", "Sell your Weapon", "Go back to Town Square"],
    //     buttonsFunc: [amateurWeapon, sellWeapon, town],
    //     text: "You are now in the store, available weapons are swords, daggers, knuckles and spears"

    // },
    // {
    //     name: "allWeapon3",
    //     buttons: ["Buy Knuckles (70 gold)", "Sell your Weapon", "Go back to Town Square"],
    //     buttonsFunc: [proWeapon, sellWeapon, town],
    //     text: "You are now in the store, available weapons are swords, daggers, knuckles and spears"

    // },
    // {
    //     name: "allWeapon4",
    //     buttons: ["Buy Spear (100 gold)", "Sell your Weapon", "Go back to Town Square"],
    //     buttonsFunc: [masterWeapon, sellWeapon, town],
    //     text: "You are now in the store, available weapons are swords, daggers, knuckles and spears"

    // },
    // {
    //     name: "noWeapon",
    //     buttons: ["No Weapon Available", "Sell your Weapon", "Go back to Town Square"],
    //     buttonsFunc: [goStore, sellWeapon, town],
    //     text: "You are now in the store, available weapons are swords, daggers, knuckles and spears"

    // },
    {
        name: "allHealth1",
        buttons: ["Go to Weapon Store", "Buy Small Health Pack (10 gold)", "Go back to Town Square"],
        buttonsFunc: [allWeapon, smallHealth, town],
        text: "You are now in the store, available health packs are small, medium and large"

    },
    {
        name: "allHealth2",
        buttons: ["Go to Weapon Store", "Buy Medium Health Pack (30 gold)", "Go back to Town Square"],
        buttonsFunc: [allWeapon, midHealth, town],
        text: "You are now in the store, available health packs are small, medium and large"

    },
    {
        name: "allHealth3",
        buttons: ["Go to Weapon Store", "Buy Large Health Pack (50 gold)", "Go back to Town Square"],
        buttonsFunc: [allWeapon, highHealth, town],
        text: "You are now in the store, available health packs are small, medium and large"

    },
    {
        name: "noHealth",
        buttons: ["Go to Weapon Store", "No Health Pack Available", "Go back to Town Square"],
        buttonsFunc: [allWeapon, goStore, town],
        text: "You are now in the store, available health packs are small, medium and large"

    },
    {
        name: "cave",
        buttons: ["Fight Slime", "Fight Fanged Beast", "Go back to Town Square"],
        buttonsFunc: [fightSlime, fightBeast, town],
        text: "You entered the cave and see some monsters"
    },
    {
        name: "fight",
        buttons: ["Attack", "Dodge", "Run"],
        buttonsFunc: [attack, dodge, town],
        text: "You are fighting a monster"
    },
    {
        name: "killMonsters",
        buttons: ["Go back to Town Square", "Go back to Town Square", "Surpruse"],
        buttonsFunc: [town, town, easterEgg],
        text: 'The monster  screams "arghhhh!" and dies. You gained experience points and gold.'
    },
    {
        name: "retry",
        buttons: ["RETRY?", "RETRY?", "RETRY?"],
        buttonsFunc: [restart, restart, restart],
        text: 'You died so uhm "Game Over".'
    },
    {
        name: "replay",
        buttons: ["REPLAY?", "REPLAY?", "REPLAY?"],
        buttonsFunc: [restart, restart, restart],
        text: 'The Dragon is dead, "You Won the Game".'
    },
    {
        name: "easterEgg",
        buttons: ["3", "9", "Go to Town"],
        buttonsFunc: [pickThree, pickNine, town],
        text: 'You find a secret hideout. Pick a number above while ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the randoms, you win.'
    }
];

function update(locate) {
    monsterStats.style.display = "none";
    text.innerText = locate.text;
    button1.innerHTML = (typeof locate.buttons[0] == "function" ? locate.buttons[0](price) : locate.buttons[0]);
    // button1.innerText = locate.buttons[0];
    button2.innerText = locate.buttons[1];
    button3.innerText = locate.buttons[2];
    button1.onclick = locate.buttonsFunc[0];
    button2.onclick = locate.buttonsFunc[1];
    button3.onclick = locate.buttonsFunc[2];
    watcher();
}

document.body.onclick = () => { setTimeout(watcher, 2000); };

function btnF(price) {
    // if (price <= 240) {
    return "Buy Weapon (" + `<span class="variable" data-watch="price">${price}</span>` + " gold)";
    // }
    // else {
    //     return "No weapons available";
    // }
}
// functions for updating price

function watcher() {
    elements = document.querySelectorAll("*");
    window.vars = vars = {};
    elements.forEach(e => {
        if (e.hasAttribute("data-watch")) {
            vars[e.getAttribute("data-watch")] = vars[e.getAttribute("data-watch")] ?? [];
            vars[e.getAttribute("data-watch")].push(e);
        }
    });
}
function updater(variable, value) {
    window.vars[variable].forEach(e => {
        e.innerText = value;
    });
    return value;
}

function town() {
    update(locations[0]);
}

function goStore() {
    update(locations[1]);
}

function allWeapon() {
    update(locations[2]);
}

function allHealth() {
    update(locations[3]);
}

function beginnerWeapon() {
    if (!inventory.includes("spear")) {
        if (gold >= price) {
            gold -= price;
            // if (gold >= prices[count]) {
            //     gold -= prices[count];
            // price updater here
            if (price < 240) {
                price = updater("price", price * 2);
            }
            else {
                button1.innerText = "No weapons available";
            }
            // count++;
            currentWeapon++;
            goldText.innerText = gold;
            let newWeapon = weapons[currentWeapon - 1].name;
            inventory.push(newWeapon);
            // update(locations[2]);
            // newCount = count;
            // button1.innerText = "Buy Sword ("+ prices[newCount] +" gold)";
            text.innerText = "You have a new weapon " + newWeapon + ".";
            text.innerText += " In your inventory, you now have: " + inventory + ".";
        }
    }
    else {
        // button1.innerText = "No weapons available";
        text.innerText = "You already bought all weapons in the store";
    }
}

// watcher function called here
watcher();

// function amateurWeapon() {
//     if (gold >= 50) {
//         gold -= 50;
//         currentWeapon++;
//         goldText.innerText = gold;
//         let newWeapon = weapons[currentWeapon - 1].name;
//         inventory.push(newWeapon);
//         update(locations[4]);
//         text.innerText = "You have a new weapon " + newWeapon + ".";
//         text.innerText += " In your inventory, you now have: " + inventory + ".";
//     }
// }
// function proWeapon() {
//     if (gold >= 70) {
//         gold -= 70;
//         currentWeapon++;
//         goldText.innerText = gold;
//         let newWeapon = weapons[currentWeapon - 1].name;
//         inventory.push(newWeapon);
//         update(locations[5]);
//         text.innerText = "You have a new weapon " + newWeapon + ".";
//         text.innerText += " In your inventory, you now have: " + inventory + ".";
//     }
// }
// function masterWeapon() {
//     if (gold >= 100) {
//         gold -= 100;
//         currentWeapon++;
//         goldText.innerText = gold;
//         let newWeapon = weapons[currentWeapon - 1].name;
//         inventory.push(newWeapon);
//         update(locations[6]);
//         text.innerText = "You have a new weapon " + newWeapon + ".";
//         text.innerText += " In your inventory, you now have: " + inventory + ".";
//     }
// }

function smallHealth() {
    if (gold > 10) {
        gold -= 10;
        health += 30;
        goldText.innerText = gold;
        healthText.innerText = health;
        update(locations[4]);
        text.innerText = "Your health is now: " + health + " .";
    }
}
function midHealth() {
    if (gold > 30) {
        gold -= 30;
        health += 60;
        goldText.innerText = gold;
        healthText.innerText = health;
        update(locations[5]);
        text.innerText = "Your health is now: " + health + " .";
    }
}
function highHealth() {
    if (gold > 50) {
        gold -= 50;
        health += 100;
        goldText.innerText = gold;
        healthText.innerText = health;
        update(locations[6]);
        text.innerText = "Your health is now: " + health + " .";
    }
}
function sellWeapon() {
    if (inventory.length > 1) {
        gold += 100;
        goldText.innerText = gold;
        let currentWeapon = inventory.shift();
        text.innerText = "You have sold the " + currentWeapon + " , you now have " + gold + " gold.";
    }
}


function goCave() {
    update(locations[7])
}
function goFight() {
    update(locations[8])
    monsterName = monsters[fighting].name;
    monsterHealth = monsters[fighting].health;
    monsterStats.style.display = "block";
    monstersNameText.innerText = monsterName;
    monstersHealthText.innerText = monsterHealth;
}
function fightSlime() {
    fighting = 0;
    goFight();
}
function fightBeast() {
    fighting = 1;
    goFight();
}
function fightDragon() {
    fighting = 2;
    goFight();
}

function attack() {
    text.innerText = "The " + monsters[fighting].name + " attacks.";
    health -= getMonsterAttack(monsters[fighting].level);
    healthText.innerText = health;
    if (health <= 0) {
        lose();
    }
    else {
        setTimeout(() => {
            if(currentWeapon >= 1){
            text.innerText += "You attack it with your " + weapons[currentWeapon - 1].name + ".";
        }else {
            text.innerText = "You don't have a usable weapon... can you fight with a stick... idiot";
        }
            if (isMonsterHit()) {
                monsterHealth -= weapons[currentWeapon - 1].power + Math.floor(Math.random() * xp) + 1;
                monsterHealth <= 0 ? monstersHealthText.innerText = 0 : monstersHealthText.innerText = monsterHealth;
                if (monsterHealth <= 0) {
                    fighting === 2 ? winGame() : defeatMonster();
                }
            }
            else {
                text.innerText = "You missed";
            }
            if (Math.random() <= .1 && inventory.length !== 1) {
                text.innerText += "Your " + inventory.pop() + " breaks.";
                currentWeapon--;
                text.innerText += "You now have only " + inventory + " in your inventory";
            }
        }, 2000);
    }
}
function isMonsterHit() {
    return Math.random() > .2 || health < 20;
}
function getMonsterAttack(level) {
    let hit = (level * 5) - (Math.floor(Math.random() * xp));
    console.log(hit);
    return hit;
}
function defeatMonster() {
    gold += Math.floor(monsters[fighting].level * 6.7);
    xp += monsters[fighting].level;
    goldText.innerText = gold;
    xpText.innerText = xp;
    setTimeout(() => { update(locations[9]) }, 1000);
}

function dodge() {
    text.innerText = "You dodged an attack from the " + monsters[fighting].name + ".";
}

function lose() {
    update(locations[10]);
}

function restart() {
    xp = 0;
    health = 100;
    gold = 150;
    price = 30;
    currentWeapon = 0;
    inventory = ["stick"];
    goldText.innerText = gold;
    healthText.innerText = health;
    xpText.innerText = xp;
    town();
}

function winGame() {
    update(locations[11]);
}
// I want to add an if statement to the weapon, so that after
// a full purchase of all weapons, the next time you want
// to buy a similar weapon, the if statement will check whether
// that weapon exist in the inventory

function easterEgg() {
    update(locations[12]);
}

function pickThree() {
    pick(3);
}

function pickNine() {
    pick(9);
}

function pick(choice) {
    let selection = [];
    while (selection.length < 10) {
        selection.push(Math.floor(Math.random() * 10));
    }
    text.innerText = "You picked " + choice + ". Here are the selections:";
    for (let i = 0; i < 10; i++) {
        text.innerText += selection[i] + ",";
    }
    if (selection.indexOf(choice) !== -1) {
        text.innerHTML += "Right! You win 100 Gold";
        console.log(gold);
        gold += 100;
        goldText.innerText = gold;
        // setTimeout(()=>{
        //     town();
        // }, 2000)
    }
    else {
        text.innerText += "Wrong! You lost 30 Health";
        health -= 30;
        healthText.innerText = health;
        if (health <= 0) {
            lose();
        }
        // else{
        //     setTimeout(()=>{
        //         town();
        //     }, 2000);
        // }
    }
    setTimeout(()=>{
        town();
    }, 2000)
}