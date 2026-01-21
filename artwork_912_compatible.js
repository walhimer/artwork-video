// Artwork 912 - Flying Boxes
// Converted to work with simple exhibition template

const ARTWORK_SEED = 303;
const BOX_COUNT = 20;
const TRAVEL_SPEED = 2;
const SECONDS_PER_FULL_ROTATION = 120;
const CAMERA_BOBBLE_PERIOD = 3.0;
const CAMERA_BOBBLE_AMOUNT = 0.02;

const Z_NEAR = -1000;
const Z_FAR = 5000;
const Z_SPAN = Z_FAR - Z_NEAR;

let shapes = [];
let boxColors = [];
let artworkInitialized = false;

function setupArtwork() {
    if (artworkInitialized) return;
    
    // Initialize color sets
    boxColors = [
        [color(0, 100, 100, 80), color(60, 100, 100, 80)],
        [color(180, 100, 100, 80), color(240, 100, 100, 80)],
        [color(300, 100, 100, 80), color(60, 100, 100, 80)]
    ];
    
    // Initialize shapes
    shapes = [];
    const scaleX = 2160 / 1000;
    const scaleY = 3840 / 1000;
    const scaleXY = Math.min(scaleX, scaleY);
    const scaleZ = scaleXY;
    
    for (let j = 0; j < BOX_COUNT; j++) {
        const r1 = hash01(ARTWORK_SEED + j * 1.1);
        const r2 = hash01(ARTWORK_SEED + j * 2.2);
        const r3 = hash01(ARTWORK_SEED + j * 3.3);
        const r4 = hash01(ARTWORK_SEED + j * 4.4);
        const r5 = hash01(ARTWORK_SEED + j * 5.5);
        const r6 = hash01(ARTWORK_SEED + j * 6.6);
        const r7 = hash01(ARTWORK_SEED + j * 7.7);
        
        const w = (500 + r1 * 500) * scaleXY;
        const h = (500 + r2 * 1500) * scaleXY;
        const d = (500 + r3 * 500) * scaleZ;
        const xOffset = (-200 + r4 * 400) * scaleXY;
        const yOffset = (-200 + r5 * 400) * scaleXY;
        const zPosition = (-300 + r6 * 5300) * scaleZ;
        const colorIndex = Math.floor(r7 * boxColors.length);
        
        shapes.push({
            x: xOffset,
            y: yOffset,
            z: zPosition,
            w: w,
            h: h,
            d: d,
            colorIndex: colorIndex,
            fadeOffset: r7 * TWO_PI
        });
    }
    
    artworkInitialized = true;
    console.log('Artwork initialized:', shapes.length, 'boxes');
}

function renderArtwork(t, tSec, frameInLoop) {
    // Initialize on first call
    if (!artworkInitialized) setupArtwork();
    
    // White background
    background(0, 0, 100);
    
    // Calculate z offset
    const zOffset = -frameInLoop * TRAVEL_SPEED;
    
    // Camera bobble
    const bobblePhase = TWO_PI * (tSec / CAMERA_BOBBLE_PERIOD);
    rotateX(sin(bobblePhase) * CAMERA_BOBBLE_AMOUNT);
    
    // Y rotation
    const rotationAngle = TWO_PI * (tSec / SECONDS_PER_FULL_ROTATION);
    rotateY(rotationAngle);
    
    // Lighting
    ambientLight(200);
    directionalLight(255, 255, 255, 1, 1, -1);
    
    // Scale
    const scaleZ = Math.min(2160 / 1000, 3840 / 1000);
    const zNear = Z_NEAR * scaleZ;
    const zSpan = Z_SPAN * scaleZ;
    
    // Draw shapes
    for (let i = 0; i < shapes.length; i++) {
        const shape = shapes[i];
        let apparentZ = shape.z + zOffset;
        apparentZ = ((apparentZ - zNear) % zSpan + zSpan) % zSpan + zNear;
        
        if (apparentZ < zNear) continue;
        
        const fadePhase = TWO_PI * t + shape.fadeOffset;
        const transparency = map(sin(fadePhase * 2), -1, 1, 20, 120);
        
        push();
        translate(shape.x, shape.y, apparentZ);
        
        const colorSet = boxColors[shape.colorIndex];
        const c1 = color(
            hue(colorSet[0]),
            saturation(colorSet[0]),
            brightness(colorSet[0]),
            transparency
        );
        const c2 = color(
            hue(colorSet[1]),
            saturation(colorSet[1]),
            brightness(colorSet[1]),
            transparency
        );
        
        drawSoftGradientBox(shape.w, shape.h, shape.d, c1, c2);
        pop();
    }
}

function drawSoftGradientBox(w, h, d, c1, c2) {
    noStroke();
    
    // Front
    beginShape();
    fill(c1);
    vertex(-w/2, -h/2, d/2);
    fill(c2);
    vertex(w/2, -h/2, d/2);
    vertex(w/2, h/2, d/2);
    vertex(-w/2, h/2, d/2);
    endShape(CLOSE);
    
    // Back
    beginShape();
    fill(c2);
    vertex(-w/2, -h/2, -d/2);
    fill(c1);
    vertex(w/2, -h/2, -d/2);
    vertex(w/2, h/2, -d/2);
    vertex(-w/2, h/2, -d/2);
    endShape(CLOSE);
    
    // Left
    beginShape();
    fill(c1);
    vertex(-w/2, -h/2, d/2);
    vertex(-w/2, h/2, d/2);
    fill(c2);
    vertex(-w/2, h/2, -d/2);
    vertex(-w/2, -h/2, -d/2);
    endShape(CLOSE);
    
    // Right
    beginShape();
    fill(c2);
    vertex(w/2, -h/2, d/2);
    vertex(w/2, h/2, d/2);
    fill(c1);
    vertex(w/2, h/2, -d/2);
    vertex(w/2, -h/2, -d/2);
    endShape(CLOSE);
    
    // Top
    beginShape();
    fill(c1);
    vertex(-w/2, -h/2, d/2);
    fill(c2);
    vertex(w/2, -h/2, d/2);
    vertex(w/2, -h/2, -d/2);
    vertex(-w/2, -h/2, -d/2);
    endShape(CLOSE);
    
    // Bottom
    beginShape();
    fill(c1);
    vertex(-w/2, h/2, d/2);
    fill(c2);
    vertex(w/2, h/2, d/2);
    vertex(w/2, h/2, -d/2);
    vertex(-w/2, h/2, -d/2);
    endShape(CLOSE);
}

function hash01(n) {
    const s = Math.sin(n) * 43758.5453123;
    return s - Math.floor(s);
}