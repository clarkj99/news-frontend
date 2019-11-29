var ctx;
function initImage(event) {
    ctx = document.getElementById('canvas').getContext('2d');
    // Your preview is actually 120x120,
    // but I've stuck with the textual description of
    // your requirements here.
    ctx.canvas.width = 150;
    ctx.canvas.height = 150;
    loadBackground('http://i.stack.imgur.com/PCKEo.png');
}

function loadBackground(path) {
    var img = new Image();
    img.onload = drawBackground;
    img.src = path;
}

function drawBackground(event) {
    var img = event.target;
    var imgSize = Math.min(img.width, img.height);
    // The following two lines yield a central based cropping.
    // They can both be amended to be 0, if you wish it to be
    // a left based cropped image.
    var left = (img.width - imgSize) / 2;
    var top = (img.height - imgSize) / 2;
    //var left = 0; // If you wish left based cropping instead.
    //var top = 0; // If you wish left based cropping instead.
    ctx.drawImage(event.target, left, top, imgSize, imgSize, 0, 0, ctx.canvas.width, ctx.canvas.height);
}

window.addEventListener('load', initImage, false);