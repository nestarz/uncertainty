<template>
  <div class="audio">
    <canvas ref="canvas" class="canvas"></canvas>
  </div>
</template>

<script>
// https://developers.google.com/web/fundamentals/media/recording-audio/
// https://webaudioapi.com/samples/microphone/

module.exports = {
  data() {
    return {
      analyser: null
    };
  },
  mounted() {
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: false })
      .then(this.handleSuccess)
      .catch(console.log);
  },
  methods: {
    visualize() {
      this.$refs.canvas.width = this.WIDTH;
      this.$refs.canvas.height = this.HEIGHT;
      const drawContext = this.$refs.canvas.getContext("2d");
      drawContext.lineWidth = 5;
      drawContext.strokeStyle = "#FF0000";

      var times = new Uint8Array(this.analyser.frequencyBinCount);
      this.analyser.getByteTimeDomainData(times);
      for (var i = 0; i < times.length; i++) {
        var value = times[i];
        var percent = value / 256;
        var height = this.HEIGHT * percent;
        var offset = this.HEIGHT - height - 1;
        var barWidth = this.WIDTH / times.length;
        drawContext.fillStyle = "black";
        drawContext.fillRect(i * barWidth, offset, 1, 1);
      }
      window.requestAnimationFrame(this.visualize);
    },
    handleSuccess(stream) {
      this.$refs.canvas.width = window.innerWidth;
      this.$refs.canvas.height = window.innerHeight / 2;

      const context = new (window.AudioContext || window.webkitAudioContext)();
      var input = context.createMediaStreamSource(stream);
      var filter = context.createBiquadFilter();
      filter.frequency.value = 60.0;
      filter.type = filter.NOTCH;
      filter.Q = 10.0;

      var analyser = context.createAnalyser();

      // Connect graph.
      input.connect(filter);
      filter.connect(analyser);

      this.analyser = analyser;
      // Setup a timer to visualize some stuff.
      window.requestAnimationFrame(this.visualize);
    }
  }
};
</script>

<style scoped>
.audio {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>