//
// Sky Hoffert
// Main code for this game.
//

var width = window.innerWidth;
var height = Math.floor(width * 3/4);
var pi = 3.1415926;

console.log("(w,h) = ("+width+","+height+")");

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
canvas.width = width;
canvas.height = height;

context.fillStyle = "black";
DrawRect(context, 0, 0, width, height);
context.fill();

// Generating the landscape.
var pts = [{x:-10,y:height*3/4}];
var mindbp = 4;
var maxdbp = 20;
var diffdbp = maxdbp - mindbp;
var yd = 5;
var i = 1;
while (true) {
    let dbp = Math.random() * diffdbp + mindbp;
    let px = pts[i-1].x + dbp;
    let ryv = Math.tan((Math.random() - 0.5) * pi);
    let py = pts[i-1].y + ryv * yd;

    if (py >= height) {
        py -= (10 + (py - height) + Math.random()*10);
    } else if (py < height/2) {
        py += (10 + (height/2 - py) + Math.random()*10);
    }

    pts.push({x:px,y:py});

    i++;

    if (px > width) { break; }
}
// 2 more points to complete the polygon.
pts.push({x:pts[i-1].x,y:pts[i-1].y+height});
pts.push({x:pts[0].x,y:pts[i-1].y+height});

context.strokeStyle = "white";
DrawPolygon(context,pts);
context.stroke();
