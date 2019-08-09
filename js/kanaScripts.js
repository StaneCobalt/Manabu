const display = document.getElementById("display");
const keyboard = document.getElementById("keyboard");
const kanaSwitch = document.getElementById("kanaSwitch");
const shiftSwitch = document.getElementById("shiftSwitch");
var isRomaji = false;
var isHiragana = true;
var isKatakana = false;
var isShifted = false;

const romaji1 = kana["romaji1"];
const romaji2 = kana["romaji2"];
const katakana1 = kana["katakana1"];
const katakana2 = kana["katakana2"];
const hiragana1 = kana["hiragana1"];
const hiragana2 = kana["hiragana2"];

function addKana(kana) {
    display.innerHTML += kana;
}

function clearKana() {
    display.innerHTML = '';
}

function copyKana() {
    display.select();
    document.execCommand("copy");
}

function shift() {
	isShifted = !isShifted;
	refreshKeyboard();
	if(isShifted)
		shiftSwitch.classList.add("btn-success");
	else
		shiftSwitch.classList.remove("btn-success");
}

function switchKana() {
	isHiragana = !isHiragana;
	isKatakana = !isKatakana;
	refreshKeyboard();
	kanaSwitch.innerHTML = !isHiragana ? "Hiragana" : "Katakana";
}

function switchRomaji() {
	isRomaji = !isRomaji;
	refreshKeyboard();
	if(isRomaji)
		romajiSwitch.classList.add("btn-success");
	else
		romajiSwitch.classList.remove("btn-success");
}

function setKeyboardMode() {
	if(isHiragana) {
		if(isShifted && isRomaji)
			createKeyboard(hiragana2, romaji2);
		else if(isRomaji)
			createKeyboard(hiragana1, romaji1);
		else if(isShifted)
			createKeyboard(hiragana2, hiragana2);
		else
			createKeyboard(hiragana1, hiragana1);
	} else if(isKatakana) {
		if(isShifted && isRomaji)
			createKeyboard(katakana2, romaji2);
		else if(isRomaji)
			createKeyboard(katakana1, romaji1);
		else if(isShifted)
			createKeyboard(katakana2, katakana2);
		else
			createKeyboard(katakana1, katakana1);
	}
}

function createKeyboard(kana, displayText) {
	let count = 0;
	let size = kana.length;
	let keyBoardLength = getKeyboardLength();
	for(let i = 0; i < size; i++) {
		createButton(kana[i], displayText[i]);
		count++;
		if(count % keyBoardLength == 0)
			insertBreak();
	}
}

function getKeyboardLength() {
	let keyBoardLength = 12;
	if(window.innerWidth < 600)
		keyBoardLength = 4;
	else if(window.innerWidth < 800)
		keyBoardLength = 6;
	else if(window.innerWidth < 1000)
		keyBoardLength = 10;
	return keyBoardLength;
}

function createButton(kana, displayText) {
	var textNode;
	if(displayText[0] == "&") {
		displayText = "0" + displayText.substring(2,7);
		textNode = document.createTextNode(String.fromCodePoint(displayText));
	} else {
		textNode = document.createTextNode(displayText);
	}
	let button = document.createElement("button");
	button.onclick = function() {
		display.innerHTML += kana;
	}
	button.classList.add("btn-kana");
	button.appendChild(textNode);
	keyboard.appendChild(button);
}

function insertBreak() {
	let br = document.createElement("br");
	keyboard.appendChild(br);
}

function clearKeyboard() {
	while(keyboard.firstChild)
		keyboard.removeChild(keyboard.firstChild);
}

function refreshKeyboard() {
	clearTimeout(refreshSize);
	clearKeyboard();
	setKeyboardMode();
}

var refreshSize = setTimeout(function() {
						clearKeyboard();
						setKeyboardMode();	
					}, 1000);

const debounce = (func, wait, immediate) => {
    var timeout;
    return () => {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

$(document).ready(function() {
	setKeyboardMode();
});

window.addEventListener('resize', refreshSize);
