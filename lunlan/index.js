//
// Sky Hoffert
// Main code for this game.
//

var width = window.innerWidth;
var height = Math.floor(width * 3/4);
var pi = 3.1415926;
var FPS = 30;
var keys = {a:false,s:false,d:false,w:false};

console.log("(w,h) = ("+width+","+height+")");

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
canvas.width = width;
canvas.height = height;

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

class Lander {
    constructor() {
        this.x = -10;
        this.y = 10;
        this.size = 15;
        this.vx = 0.1;
        this.vy = 0;
        this.angle = 0;
        this.accel = 0.0001;
        this.grav = 0.00002;
        
        this.pts = [
            {a:pi/2,r:this.size},
            {a:pi*5/4,r:this.size},
            {a:-pi/4,r:this.size}
        ];
    }

    Tick(dT) {
        let dx =  this.vx * dT;
        let dy = this.vy * dT;
        this.x += dx;
        this.y += dy;

        if (keys.a) {
            this.angle += 0.1;
        } else if (keys.d) {
            this.angle -= 0.1;
        }

        if (keys[" "]) {
            this.vx += dT * this.accel * Math.cos(pi/2+this.angle);
            this.vy += dT * this.accel * -Math.sin(pi/2+this.angle);
        }

        this.vy += this.grav * dT;
    }

    Draw() {
        context.strokeStyle = "white";
        DrawAnglePolygon(context,this.pts,this.x,this.y,this.angle);
        context.stroke();

        if (keys[" "]) {
            context.strokeStyle = "white";
            DrawRectCenter(context,this.x,this.y,this.size*2,this.size*2);
            context.stroke();
        }
    }
}

var lander = new Lander();

function Tick(dT) {
    context.fillStyle = "black";
    DrawRect(context, 0, 0, width, height);
    context.fill();

    context.strokeStyle = "white";
    DrawPolygon(context,pts,0,0);
    context.stroke();

    lander.Tick(dT);

    lander.Draw();
}

let prevTime = Date.now();

function Update() {
    let now = Date.now();
    let dT = now - prevTime;
    prevTime = now;

    Tick(dT);
}

setInterval(Update, 1000/FPS);

document.addEventListener("keydown", function (evt) {
    keys[evt.key] = true;
}, false);

document.addEventListener("keyup", function (evt) {
    keys[evt.key] = false;
}, false);
