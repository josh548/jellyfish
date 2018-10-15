import Bubble from "./Bubble";
import Jellyfish from "./Jellyfish";
import {
    DARK_BLUE,
    LIGHT_BLUE,
    X_SCALE,
} from "./settings";

export default class Scene {
    private readonly context: CanvasRenderingContext2D;
    private readonly jellyfishes: Jellyfish[];
    private bubbles: Bubble[];

    constructor(context: CanvasRenderingContext2D) {
        this.context = context;
        this.jellyfishes = [];
        this.bubbles = [];
        this.initialize();
    }

    private initialize(): void {
        this.jellyfishes.push(new Jellyfish(this.context.canvas.width / 2, this.context.canvas.height / 2, 100));
    }

    public render(context: CanvasRenderingContext2D): void {
        this.renderBackground(context);
        for (const bubble of this.bubbles) {
            bubble.render(context);
            bubble.update();
        }
        this.bubbles = this.bubbles.filter((bubble: Bubble) => bubble.isVisible());
        for (const jellyfish of this.jellyfishes) {
            jellyfish.render(context);
        }
    }

    public addRandomBubble(): void {
        const radius = Math.random() * (this.context.canvas.width * X_SCALE) * 0.5;
        this.bubbles.push(new Bubble(
            Math.random() * this.context.canvas.width,
            this.context.canvas.height + radius,
            radius,
        ));
    }

    public addBubbleAtPoint(x: number, y: number): void {
        const radius = Math.random() * (this.context.canvas.width * X_SCALE) * 0.5;
        this.bubbles.push(new Bubble(
            x,
            y,
            radius,
        ));
    }

    private renderBackground(context: CanvasRenderingContext2D): void {
        const gradient = context.createLinearGradient(
            context.canvas.width / 2, 0,
            context.canvas.width / 2, context.canvas.height,
        );
        gradient.addColorStop(0, LIGHT_BLUE);
        gradient.addColorStop(1, DARK_BLUE);
        context.fillStyle = gradient;
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    }
}
