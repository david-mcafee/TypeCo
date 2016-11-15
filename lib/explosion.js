class Explosion {
  constructor(options) {
    this.position = options.position;
    this.radius = options.radius;
    this.game = options.game;
    this.time = options.time;
    this.opacity = .1;
  }


  draw(context) {
    let num1 = Math.random() * 255;
    let num2 = Math.random() * 255;
    let num3 = Math.random() * 255;

    let string = "rgba(" + num1.toString() + ", " + num2.toString() + ", " + num3.toString()+ ", " + this.opacity.toString() + ")";

    console.log(string);
    context.fillStyle = string;

    context.beginPath();

    // void ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);
    context.arc(
      this.position[0],
      this.position[1],
      this.radius += 10,
      0,
      2 * Math.PI,
      true
    );

    context.fill();
  }


}

module.exports = Explosion;
