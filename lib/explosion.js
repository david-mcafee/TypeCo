class Explosion {
  constructor(options) {
    this.position = options.position;
    this.radius = options.radius;
    this.game = options.game;
    this.color = options.color;
    this.word = options.word;
    // this.isWrappable = true;

    this.removeFirstLetter = this.removeFirstLetter.bind(this);
  }


  draw(context, newColor) {
    context.fillStyle = newColor || this.color;

    context.beginPath();

    // void ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);
    context.arc(
      this.position[0],
      this.position[1],
      this.radius,
      0,
      2 * Math.PI,
      true
    );

    context.fill();
  }


}

module.exports = Explosion;
