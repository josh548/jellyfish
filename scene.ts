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
    const ellipseX = bubble.x + (bubble.radius / 2.5);
    const ellipseY = bubble.y - (bubble.radius / 1.5);
    const ellipseRadiusX = bubble.radius / 5;
    const ellipseRadiusY = bubble.radius / 10;
    const ellipseRotation = Math.PI / 5;
    context.ellipse(ellipseX, ellipseY, ellipseRadiusX, ellipseRadiusY, ellipseRotation, 0, 2 * Math.PI);
    context.fillStyle = "rgba(255, 255, 255, 0.5)";
    context.shadowBlur = 10;
    context.shadowColor = "white";
    context.fill();

    context.beginPath();
    const ellipseX2 = ellipseX + bubble.radius / 4;
    const ellipseY2 = ellipseY + bubble.radius / 4;
    const ellipseRadiusX2 = bubble.radius / 25;
    const ellipseRadiusY2 = bubble.radius / 25;
    const ellipseRotation2 = Math.PI / 4;
    context.ellipse(ellipseX2, ellipseY2, ellipseRadiusX2, ellipseRadiusY2, ellipseRotation2, 0, 2 * Math.PI);
    context.fillStyle = "rgba(255, 255, 255, 0.5)";
    context.shadowBlur = 10;
    context.shadowColor = "white";
    context.fill();
}

const bubbles: Bubble[] = [];
for (let i = 0; i < 10; i++) {
    const bubble: Bubble = {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 100,
    };
    bubbles.push(bubble)
}

function renderScene(): void {
    drawWater();
    for (const bubble of bubbles) {
        drawBubble(bubble);
    }
    requestAnimationFrame(renderScene);
}

renderScene();
