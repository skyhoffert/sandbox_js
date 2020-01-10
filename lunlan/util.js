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
    DrawRect(x-w/2,y-h/2,w,h);
}

function DrawPolygon(c,pts) {
    c.beginPath();

    for (let i = 0; i < pts.length; i++) {
        if (i === 0) {
            c.moveTo(pts[i].x, pts[i].y);
        } else {
            c.lineTo(pts[i].x, pts[i].y);
        }
    }

    c.closePath();
}
