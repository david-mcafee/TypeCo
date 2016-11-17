
  function wrapText(context, text, x, y, maxWidth, lineHeight) {
    var words = text.split(' ');
    var line = '';

    for(var n = 0; n < words.length; n++) {
      var testLine = line + words[n] + ' ';
      var metrics = context.measureText(testLine);
      var testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        context.fillText(line, x, y);
        line = words[n] + ' ';
        y += lineHeight;
      }
      else {
        line = testLine;
      }
    }
    context.fillText(line, x, y);
  }

  // var canvas = document.getElementById('myCanvas');
  // var context = canvas.getContext('2d');
  var maxWidth = Game.X_DIMENSION;
  var lineHeight = 20;
  var x = Game.X_DIMENSION;
  var y = 60;
  var text = 'All the world \'s a stage, and all the men and women merely players. They have their exits and their entrances; And one man in his time plays many parts.';

  context.font = '16pt Calibri';
  context.fillStyle = '#333';

  wrapText(context, text, x, y, maxWidth, lineHeight);
