import {
    JELLYFISH_BODY_COLOR,
    JELLYFISH_FLOWER_COLOR,
} from "./settings";

export default class Jellyfish {
    private readonly x: number;
    private readonly y: number;
    private readonly width: number;
    private hue: number = 0;

    constructor(x: number, y: number, width: number) {
        this.x = x;
        this.y = y;
        this.width = width;
    }

    public render(context: CanvasRenderingContext2D): void {
        context.strokeStyle = "black";
        context.lineWidth = Math.max(2, (0.005 * this.width));

        context.fillStyle = JELLYFISH_BODY_COLOR;

        // draw the body
        context.beginPath();
        context.moveTo(
            this.x - (this.width / 2), this.y - (0.176 * this.width),
        );
        context.bezierCurveTo(
            this.x - (0.353 * this.width), this.y - (0.706 * this.width),
            this.x + (0.353 * this.width), this.y - (0.706 * this.width),
            this.x + (this.width / 2), this.y - (0.176 * this.width),
        );
        context.bezierCurveTo(
            this.x + (0.588 * this.width), this.y + (0.147 * this.width),
            this.x + (0.176 * this.width), this.y,
            this.x, this.y,
        );
        context.bezierCurveTo(
            this.x - (0.176 * this.width), this.y,
            this.x - (0.588 * this.width), this.y + (0.147 * this.width),
            this.x - (this.width / 2), this.y - (0.176 * this.width),
        );
        context.closePath();
        context.fill();
        context.stroke();

        // draw the first leg (left to right)
        context.beginPath();
        context.moveTo(
            this.x - (0.241 * this.width), this.y + (0.029 * this.width),
        );
        context.bezierCurveTo(
            this.x - (0.218 * this.width), this.y + (0.100 * this.width),
            this.x - (0.224 * this.width), this.y + (0.159 * this.width),
            this.x - (0.288 * this.width), this.y + (0.159 * this.width),
        );
        context.bezierCurveTo(
            this.x - (0.353 * this.width), this.y + (0.165 * this.width),
            this.x - (0.259 * this.width), this.y + (0.106 * this.width),
            this.x - (0.306 * this.width), this.y + (0.033 * this.width),
        );
        context.fill();
        context.stroke();

        // draw the fourth leg (left to right)
        context.beginPath();
        context.moveTo(
            this.x + (0.241 * this.width), this.y + (0.029 * this.width),
        );
        context.bezierCurveTo(
            this.x + (0.218 * this.width), this.y + (0.100 * this.width),
            this.x + (0.224 * this.width), this.y + (0.159 * this.width),
            this.x + (0.288 * this.width), this.y + (0.159 * this.width),
        );
        context.bezierCurveTo(
            this.x + (0.353 * this.width), this.y + (0.165 * this.width),
            this.x + (0.259 * this.width), this.y + (0.106 * this.width),
            this.x + (0.306 * this.width), this.y + (0.033 * this.width),
        );
        context.fill();
        context.stroke();

        // draw the second leg (left to right)
        context.beginPath();
        context.moveTo(
            this.x - (0.065 * this.width), this.y + (0.004 * this.width),
        );
        context.bezierCurveTo(
            this.x - (0.041 * this.width), this.y + (0.100 * this.width),
            this.x - (0.047 * this.width), this.y + (0.159 * this.width),
            this.x - (0.112 * this.width), this.y + (0.159 * this.width),
        );
        context.bezierCurveTo(
            this.x - (0.176 * this.width), this.y + (0.165 * this.width),
            this.x - (0.082 * this.width), this.y + (0.106 * this.width),
            this.x - (0.147 * this.width), this.y + (0.017 * this.width),
        );
        context.fill();
        context.stroke();

        // draw the third leg (left to right)
        context.beginPath();
        context.moveTo(
            this.x + (0.065 * this.width), this.y + (0.004 * this.width),
        );
        context.bezierCurveTo(
            this.x + (0.041 * this.width), this.y + (0.100 * this.width),
            this.x + (0.047 * this.width), this.y + (0.159 * this.width),
            this.x + (0.112 * this.width), this.y + (0.159 * this.width),
        );
        context.bezierCurveTo(
            this.x + (0.176 * this.width), this.y + (0.165 * this.width),
            this.x + (0.082 * this.width), this.y + (0.106 * this.width),
            this.x + (0.147 * this.width), this.y + (0.017 * this.width),
        );
        context.fill();
        context.stroke();

        // draw the flower
        context.beginPath();
        context.moveTo(
            this.x - (0.029 * this.width), this.y - (0.471 * this.width),
        );
        context.bezierCurveTo(
            this.x - (0.059 * this.width), this.y - (0.382 * this.width),
            this.x + (0.059 * this.width), this.y - (0.382 * this.width),
            this.x + (0.029 * this.width), this.y - (0.471 * this.width),
        );
        context.bezierCurveTo(
            this.x + (0.147 * this.width), this.y - (0.412 * this.width),
            this.x + (0.176 * this.width), this.y - (0.529 * this.width),
            this.x + (0.029 * this.width), this.y - (0.500 * this.width),
        );
        context.bezierCurveTo(
            this.x + (0.059 * this.width), this.y - (0.559 * this.width),
            this.x - (0.059 * this.width), this.y - (0.559 * this.width),
            this.x - (0.029 * this.width), this.y - (0.500 * this.width),
        );
        context.bezierCurveTo(
            this.x - (0.147 * this.width), this.y - (0.529 * this.width),
            this.x - (0.176 * this.width), this.y - (0.412 * this.width),
            this.x - (0.029 * this.width), this.y - (0.471 * this.width),
        );
        context.closePath();
        context.fillStyle = `hsl(${this.hue++}, 100%, 87.5%)`;
        context.fill();
        context.stroke();

        context.fillStyle = "black";
        // draw the left eye
        context.beginPath();
        context.ellipse(
            this.x - (0.138 * this.width), this.y - (0.118 * this.width),
            (0.032 * this.width), (0.025 * this.width),
            0, 0, Math.PI * 2,
        );
        context.fill();

        // draw the right eye
        context.beginPath();
        context.ellipse(
            this.x + (0.138 * this.width), this.y - (0.118 * this.width),
            (0.032 * this.width), (0.025 * this.width),
            0, 0, Math.PI * 2,
        );
        context.fill();

        // draw the smile
        context.beginPath();
        context.arc(
            this.x, this.y - (0.118 * this.width),
            (0.030 * this.width), Math.PI / 8, Math.PI - (Math.PI / 8),
        );
        context.stroke();
    }
}
