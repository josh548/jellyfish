const canvas = document.querySelector("canvas") as HTMLCanvasElement;
canvas.width = innerWidth;
canvas.height = innerHeight;

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
    const xoff = canvas.width / 2;
    const yoff = canvas.height / 2;

    context.fillStyle = "black";
    context.strokeStyle = "black";
    context.lineWidth = Math.max(1, (0.005 * jellyfish.width));

    // draw the body
    context.beginPath();
    context.moveTo(
        xoff - (jellyfish.width / 2), yoff - (0.176 * jellyfish.width),
    );
    context.bezierCurveTo(
        xoff - (0.353 * jellyfish.width), yoff - (0.706 * jellyfish.width),
        xoff + (0.353 * jellyfish.width), yoff - (0.706 * jellyfish.width),
        xoff + (jellyfish.width / 2), yoff - (0.176 * jellyfish.width),
    );
    context.bezierCurveTo(
        xoff + (0.588 * jellyfish.width), yoff + (0.147 * jellyfish.width),
        xoff + (0.176 * jellyfish.width), yoff,
        xoff, yoff,
    );
    context.bezierCurveTo(
        xoff - (0.176 * jellyfish.width), yoff,
        xoff - (0.588 * jellyfish.width), yoff + (0.147 * jellyfish.width),
        xoff - (jellyfish.width / 2), yoff - (0.176 * jellyfish.width),
    );
    context.closePath();
    context.stroke();

    // draw the left eye
    context.beginPath();
    context.ellipse(
        xoff - (0.138 * jellyfish.width), yoff - (0.118 * jellyfish.width),
        (0.032 * jellyfish.width), (0.025 * jellyfish.width),
        0, 0, Math.PI * 2,
    );
    context.fill();

    // draw the right eye
    context.beginPath();
    context.ellipse(
        xoff + (0.138 * jellyfish.width), yoff - (0.118 * jellyfish.width),
        (0.032 * jellyfish.width), (0.025 * jellyfish.width),
        0, 0, Math.PI * 2,
    );
    context.fill();

    // draw the smile
    context.beginPath();
    context.arc(
        xoff, yoff - (0.118 * jellyfish.width),
        (0.030 * jellyfish.width), Math.PI / 8, Math.PI - (Math.PI / 8),
    );
    context.stroke();

    // draw the first leg (left to right)
    context.beginPath();
    context.moveTo(
        xoff - (0.241 * jellyfish.width), yoff + (0.029 * jellyfish.width),
    );
    context.bezierCurveTo(
        xoff - (0.218 * jellyfish.width), yoff + (0.100 * jellyfish.width),
        xoff - (0.224 * jellyfish.width), yoff + (0.159 * jellyfish.width),
        xoff - (0.288 * jellyfish.width), yoff + (0.159 * jellyfish.width),
    );
    context.bezierCurveTo(
        xoff - (0.353 * jellyfish.width), yoff + (0.165 * jellyfish.width),
        xoff - (0.259 * jellyfish.width), yoff + (0.106 * jellyfish.width),
        xoff - (0.306 * jellyfish.width), yoff + (0.033 * jellyfish.width),
    );
    context.stroke();

    // draw the fourth leg (left to right)
    context.beginPath();
    context.moveTo(
        xoff + (0.241 * jellyfish.width), yoff + (0.029 * jellyfish.width),
    );
    context.bezierCurveTo(
        xoff + (0.218 * jellyfish.width), yoff + (0.100 * jellyfish.width),
        xoff + (0.224 * jellyfish.width), yoff + (0.159 * jellyfish.width),
        xoff + (0.288 * jellyfish.width), yoff + (0.159 * jellyfish.width),
    );
    context.bezierCurveTo(
        xoff + (0.353 * jellyfish.width), yoff + (0.165 * jellyfish.width),
        xoff + (0.259 * jellyfish.width), yoff + (0.106 * jellyfish.width),
        xoff + (0.306 * jellyfish.width), yoff + (0.033 * jellyfish.width),
    );
    context.stroke();

    // draw the second leg (left to right)
    context.beginPath();
    context.moveTo(
        xoff - (0.065 * jellyfish.width), yoff + (0.004 * jellyfish.width),
    );
    context.bezierCurveTo(
        xoff - (0.041 * jellyfish.width), yoff + (0.100 * jellyfish.width),
        xoff - (0.047 * jellyfish.width), yoff + (0.159 * jellyfish.width),
        xoff - (0.112 * jellyfish.width), yoff + (0.159 * jellyfish.width),
    );
    context.bezierCurveTo(
        xoff - (0.176 * jellyfish.width), yoff + (0.165 * jellyfish.width),
        xoff - (0.082 * jellyfish.width), yoff + (0.106 * jellyfish.width),
        xoff - (0.147 * jellyfish.width), yoff + (0.017 * jellyfish.width),
    );
    context.stroke();

    // draw the third leg (left to right)
    context.beginPath();
    context.moveTo(
        xoff + (0.065 * jellyfish.width), yoff + (0.004 * jellyfish.width),
    );
    context.bezierCurveTo(
        xoff + (0.041 * jellyfish.width), yoff + (0.100 * jellyfish.width),
        xoff + (0.047 * jellyfish.width), yoff + (0.159 * jellyfish.width),
        xoff + (0.112 * jellyfish.width), yoff + (0.159 * jellyfish.width),
    );
    context.bezierCurveTo(
        xoff + (0.176 * jellyfish.width), yoff + (0.165 * jellyfish.width),
        xoff + (0.082 * jellyfish.width), yoff + (0.106 * jellyfish.width),
        xoff + (0.147 * jellyfish.width), yoff + (0.017 * jellyfish.width),
    );
    context.stroke();

    // draw the flower
    context.beginPath();
    context.moveTo(
        xoff - (0.029 * jellyfish.width), yoff - (0.471 * jellyfish.width),
    );
    context.bezierCurveTo(
        xoff - (0.059 * jellyfish.width), yoff - (0.382 * jellyfish.width),
        xoff + (0.059 * jellyfish.width), yoff - (0.382 * jellyfish.width),
        xoff + (0.029 * jellyfish.width), yoff - (0.471 * jellyfish.width),
    );
    context.bezierCurveTo(
        xoff + (0.147 * jellyfish.width), yoff - (0.412 * jellyfish.width),
        xoff + (0.176 * jellyfish.width), yoff - (0.529 * jellyfish.width),
        xoff + (0.029 * jellyfish.width), yoff - (0.500 * jellyfish.width),
    );
    context.bezierCurveTo(
        xoff + (0.059 * jellyfish.width), yoff - (0.559 * jellyfish.width),
        xoff - (0.059 * jellyfish.width), yoff - (0.559 * jellyfish.width),
        xoff - (0.029 * jellyfish.width), yoff - (0.500 * jellyfish.width),
    );
    context.bezierCurveTo(
        xoff - (0.147 * jellyfish.width), yoff - (0.529 * jellyfish.width),
        xoff - (0.176 * jellyfish.width), yoff - (0.412 * jellyfish.width),
        xoff - (0.029 * jellyfish.width), yoff - (0.471 * jellyfish.width),
    );
    context.closePath();
    context.stroke();
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
    requestAnimationFrame(renderScene);
}

renderScene();
