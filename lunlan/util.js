//
// Sky Hoffert
// Utility Functions.
//

function DrawRect(c,lx,ly,w,h) {
    c.beginPath();
    c.rect(lx,ly,w,h);
    c.closePath();
}

function DrawRectCenter(c,x,y,w,h) {
    DrawRect(c,x-w/2,y-h/2,w,h);
}

function DrawPolygon(c,pts,cx,cy) {
    c.beginPath();
    for (let i = 0; i < pts.length; i++) {
        if (i === 0) {
            c.moveTo(pts[i].x + cx, pts[i].y + cy);
        } else {
            c.lineTo(pts[i].x + cx, pts[i].y + cy);
        }
    }
    c.closePath();
}

function DrawAnglePolygon(c,pts,cx,cy,a) {
    c.beginPath();
    for (let i = 0; i < pts.length; i++) {
        if (i === 0) {
            c.moveTo(Math.cos(a+pts[i].a)*pts[i].r + cx, 
            -Math.sin(a+pts[i].a)*pts[i].r + cy);
        } else {
            c.lineTo(Math.cos(a+pts[i].a)*pts[i].r + cx, 
            -Math.sin(a+pts[i].a)*pts[i].r + cy);
        }
    }
    c.closePath();
}
