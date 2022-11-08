export class Button {
  constructor(x, y, width, height, el) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.el = el;
  }

  draw(context) {
    const left = this.x - this.width / 2;
    const top = this.y - this.height;
    const right = this.x + this.width / 2;
    const el = this.el;

    const width = this.width;
    const height = this.height;

    // Button background
    context.fillStyle = "lightgray";
    context.fillRect(left, top, width, height);

    // Button text
    context.font = "15px sans-serif";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillStyle = "black";
    context.fillText(el.textContent, left + width / 2, top + height / 2);

    // Define clickable area
    context.beginPath();
    context.rect(left, top, width, height);

    // Draw focus ring, if appropriate
    context.drawFocusIfNeeded(el);
  }
}
