const display = document.getElementById("display");
const keyboard = document.getElementById("keyboard");
var isRomaji = true;
var isHiragana = true;
var isKatakana = false;
var isShifted = false;

const romaji1 = [
	'a','i','u','e','o',
	'ka','ki','ku','ke','ko',
	'sa','shi','su','se','so',
	'ta','chi','tsu','te','to',
	'na','ni','nu','ne','no',
	'ha','hi','fu','he','ho',
	'ma','mi','mu','me','mo',
	'ya','yu','yo',
	'ra','ri','ru','re','ro',
	'wa','wi','we','wo',
	'n'
];

const romaji2 = [
	'ga','gi','gu','ge','go',
	'za','ji','zu','ze','zo',
	'da','ji','zu','de','do',
	'ba','bi','bu','be','bo',
	'pa','pi','pu','pe','po',
];

const hiragana1 = [
	'&#x3042','&#x3044','&#x3046','&#x3048','&#x304A',
	'&#x304B','&#x304D','&#x304F','&#x3051','&#x3053',
	'&#x3055','&#x3057','&#x3059','&#x305B','&#x305D',
	'&#x305F','&#x3061','&#x3064','&#x3066','&#x3068',
	'&#x306A','&#x306B','&#x306C','&#x306D','&#x306E',
	'&#x306F','&#x3072','&#x3075','&#x3078','&#x307B',
	'&#x307E','&#x307F','&#x3080','&#x3081','&#x3082',
	'&#x3084','&#x3086','&#x3088',
	'&#x3089','&#x308A','&#x308B','&#x308C','&#x308D',
	'&#x308F','&#x3090','&#x3091','&#x3092',
	'&#x3093'
];

const hiragana2 = [];

const katakana1 = [
	'&#x30A2','&#x30A4','&#x30A6','&#x30A8','&#x30AA',
	'&#x30AB','&#x30AD','&#x30AF','&#x30B1','&#x30B3',
	'&#x30B5','&#x30B7','&#x30B9','&#x30BB','&#x30BD',
	'&#x30BF','&#x30C1','&#x30C4','&#x30C6','&#x30C8',
	'&#x30CA','&#x30CB','&#x30CC','&#x30CD','&#x30CE',
	'&#x30CF','&#x30D2','&#x30D5','&#x30D8','&#x30DB',
	'&#x30DE','&#x30DF','&#x30E0','&#x30E1','&#x30E2',
	'&#x30E4','&#x30E6','&#x30E8',
	'&#x30E9','&#x30EA','&#x30EB','&#x30EC','&#x30ED',
	'&#x30EF','&#x30F0','&#x30F1','&#x30F2',
	'&#x30F3'
];

const katakana2 = [];

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
	let keyboardLength = 10;
	let size = kana.length;
	for(let i = 0; i < size; i++) {
		createButton(kana[i], displayText[i]);
		count++;
		if(count % keyboardLength == 0)
			insertBreak();
	}
}

function createButton(kana, displayText) {
	let button = document.createElement("button");
	let textNode = document.createTextNode(displayText);
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
