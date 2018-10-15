import Scene from "./Scene";

const canvas = document.querySelector("canvas") as HTMLCanvasElement;
canvas.style.width = `${innerWidth}px`;
canvas.style.height = `${innerHeight}px`;
canvas.width = Math.round(innerWidth * (2 / 3));
canvas.height = Math.round(innerHeight * (2 / 3));
const context = canvas.getContext("2d") as CanvasRenderingContext2D;

const result = context.createImageData(canvas.width, canvas.height);
const yoffset = canvas.width * 4;
const amplitude = 5;
const motionsPerSecond = 2;
let angleOffset = 0;
const angleIncrement = (Math.PI * 2 / 60) * motionsPerSecond;
const bounceFactor = 3;

function applyWaveEffect() {
    const source = context.getImageData(0, 0, canvas.width, canvas.height);

    if (angleOffset >= Math.PI * 2) {
        angleOffset = 0;
    }
    angleOffset += angleIncrement;

    for (let x = amplitude; x < canvas.width - amplitude; x++) {
        for (let y = amplitude; y < canvas.height - amplitude; y++) {
            const xs = amplitude * Math.sin((bounceFactor * (x / canvas.height) + angleOffset));
            const ys = amplitude * Math.cos((bounceFactor * (y / canvas.width) + angleOffset));
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

const scene = new Scene(context);
function renderScene(): void {
    scene.render(context);
    applyWaveEffect();
    requestAnimationFrame(renderScene);
}
renderScene();
