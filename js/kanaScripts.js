const display = document.getElementById("display");

function addKana(kana){
    display.innerHTML += kana;
}

function clearKana(){
    display.innerHTML = '';
}

function copyKana(){
    display.select();
    document.execCommand("copy");
}
