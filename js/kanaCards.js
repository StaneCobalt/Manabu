const romaji = kana["romaji1"];
const katakana = kana["katakana1"];
const hiragana = kana["hiragana1"];
const allKana = katakana.concat(hiragana);
const answers = romaji.concat(romaji);
const container = document.getElementById("card-container");

var cards = [];
var answerKey = [];

function setCards() {
    shuffle();
    displayCards();
}

function shuffle(amount = 9) {
    var size = allKana.length;

    for (let i = 0; i < amount; i++) {
        var random = 0;
        var kanaSelection = "";
        do {
            random = Math.floor(Math.random() * size);
            kanaSelection = allKana[random];
        } while (cards.find((text) => {return text == kanaSelection}));
        cards.push(kanaSelection);
        answerKey.push(answers[random]);
    }
}

function reset() {
    cards = [];
    answerKey = [];
    while (container.firstChild)
		container.removeChild(container.firstChild);
}

function displayCards() {
    cards.forEach((text) => {        
        container.appendChild(makeCard(text));
    });
}

function makeCard(displayText) {
    let card = document.createElement("div");
    card.classList.add("card","kana-card");

    let body = document.createElement("div");
    body.classList.add("card-body");

    let button = document.createElement("p");
    let buttonText = document.createTextNode("Show Answer");

    let h5 = document.createElement("h5");
    h5.classList.add("card-title","hide-text");
    let position = cards.findIndex((text) => { return text == displayText});
    let answer = answerKey[position];
    let answerText = document.createTextNode(answer);

    let p = document.createElement("p");
    p.classList.add("card-text");

    displayText = "0" + displayText.substring(2,7);
	let kanaText = document.createTextNode(String.fromCodePoint(displayText));

    button.appendChild(buttonText);
    h5.appendChild(answerText);
    p.appendChild(kanaText);
    body.appendChild(button);
    body.appendChild(h5);
    body.appendChild(p);
    card.appendChild(body);
    button.addEventListener('click', (e) => {
        e.target.classList.add("hide-text");
        e.target.parentNode.childNodes[1].classList.remove("hide-text");
    });
    return card;
}
