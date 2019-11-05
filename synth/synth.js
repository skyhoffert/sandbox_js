// Sky Hoffert
// Last Modified on Nov 4, 2019

const N_KEYS = 1000;

var canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext("2d");

var keys = [];
for (let i = 0; i < N_KEYS; i++) { keys[i] = {"source": null} };

var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function Init() {
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

Init();

document.addEventListener("keydown", function (evt) {
    // TODO: Upon keydown, create the attack/decay curve followed by starting the sustain envelope
    //       this note sustains until the key is released, at which point the release envelope 
    //       begins. Not sure how to begin the sustain after the attach curve starts.
    if (evt.keyCode === 32) { return; }

    if (keys[evt.keyCode].source === null) {
        // Create an empty one-second stereo buffer at the sample rate of the AudioContext
        let myArrayBuffer = audioCtx.createBuffer(2, audioCtx.sampleRate, audioCtx.sampleRate);

        for (let channel = 0; channel < myArrayBuffer.numberOfChannels; channel++) {
        // This gives us the actual array that contains the data
        let nowBuffering = myArrayBuffer.getChannelData(channel);
        let A = 0.1;
        let f = 16.35 * evt.keyCode;
        let type = "sin";
        for (var i = 0; i < myArrayBuffer.length; i++) {
            nowBuffering[i] = 0;
            if (type === "sin") {
                nowBuffering[i] += 2 * Math.sin(2*Math.PI * f * (i/audioCtx.sampleRate)) - 1;
            } else if (type === "saw") {
                nowBuffering[i] += 2 * ((f * (i/audioCtx.sampleRate)) % 1) - 1;
            } else if (type === "sqr") {
                nowBuffering[i] += 2 * (Math.sin(2*Math.PI * f * (i/audioCtx.sampleRate)) > 0 ? 1 : 0) - 1;
            }
            nowBuffering[i] *= A;
        }
        }

        // Get an AudioBufferSourceNode.
        // This is the AudioNode to use when we want to play an AudioBuffer
        let source = audioCtx.createBufferSource();

        // set the buffer in the AudioBufferSourceNode
        source.buffer = myArrayBuffer;
        source.loop = true;

        // connect the AudioBufferSourceNode to the
        // destination so we can hear the sound
        source.connect(audioCtx.destination);

        source.start();

        keys[evt.keyCode].source = source;
    }
}, false);

document.addEventListener("keyup", function (evt) {
    if (evt.keyCode === 32) {
        for (let i = 0; i < N_KEYS; i++) {
            if (keys[i].source !== null) {
                keys[i].source.stop();
                keys[i].source = null;
            }
        }

        return;
    }

    if (keys[evt.keyCode].source !== null) {
        keys[evt.keyCode].source.stop();
        keys[evt.keyCode].source = null;
    }
}, false);
