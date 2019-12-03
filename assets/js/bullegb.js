
function drawBubble(ctx, x, y, w, h, radius) {
    var r = x + w;
    var b = y + h;
    ctx.beginPath();
    ctx.fillStyle = "#ff3333";
    ctx.strokeStyle = "#ffecd8";
    ctx.lineWidth = "2";
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + radius / 2, y - 10);
    ctx.lineTo(x + radius * 2, y);
    ctx.lineTo(r - radius, y);
    ctx.quadraticCurveTo(r, y, r, y + radius);
    ctx.lineTo(r, y + h - radius);
    ctx.quadraticCurveTo(r, b, r - radius, b);
    ctx.lineTo(x + radius, b);
    ctx.quadraticCurveTo(x, b, x, b - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.stroke();
    ctx.fill();
}

function drawText(textbulle, x, y) {
    ctx.fillStyle = '#ffecd8';
    ctx.lineWidth = 1;
    ctx.font = '15px arial';
    ctx.fillText(textbulle, x, y);
}