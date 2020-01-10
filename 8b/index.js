//
// Sky Hoffert
//

// module aliases
var Engine = Matter.Engine,
Render = Matter.Render,
World = Matter.World,
Bodies = Matter.Bodies;

// create an engine
var engine = Engine.create();

// create a renderer
var render = Render.create({
element: document.body,
engine: engine
});

var verts = [];
var nverts = 9;
var hverts = 20;
for (let i = 0; i < nverts; i++) {
    let px = -nverts/2*100 + i*100;
    let py = Math.random()*hverts - hverts/2;
    verts.push({x:px,y:py});
    console.log("px: "+px+", py:"+py);
}
verts.push({x:0,y:200});

// create two boxes and a ground
var boxA = Bodies.rectangle(400, 200, 80, 80);
var boxB = Bodies.polygon(450, 50, 3, 50, {angle:Math.random()*2*Math.PI});
var boxC = Bodies.circle(200, 400, 20, {density:0.004}, 16);
var ground = Bodies.fromVertices(400, 540, verts, {isStatic:true}, false);

Matter.Body.applyForce(boxC, boxC.position, {x:0.04,y:-0.14});

// add all of the bodies to the world
World.add(engine.world, [boxA, boxB, boxC]);
World.add(engine.world, ground);

// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);
