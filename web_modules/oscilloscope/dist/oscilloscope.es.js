var Oscilloscope = function Oscilloscope(source, options) {
  if ( options === void 0 ) options = {};

  if (!(source instanceof window.AudioNode)) {
    throw new Error('Oscilloscope source must be an AudioNode');
  }

  if (source instanceof window.AnalyserNode) {
    this.analyser = source;
  } else {
    this.analyser = source.context.createAnalyser();
    source.connect(this.analyser);
  }

  if (options.fftSize) {
    this.analyser.fftSize = options.fftSize;
  }

  this.timeDomain = new Uint8Array(this.analyser.frequencyBinCount);
  this.drawRequest = 0;
}; // begin default signal animation


Oscilloscope.prototype.animate = function animate (ctx, x0, y0, width, height) {
    var this$1 = this;

  if (this.drawRequest) {
    throw new Error('Oscilloscope animation is already running');
  }

  this.ctx = ctx;

  var drawLoop = function () {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    this$1.draw(ctx, x0, y0, width, height);
    this$1.drawRequest = window.requestAnimationFrame(drawLoop);
  };

  drawLoop();
}; // stop default signal animation


Oscilloscope.prototype.stop = function stop () {
  if (this.drawRequest) {
    window.cancelAnimationFrame(this.drawRequest);
    this.drawRequest = 0;
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }
}; // draw signal


Oscilloscope.prototype.draw = function draw (ctx, x0, y0, width, height) {
    var this$1 = this;
    if ( x0 === void 0 ) x0 = 0;
    if ( y0 === void 0 ) y0 = 0;
    if ( width === void 0 ) width = ctx.canvas.width - x0;
    if ( height === void 0 ) height = ctx.canvas.height - y0;

  this.analyser.getByteTimeDomainData(this.timeDomain);
  var step = width / this.timeDomain.length;
  ctx.beginPath(); // drawing loop (skipping every second record)

  for (var i = 0; i < this.timeDomain.length; i += 2) {
    var percent = this$1.timeDomain[i] / 256;
    var x = x0 + i * step;
    var y = y0 + height * percent;
    ctx.lineTo(x, y);
  }

  ctx.stroke();
};

export default Oscilloscope;
//# sourceMappingURL=oscilloscope.es.js.map
