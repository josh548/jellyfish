import Scene from "./Scene";
import {
    FRAMES_BETWEEN_BUBBLES,
    WAVE_AMPLITUDE,
    WAVE_BOUNCE_FACTOR,
    WAVES_PER_SECOND,
    X_SCALE,
    Y_SCALE,
} from "./settings";

const canvas = document.querySelector("canvas") as HTMLCanvasElement;
canvas.style.width = `${innerWidth}px`;
canvas.style.height = `${innerHeight}px`;
canvas.width = Math.floor(innerWidth * X_SCALE);
canvas.height = Math.floor(innerHeight * Y_SCALE);
const context = canvas.getContext("2d") as CanvasRenderingContext2D;

const result = context.createImageData(canvas.width, canvas.height);
const yoffset = canvas.width * 4;
let angleOffset = 0;
const angleIncrement = (Math.PI * 2 / 60) * WAVES_PER_SECOND;

function applyWaveEffect() {
    const source = context.getImageData(0, 0, canvas.width, canvas.height);

    if (angleOffset >= Math.PI * 2) {
        angleOffset = 0;
    }
    angleOffset += angleIncrement;

    for (let x = WAVE_AMPLITUDE; x < canvas.width - WAVE_AMPLITUDE; x++) {
        for (let y = WAVE_AMPLITUDE; y < canvas.height - WAVE_AMPLITUDE; y++) {
            const xs = WAVE_AMPLITUDE * Math.sin((WAVE_BOUNCE_FACTOR * (x / canvas.height) + angleOffset));
            const ys = WAVE_AMPLITUDE * Math.cos((WAVE_BOUNCE_FACTOR * (y / canvas.width) + angleOffset));
            const dest = y * yoffset + x * 4;
            const src = (y + Math.round(ys)) * yoffset + (x + Math.round(xs)) * 4;
            result.data[dest] = source.data[src];
            result.data[dest + 1] = source.data[src + 1];
            result.data[dest + 2] = source.data[src + 2];
            result.data[dest + 3] = source.data[src + 3];
        }
    }
    context.putImageData(result, 0, 0);
}

canvas.addEventListener("click", (event: MouseEvent) => {
    const bubbleX = event.offsetX * X_SCALE;
    const bubbleY = event.offsetY * Y_SCALE;
    scene.addBubbleAtPoint(bubbleX, bubbleY);
});

let currentFrame = 0;
const scene = new Scene(context);
function renderScene(): void {
    if (currentFrame % FRAMES_BETWEEN_BUBBLES === 0) {
        scene.addRandomBubble();
    }
    scene.render(context);
    applyWaveEffect();
    currentFrame++;
    requestAnimationFrame(renderScene);
}
renderScene();
