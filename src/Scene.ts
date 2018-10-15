import Bubble from "./Bubble";
import Jellyfish from "./Jellyfish";

const MEDIUM_SKY_BLUE = "#72DDF7";
const VIVID_SKY_BLUE = "#0AD3FF";

export default class Scene {
    private context: CanvasRenderingContext2D;
    private jellyfishes: Jellyfish[];
    private bubbles: Bubble[];

    constructor(context: CanvasRenderingContext2D) {
        this.context = context;
        this.jellyfishes = [];
        this.bubbles = [];
        this.initialize();
    }

    public initialize(): void {
        this.jellyfishes.push(new Jellyfish(this.context.canvas.width / 2, this.context.canvas.height / 2, 100));

        for (let i = 0; i < 10; i++) {
            const bubble = new Bubble(
                Math.random() * this.context.canvas.width,
                Math.random() * this.context.canvas.height,
                Math.random() * 100,
            );
            this.bubbles.push(bubble);
        }
    }

    public render(context: CanvasRenderingContext2D): void {
        this.renderBackground(context);
        for (const bubble of this.bubbles) {
            bubble.render(context);
        }
        for (const jellyfish of this.jellyfishes) {
            jellyfish.render(context);
        }
    }

    private renderBackground(context: CanvasRenderingContext2D): void {
        const gradient = context.createLinearGradient(
            context.canvas.width / 2, 0,
            context.canvas.width / 2, context.canvas.height,
        );
        gradient.addColorStop(0, MEDIUM_SKY_BLUE);
        gradient.addColorStop(1, VIVID_SKY_BLUE);
        context.fillStyle = gradient;
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    }
}
