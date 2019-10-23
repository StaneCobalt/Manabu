function checkHeight() {
    const background = document.getElementsByClassName("background")[0];
    return document.body.scrollHeight > background.style.height;
}

function resizeBackground() {
    const leftDiv = document.getElementsByClassName("leftDiv")[0];
    const rightDiv = document.getElementsByClassName("rightDiv")[0];

    let newHeight = document.body.scrollHeight + "px";
    leftDiv.style.height = newHeight;
    rightDiv.style.height = newHeight;
}
