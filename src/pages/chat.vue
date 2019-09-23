<!--
Directions:
- Did I killed someone by butterfly effect ?
- Will I killed someone ? based on my past and attitude ?
- Do I have false-memory about not killing someone ?

Notes:

Maybe make a chatbot, asking precise questions (1), asking to upload files (audio, video, and text).
The chatbot maybe is not a messaging app, but more a http://www.herstorygame.com/about/ experience.
So its a non-linear, investigation, maybe link it to personal data
- map your gps data with criminality areas ?
- use a kind of https://dataselfie.it/#/ extension to monitor your browsing, interests and correlate it murder.
- use fingerprint sensor or a fake dna analyzer to identify if you are a killer.

Analyze them.
Make an AI (fake it ?) that determine if you killed someone, with a classification rate.
Use research papers of criminology to automate the investigation.
- https://evrimagaci.org/science-of-solving-murder-evidence-that-leads-to-the-culprit-7587

Reveal [False_memory_syndrome](https://en.wikipedia.org/wiki/False_memory_syndrome).
Criminlaity laws: What evidences make you a culprit ?

(1) Precise questions:
- Have you ever dreamed of killing someone? A member of your family?
- Please, face the camera and say loudly: I didn't killed someone.
- Say it again.
- Define a MBTI.
-->

<template>
  <div class="index">
    <div class="camera">
      <camera @started="camOpen" ref="camera"></camera>
    </div>
    <div class="main">
      <div class="introduction">
        <!-- <type-it :speed="120" :loop="false" :break-lines="true">
          <div>
            <span>am I a killer ?</span>
          </div>
        </type-it> -->
        <canvas class="landmarks" ref="landmarks" />
        <img
          :src="capture"
          class="killers"
          v-for="(capture, index) in captures"
          :key="index"
          ref="captures"
        />
      </div>
      <chat-bot></chat-bot>
    </div>
  </div>
</template>

<script>
module.exports = {
  components: {
    "chat-bot": httpVueLoader("src/components/chat.vue"),
    about: httpVueLoader("src/components/details.vue"),
    camera: httpVueLoader("src/components/camera.vue")
  },
  data() {
    return {
      captures: []
    };
  },
  mounted() {
    // console.log(faceapi);
  },
  methods: {
    async camOpen(open) {
      setInterval(async () => {
        const capture = this.$refs.camera.$refs.webcam.capture();
        this.captures.push(capture);
        if (this.captures.length > 3) {
          // this.startDetection();
          this.captures = this.captures.slice(
            Math.max(this.captures.length - 3, 1)
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

.introduction {
  font-size: 1rem;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.camera {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.9;
  mix-blend-mode: hard-light;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
}

.killers {
  mix-blend-mode: hard-light;
  width: 20em;
  opacity: 0.5;
  visibility: hidden;
  position: absolute;
}

.main {
  display: flex;
  justify-content: center;
  align-items: center;
}

.landmarks {
  position: absolute;
  height: 13em;
  width: 13em;
  transform: scale(-1.3, 1.3) translate3d(1.89em, 4.5em, 0px);
  filter: invert(1);
}
</style>