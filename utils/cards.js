import _ from "lodash";
import fs from "fs";

const cards = ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"];
const types = ["H", "D", "C", "S"];
const fullDeck = cards.reduce(
    (prev, card) => prev.concat(types.map((type) => card + type)),
    []
);
export const insertNewDeck = (id) => {
    const decks = JSON.parse(fs.readFileSync("./pages/api/decks.json"));
    decks[id] = _.shuffle(fullDeck);
    fs.writeFileSync("./pages/api/decks.json", JSON.stringify(decks));
    console.log("decks from cards.js");
    console.log(decks);
    return decks[id];
};

export const hit = (id, count = 1) => {
    const decks = JSON.parse(fs.readFileSync("./pages/api/decks.json"));

    console.log("decks from cards.js -> hit function");
    console.log(decks);

    if (!decks[id]) {
        throw Error("Not Deck");
    }
    const cards = new Array(count).fill(0).map((_) => decks[id].shift());
    fs.writeFileSync("./pages/api/decks.json", JSON.stringify(decks));
    return cards;
};

export const dealerHit = (id, cards, playerTotal) => {
    let currValue = calcValue(cards);
    const pulledCards = [];

    while (currValue < playerTotal /* bigger than player val */) {
        const [card] = hit(id);
        pulledCards.push(card);
        currValue = calcValue(cards.concat(pulledCards));
    }

    return { cards: pulledCards, value: currValue };
};

export const calcValue = (cards) => {
    let haveAce = false;
    let sum = 0;

    cards.forEach((card) => {
        const value = card[0][0];

        if (parseInt(value)) {
            sum += parseInt(value);
        } else if (value === "A") {
            sum += 1;
            haveAce = true;
        } else if (value === "T") {
            sum += 10;
        } else if (value === "J") {
            sum += 10;
        } else if (value === "Q") {
            sum += 10;
        } else if (value === "K") {
            sum += 10;
        }
        // console.log(card);
        // console.log(value);
        // console.log(sum);
    });
    if (haveAce && sum <= 11) {
        sum += 10;
        return sum;
    }
    return sum;
};
