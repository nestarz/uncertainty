<template>
  <div class="index">
    <div class="labo">
      <video autoplay loop>
        <source src="/assets/videos/labo2.mp4" type="video/mp4" />
      </video>
    </div>
    <div class="camera">
      <camera @started="camOpen" ref="camera"></camera>
    </div>
    <div class="main">
      <div class="introduction">
        <canvas class="landmarks" ref="landmarks"></canvas>
        <div class="emotion">
          <span>{{ confidence.emotion }} {{ confidence.value }}</span>
        </div>
        <img
          :src="capture"
          class="killers"
          v-for="(capture, index) in captures"
          :key="index"
          ref="captures"
        />
        <img src="https://thumbs.gfycat.com/BoilingArtisticHornbill-size_restricted.gif" class="image"/>
      </div>
    </div>
  </div>
</template>

<script>
module.exports = {
  components: {
    about: httpVueLoader("src/components/details.vue"),
    camera: httpVueLoader("src/components/camera.vue")
  },
  data() {
    return {
      captures: [],
      max: 2,
      confidence: {},
      emotions: ["happy", "angry", "neutral", "scared"]
    };
  },
  mounted() {
    setInterval(
      () =>
        (this.confidence = {
          value: Math.random(),
          emotion: this.emotions[
            Math.floor(Math.random() * this.emotions.length)
          ]
        }),
      200
    );
  },
  methods: {
    async camOpen(open) {
      setInterval(async () => {
        const capture = this.$refs.camera.$refs.webcam.capture();
        this.captures.push(capture);
        if (this.captures.length > this.max) {
          // this.startDetection();
          this.captures = this.captures.slice(
            Math.max(this.captures.length - this.max, 1)
          );
        }
      }, 1000);
    },
    async startDetection() {
      await faceapi.nets.tinyFaceDetector.loadFromUri(
        "assets/models/tiny_face_detector"
      );
      await faceapi.nets.faceLandmark68TinyNet.loadFromUri(
        "assets/models/face_landmarks_tiny"
      );
      const detection = await faceapi
        .detectAllFaces(
          this.$refs.captures[0],
          new faceapi.TinyFaceDetectorOptions()
        )
        .withFaceLandmarks((useTinyModel = true));
      const displaySize = {
        width: 200,
        height: 130
      };
      const canvas = this.$refs.landmarks;
      const resizedResults = faceapi.resizeResults(detection, displaySize);
      console.log(resizedResults);
      const context = canvas.getContext("2d");
      if (detection.length) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        faceapi.draw.drawFaceLandmarks(canvas, resizedResults);
      }
      console.log("ok detected", detection);
    }
  }
};
</script>

<style scoped>
.index {
  position: relative;
  height: 100vh;
}

header {
  display: flex;
  justify-content: space-between;
}

.image {
    position: absolute;
    mix-blend-mode: screen;
    top: -200px;
    width: 280px;
    left: 80px;
    top: 70px;
    filter: saturate(121.5) grayscale(1) contrast(62.5);
}

@keyframes classifier {
  0% {
    transform: scale(1.2) translate(0, 0);
    border-color: rgb(47, 255, 64);
  }
  25% {
    transform: scale(1.19) translate(0, -3px);
    border-color: rgb(47, 255, 64);
  }
  50% {
    transform: scale(1.2) translate(-3px, 0);
    border-color: rgb(47, 255, 64);
  }
  75% {
    transform: scale(1.2) translate(0, 3px);
    border-color: rgb(47, 255, 64);
  }
  90% {
    transform: scale(1.2) translate(0, -3px);
    border-color: rgb(47, 255, 64);
  }
  100% {
    transform: scale(1.2) translate(0, -3px);
    border-color: red;
  }
}

.emotion {
  border: 5px solid rgb(47, 255, 64);
  height: 300px;
  width: 300px;
  position: absolute;
  left: -168px;
  top: -200px;
  animation: classifier 1s 0.1s linear infinite;
}

.introduction {
  font-size: 1rem;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  max-width: 560px;
}

.camera {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  opacity: 0.9;
  mix-blend-mode: hard-light;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  height: 500px;
  overflow: hidden;
  margin-top: -70px;
  top: 24%;
}

.killers {
  mix-blend-mode: normal;
  width: 20em;
  opacity: 0.9;
  filter: contrast(3.5) grayscale(1) brightness(1.5);
  margin: 5px;
  display: none;
}

.main {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.landmarks {
  position: absolute;
  height: 13em;
  width: 13em;
  transform: scale(-1.3, 1.3) translate3d(1.89em, 4.5em, 0px);
  filter: invert(1);
}

.labo {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  max-height: 100vh;
  overflow: hidden;
}

.labo video {
  max-height: 110%;
  margin-top: -50px;
}
</style>