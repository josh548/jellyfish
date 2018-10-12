const canvas = document.querySelector("canvas") as HTMLCanvasElement;
canvas.width = innerWidth;
canvas.height = innerHeight;

const context = canvas.getContext("2d") as CanvasRenderingContext2D;

const MEDIUM_SKY_BLUE = "#72DDF7";
const VIVID_SKY_BLUE = "#0AD3FF";

function renderScene() {
    const gradient = context.createLinearGradient(
        canvas.width / 2, 0,
        canvas.width / 2, canvas.height,
    );
    gradient.addColorStop(0, MEDIUM_SKY_BLUE);
    gradient.addColorStop(1, VIVID_SKY_BLUE);
    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);
    requestAnimationFrame(renderScene);
}

renderScene();
