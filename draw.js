const canvas = document.querySelector('#myCanvas');
const ctx = canvas.getContext('2d');
const canvasBackground = document.querySelector('#myBackgroundCanvas');
const ctxBackground = canvasBackground.getContext('2d');
const canvasDownload = document.querySelector('#myDownloadCanvas');
const ctxDownload = canvasDownload.getContext('2d');
let isDrawing = false;
let lastX = 0;
let lastY = 0;
let lineMode = false;


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvasBackground.width = window.innerWidth;
canvasBackground.height = window.innerHeight;
canvasDownload.width = window.innerWidth;
canvasDownload.height = window.innerHeight;

ctxBackground.fillStyle = "white";
ctxBackground.fillRect(0, 0, canvas.width, canvas.height);
ctxDownload.fillStyle = "white";
ctxDownload.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = '#000000';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 5;

function draw(e) {
  if (!isDrawing || lineMode) return;
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  [lastX, lastY] = [e.offsetX, e.offsetY];
}

canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;
  if (lineMode) {


    if (lastX !== null && lastY !== null) {
      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.stroke();
      lastX = null;
      lastY = null;
    }
    else {
      [lastX, lastY] = [e.offsetX, e.offsetY];
    }
  } else {
    [lastX, lastY] = [e.offsetX, e.offsetY];
  }
});

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);

function downloadImage() {
  var myBackgroundCanvas = document.getElementById('myBackgroundCanvas');
  var myCanvas = document.getElementById('myCanvas');
  var myDownloadCanvas = document.getElementById('myDownloadCanvas');

  var downloadContext = myDownloadCanvas.getContext('2d');
  downloadContext.drawImage(myBackgroundCanvas, 0, 0);
  downloadContext.drawImage(myCanvas, 0, 0);

  var link = document.createElement('a');
  link.download = "canvas.png";
  link.href = myDownloadCanvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
  link.click();
  ctxDownload.clearRect(0, 0, canvas.width, canvas.height);
}



//Funktionen

function drawCheckered() {
  var canvas = document.getElementById('myBackgroundCanvas');
  var context = canvas.getContext('2d');
  var currentLineWidth = context.lineWidth;
  var currentStrokeStyle = context.strokeStyle;
  var currentFillStyle = context.fillStyle;
  var width = canvas.width;
  var height = canvas.height;
  var squareSize = 20;
  var lineWidth = 0.5;

  context.clearRect(0, 0, width, height);

  for (var x = 0; x < width; x += squareSize) {
    for (var y = 0; y < height; y += squareSize) {
      context.fillStyle = '#fff';
      context.fillRect(x, y, squareSize, squareSize);

      context.strokeStyle = '#000';
      context.lineWidth = lineWidth;

      context.beginPath();
      context.moveTo(x, y + squareSize);
      context.lineTo(x + squareSize, y + squareSize);
      context.stroke();

      context.beginPath();
      context.moveTo(x + squareSize, y);
      context.lineTo(x + squareSize, y + squareSize);
      context.stroke();
    }
  }
  context.lineWidth = currentLineWidth
  context.strokeStyle = currentStrokeStyle
  context.fillStyle = currentFillStyle
}

function drawLined() {
  var canvas = document.getElementById('myBackgroundCanvas');
  var context = canvas.getContext('2d');
  var currentLineWidth = context.lineWidth;
  var currentStrokeStyle = context.strokeStyle;
  var currentFillStyle = context.fillStyle;
  var width = canvas.width;
  var height = canvas.height;
  var squareSize = 20;
  var lineWidth = 0.2;
  var squareSize = 30;

  context.clearRect(0, 0, width, height);

  for (var y = 0; y < height; y += squareSize) {
    context.strokeStyle = 'blue';
    context.lineWidth = lineWidth;

    context.beginPath();
    context.moveTo(0, y);
    context.lineTo(width, y);
    context.stroke();
  }
  context.lineWidth = currentLineWidth;
  context.strokeStyle = currentStrokeStyle;
  context.fillStyle = currentFillStyle;
}

var toolButtons = document.querySelectorAll('.active-tool');

toolButtons.forEach(function(button) {
  button.addEventListener('click', function() {
    var isClicked = this.classList.contains('clicked');

    if (isClicked) {
      this.classList.remove('clicked');
    } else {
      this.classList.add('clicked');
    }
  });
});