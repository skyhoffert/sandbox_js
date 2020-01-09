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

// create two boxes and a ground
var boxA = Bodies.rectangle(400, 200, 80, 80);
var boxB = Bodies.polygon(450, 50, 3, 50, {angle:Math.random()*2*Math.PI});
var boxC = Bodies.circle(200, 500, 40);
var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });
var pin = Bodies.polygon(400, 540, 3, 40, { isStatic: true, angle:1});

Matter.Body.applyForce(boxC, boxC.position, {x:0.04,y:-0.14});

// add all of the bodies to the world
World.add(engine.world, [boxA, boxB, boxC, ground, pin]);

// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);