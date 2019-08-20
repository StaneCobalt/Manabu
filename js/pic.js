const pathPrefix = "img/japan";

function getRandomPic() {
    const japanPic = document.getElementById("japanPic");
    let rand = Math.floor(Math.random() * 5);
    let file = 'url("' + pathPrefix + String(rand) + '.jpg")';
    japanPic.style.backgroundImage = file;
    japanPic.style.backgroundSize = "contain";
}
