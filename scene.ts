const canvas = document.querySelector("canvas") as HTMLCanvasElement;
canvas.style.width = `${innerWidth}px`;
canvas.style.height = `${innerHeight}px`;
canvas.width = innerWidth / 1.5;
canvas.height = innerHeight / 1.5;

const context = canvas.getContext("2d") as CanvasRenderingContext2D;

const MEDIUM_SKY_BLUE = "#72DDF7";
const VIVID_SKY_BLUE = "#0AD3FF";

interface Bubble {
    x: number;
    y: number;
    radius: number;
}

interface Jellyfish {
    x: number;
    y: number;
    width: number;
}

function drawWater(): void {
    const gradient = context.createLinearGradient(
        canvas.width / 2, 0,
        canvas.width / 2, canvas.height,
    );
    gradient.addColorStop(0, MEDIUM_SKY_BLUE);
    gradient.addColorStop(1, VIVID_SKY_BLUE);
    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);
}

function drawBubble(bubble: Bubble): void {
    context.beginPath();
    context.arc(bubble.x, bubble.y, bubble.radius, 0, 2 * Math.PI);
    context.strokeStyle = "rgba(255, 255, 255, 0.1)";
    context.lineWidth = bubble.radius / 20;
    context.stroke();

    context.beginPath();
    context.arc(bubble.x, bubble.y, bubble.radius, 0, 2 * Math.PI);
    const gradient = context.createLinearGradient(
        bubble.x + Math.cos(Math.PI * 1.75) * bubble.radius, bubble.y + Math.sin(Math.PI * 1.75) * bubble.radius,
        bubble.x + Math.cos(Math.PI * 0.75) * bubble.radius, bubble.y + Math.sin(Math.PI * 0.75) * bubble.radius,
    );
    gradient.addColorStop(0, "rgba(255, 255, 255, 0.5)");
    gradient.addColorStop(1, "rgba(255, 255, 255, 0.1)");
    context.fillStyle = gradient;
    context.fill();

    context.beginPath();
    const biggerEllipseX = bubble.x + (bubble.radius / 2.5);
    const biggerEllipseY = bubble.y - (bubble.radius / 1.5);
    const biggerEllipseRadiusX = bubble.radius / 5;
    const biggerEllipseRadiusY = bubble.radius / 10;
    const biggerEllipseRotation = Math.PI / 5;
    context.ellipse(
        biggerEllipseX, biggerEllipseY,
        biggerEllipseRadiusX, biggerEllipseRadiusY,
        biggerEllipseRotation, 0, 2 * Math.PI,
    );
    context.fillStyle = "rgba(255, 255, 255, 0.5)";
    context.shadowBlur = 10;
    context.shadowColor = "white";
    context.fill();

    context.beginPath();
    const smallerEllipseX = biggerEllipseX + bubble.radius / 4;
    const smallerEllipseY = biggerEllipseY + bubble.radius / 4;
    const smallerEllipseRadiusX = bubble.radius / 25;
    const smallerEllipseRadiusY = bubble.radius / 25;
    const smallerEllipseRotation = Math.PI / 4;
    context.ellipse(
        smallerEllipseX, smallerEllipseY,
        smallerEllipseRadiusX, smallerEllipseRadiusY,
        smallerEllipseRotation, 0, 2 * Math.PI,
    );
    context.fillStyle = "rgba(255, 255, 255, 0.5)";
    context.shadowBlur = 10;
    context.shadowColor = "white";
    context.fill();

    context.shadowBlur = 0;
    context.fillStyle = "white";
}

function drawJellyfish(jellyfish: Jellyfish): void {
    context.fillStyle = "black";
    context.strokeStyle = "black";
    context.lineWidth = Math.max(1, (0.005 * jellyfish.width));

    // draw the body
    context.beginPath();
    context.moveTo(
        jellyfish.x - (jellyfish.width / 2), jellyfish.y - (0.176 * jellyfish.width),
    );
    context.bezierCurveTo(
        jellyfish.x - (0.353 * jellyfish.width), jellyfish.y - (0.706 * jellyfish.width),
        jellyfish.x + (0.353 * jellyfish.width), jellyfish.y - (0.706 * jellyfish.width),
        jellyfish.x + (jellyfish.width / 2), jellyfish.y - (0.176 * jellyfish.width),
    );
    context.bezierCurveTo(
        jellyfish.x + (0.588 * jellyfish.width), jellyfish.y + (0.147 * jellyfish.width),
        jellyfish.x + (0.176 * jellyfish.width), jellyfish.y,
        jellyfish.x, jellyfish.y,
    );
    context.bezierCurveTo(
        jellyfish.x - (0.176 * jellyfish.width), jellyfish.y,
        jellyfish.x - (0.588 * jellyfish.width), jellyfish.y + (0.147 * jellyfish.width),
        jellyfish.x - (jellyfish.width / 2), jellyfish.y - (0.176 * jellyfish.width),
    );
    context.closePath();
    context.stroke();

    // draw the left eye
    context.beginPath();
    context.ellipse(
        jellyfish.x - (0.138 * jellyfish.width), jellyfish.y - (0.118 * jellyfish.width),
        (0.032 * jellyfish.width), (0.025 * jellyfish.width),
        0, 0, Math.PI * 2,
    );
    context.fill();

    // draw the right eye
    context.beginPath();
    context.ellipse(
        jellyfish.x + (0.138 * jellyfish.width), jellyfish.y - (0.118 * jellyfish.width),
        (0.032 * jellyfish.width), (0.025 * jellyfish.width),
        0, 0, Math.PI * 2,
    );
    context.fill();

    // draw the smile
    context.beginPath();
    context.arc(
        jellyfish.x, jellyfish.y - (0.118 * jellyfish.width),
        (0.030 * jellyfish.width), Math.PI / 8, Math.PI - (Math.PI / 8),
    );
    context.stroke();

    // draw the first leg (left to right)
    context.beginPath();
    context.moveTo(
        jellyfish.x - (0.241 * jellyfish.width), jellyfish.y + (0.029 * jellyfish.width),
    );
    context.bezierCurveTo(
        jellyfish.x - (0.218 * jellyfish.width), jellyfish.y + (0.100 * jellyfish.width),
        jellyfish.x - (0.224 * jellyfish.width), jellyfish.y + (0.159 * jellyfish.width),
        jellyfish.x - (0.288 * jellyfish.width), jellyfish.y + (0.159 * jellyfish.width),
    );
    context.bezierCurveTo(
        jellyfish.x - (0.353 * jellyfish.width), jellyfish.y + (0.165 * jellyfish.width),
        jellyfish.x - (0.259 * jellyfish.width), jellyfish.y + (0.106 * jellyfish.width),
        jellyfish.x - (0.306 * jellyfish.width), jellyfish.y + (0.033 * jellyfish.width),
    );
    context.stroke();

    // draw the fourth leg (left to right)
    context.beginPath();
    context.moveTo(
        jellyfish.x + (0.241 * jellyfish.width), jellyfish.y + (0.029 * jellyfish.width),
    );
    context.bezierCurveTo(
        jellyfish.x + (0.218 * jellyfish.width), jellyfish.y + (0.100 * jellyfish.width),
        jellyfish.x + (0.224 * jellyfish.width), jellyfish.y + (0.159 * jellyfish.width),
        jellyfish.x + (0.288 * jellyfish.width), jellyfish.y + (0.159 * jellyfish.width),
    );
    context.bezierCurveTo(
        jellyfish.x + (0.353 * jellyfish.width), jellyfish.y + (0.165 * jellyfish.width),
        jellyfish.x + (0.259 * jellyfish.width), jellyfish.y + (0.106 * jellyfish.width),
        jellyfish.x + (0.306 * jellyfish.width), jellyfish.y + (0.033 * jellyfish.width),
    );
    context.stroke();

    // draw the second leg (left to right)
    context.beginPath();
    context.moveTo(
        jellyfish.x - (0.065 * jellyfish.width), jellyfish.y + (0.004 * jellyfish.width),
    );
    context.bezierCurveTo(
        jellyfish.x - (0.041 * jellyfish.width), jellyfish.y + (0.100 * jellyfish.width),
        jellyfish.x - (0.047 * jellyfish.width), jellyfish.y + (0.159 * jellyfish.width),
        jellyfish.x - (0.112 * jellyfish.width), jellyfish.y + (0.159 * jellyfish.width),
    );
    context.bezierCurveTo(
        jellyfish.x - (0.176 * jellyfish.width), jellyfish.y + (0.165 * jellyfish.width),
        jellyfish.x - (0.082 * jellyfish.width), jellyfish.y + (0.106 * jellyfish.width),
        jellyfish.x - (0.147 * jellyfish.width), jellyfish.y + (0.017 * jellyfish.width),
    );
    context.stroke();

    // draw the third leg (left to right)
    context.beginPath();
    context.moveTo(
        jellyfish.x + (0.065 * jellyfish.width), jellyfish.y + (0.004 * jellyfish.width),
    );
    context.bezierCurveTo(
        jellyfish.x + (0.041 * jellyfish.width), jellyfish.y + (0.100 * jellyfish.width),
        jellyfish.x + (0.047 * jellyfish.width), jellyfish.y + (0.159 * jellyfish.width),
        jellyfish.x + (0.112 * jellyfish.width), jellyfish.y + (0.159 * jellyfish.width),
    );
    context.bezierCurveTo(
        jellyfish.x + (0.176 * jellyfish.width), jellyfish.y + (0.165 * jellyfish.width),
        jellyfish.x + (0.082 * jellyfish.width), jellyfish.y + (0.106 * jellyfish.width),
        jellyfish.x + (0.147 * jellyfish.width), jellyfish.y + (0.017 * jellyfish.width),
    );
    context.stroke();

    // draw the flower
    context.beginPath();
    context.moveTo(
        jellyfish.x - (0.029 * jellyfish.width), jellyfish.y - (0.471 * jellyfish.width),
    );
    context.bezierCurveTo(
        jellyfish.x - (0.059 * jellyfish.width), jellyfish.y - (0.382 * jellyfish.width),
        jellyfish.x + (0.059 * jellyfish.width), jellyfish.y - (0.382 * jellyfish.width),
        jellyfish.x + (0.029 * jellyfish.width), jellyfish.y - (0.471 * jellyfish.width),
    );
    context.bezierCurveTo(
        jellyfish.x + (0.147 * jellyfish.width), jellyfish.y - (0.412 * jellyfish.width),
        jellyfish.x + (0.176 * jellyfish.width), jellyfish.y - (0.529 * jellyfish.width),
        jellyfish.x + (0.029 * jellyfish.width), jellyfish.y - (0.500 * jellyfish.width),
    );
    context.bezierCurveTo(
        jellyfish.x + (0.059 * jellyfish.width), jellyfish.y - (0.559 * jellyfish.width),
        jellyfish.x - (0.059 * jellyfish.width), jellyfish.y - (0.559 * jellyfish.width),
        jellyfish.x - (0.029 * jellyfish.width), jellyfish.y - (0.500 * jellyfish.width),
    );
    context.bezierCurveTo(
        jellyfish.x - (0.147 * jellyfish.width), jellyfish.y - (0.529 * jellyfish.width),
        jellyfish.x - (0.176 * jellyfish.width), jellyfish.y - (0.412 * jellyfish.width),
        jellyfish.x - (0.029 * jellyfish.width), jellyfish.y - (0.471 * jellyfish.width),
    );
    context.closePath();
    context.stroke();
}

const result = context.createImageData(canvas.width, canvas.height);
const yoffset = canvas.width * 4;
const amplitude = 3;
const motionsPerSecond = 1.5;
let angleOffset = 0;
const angleIncrement = (Math.PI * 2 / 60) * motionsPerSecond;

function applyWaveEffect() {
    const source = context.getImageData(0, 0, canvas.width, canvas.height);

    if (angleOffset >= Math.PI * 2) {
        angleOffset = 0;
    }
    angleOffset += angleIncrement;

    for (let y = amplitude; y < canvas.height - amplitude; y++) {
        for (let x = amplitude; x < canvas.width - amplitude; x++) {
            const xs = amplitude * Math.sin((3 * (y / canvas.height) + angleOffset));
            const ys = amplitude * Math.cos((3 * (y / canvas.width) + angleOffset));
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

const bubbles: Bubble[] = [];
for (let i = 0; i < 10; i++) {
    const bubble: Bubble = {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 100,
    };
    bubbles.push(bubble);
}

const soleJellyfish: Jellyfish = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    width: 100,
};

function renderScene(): void {
    drawWater();
    for (const bubble of bubbles) {
        drawBubble(bubble);
    }
    drawJellyfish(soleJellyfish);
    applyWaveEffect();
    requestAnimationFrame(renderScene);
}

renderScene();
