<template>
  <div class="camera">
    <webcam
      @cameras="setCameras"
      :device-id="camera"
      class="video"
      ref="webcam"
      @started="args => $emit('started', args)"
    />
  </div>
</template>

<script>
module.exports = {
  components: {
    webcam: httpVueLoader("src/components/webcam.vue")
  },
  data() {
    return {
      cameras: null
    };
  },
  methods: {
    setCameras(cameras) {
      this.cameras = cameras;
    }
  },
  computed: {
    camera() {
      return this.cameras && this.cameras[0].deviceId;
    }
  }
};
</script>

<style scoped>
.camera {
  width: 100%;
  max-width: 480px;
  height: 100vh;
  overflow: hidden;
  position: relative;
  filter: grayscale(1);
}

.video {
  min-width: 100%;
  min-height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%) scale(-2.5, 2.5);
}
</style>