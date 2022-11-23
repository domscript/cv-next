export class Button {
  constructor(
    public x: number,
    public y: number,
    public width: number,
    public height: number,
    public el: HTMLElement
  ) {}

  draw(context: CanvasRenderingContext2D) {
    const left = this.x - this.width / 2;
    const top = this.y - this.height;
    const right = this.x + this.width / 2;
    const el = this.el;

    const width = this.width;
    const height = this.height;

    // Button background
    context.fillStyle = "#d0af30";
    context.fillRect(left, top, width, height);

    // Button text
    if (el.textContent) {
      context.font = "15px sans-serif";
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillStyle = "black";
      context.fillText(
        el.textContent.toUpperCase(),
        left + width / 2,
        top + height / 2
      );
    }

    // Define clickable area
    context.beginPath();
    context.rect(left, top, width, height);

    // Draw focus ring, if appropriate
    context.drawFocusIfNeeded(el);
  }
}
