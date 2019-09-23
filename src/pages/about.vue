<template>
  <div class="about">
    <div class="panel" ref="panel">
      <div id="#output" v-dragged class="output">
        <video autoplay loop controls>
          <source src="/assets/videos/output1.mp4" type="video/mp4" />
        </video>
      </div>
      <div id="#categorie-what" v-dragged class="categorie">what</div>
      <div id="#what-text" v-dragged class="question card">Am I a killer?</div>
      <div id="#categorie-why" v-dragged class="categorie">why</div>
      <div
        id="#why-text"
        v-dragged
        class="question card"
      >Mind can be tricked, can I manipulate myself to think I might kill or have killed ?</div>
      <div id="#categorie-how" v-dragged class="categorie">how</div>
      <div id="#how-text" v-dragged class="question card crossed">Should I try to kill someone?</div>
      <div
        id="#how-text2"
        v-dragged
        class="question card"
      >Interrogatory using police and scientific codes to evaluate a crime coefficient based on my behavorial and online data.</div>

      <div id="#categorie-narrative" v-dragged class="categorie">narrative</div>
      <div class="keywords" v-dragged id="fear">Fear</div>
      <div class="keywords" v-dragged id="pressure">Pressure</div>
      <div class="keywords" v-dragged id="laboratory">Laboratory</div>
      <div class="keywords" v-dragged id="facetoface">Face to face</div>
      <div class="keywords" v-dragged id="trial">Trial</div>
      <div class="keywords" v-dragged id="interrogatory">Interrogatory</div>
      <div class="keywords" v-dragged id="AI">AI</div>
      <div class="keywords" v-dragged id="blurred">Blurred</div>
      <img src="/assets/images/0e5c73597210c681521456f11e65e07b.gif" v-dragged id="ev2" />
      <img src="/assets/images/giphy.gif" v-dragged id="office" />
      <img id="chatbot1" v-dragged src="/assets/images/chatbot.png" />
      <img
        id="landmarks"
        v-dragged
        src="data:image/jpeg;base64,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"
      />
      <div class="scene1">
        <img id="#white-room" v-dragged src="/assets/images/White-torture-room-w750.jpg" />
        <img id="#sitguy" v-dragged src="/assets/images/sit-guy.png" />
      </div>
      <div
        id="visual-1"
        class="card"
        v-dragged
      >Opening the film with a white room and myself in front of a camera.</div>

      <div
        id="visual-2"
        class="card"
        v-dragged
      >Zooming for some seconds. Then show the chatbot disscussion in full screen.</div>
      <div id="visual-3" class="card" v-dragged>Dub it with your own lowered/deep voice.</div>
      <img src="/assets/images/source.gif" id="visual-5" v-dragged />
      <div
        id="visual-4"
        class="card"
        v-dragged
      >At some points, during the dubbing, show the inspector/scientific interface.</div>
      <div
        id="#game"
        v-dragged
        class="card"
      >Make me part of a game, experience that use both my choices and behaviour to determine if I'm a psychopath.</div>
      <div id="#gps-tracking" v-dragged class="card">GPS Tracking Data for Crime Mapping</div>
      <img src="/assets/images/5b76b5d674c80c4d6652ca5e5123c444.gif" v-dragged id="evangelion" />
      <img src="/assets/images/engine.png" id="#applymagicsauce" v-dragged />
      <iframe
        width="560"
        height="315"
        src="https://www.youtube-nocookie.com/embed/SFSdlc5711M"
        frameborder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        id="#monitoring"
        v-dragged
      ></iframe>
      <img src="/assets/images/2019-08-06-image-17.jpg" id="#ring" v-dragged />
      <iframe
        src="https://player.vimeo.com/video/201178499"
        width="640"
        height="360"
        frameborder="0"
        allow="autoplay; fullscreen"
        allowfullscreen
        id="#dataselfievideo"
        v-dragged
      ></iframe>
      <div id="#killed" v-dragged class="card">Will people think I killed someone ?</div>
      <img src="/assets/images/tumblr_inline_p9dz3tbswY1so7sym_500.gif" id="#psychopass" v-dragged />
      <div id="#fear" v-dragged class="card">It Creates a Culture of Fear</div>
      <div id="#clearconscience" v-dragged class="card">Does this man have a clear conscience?</div>
      <div id="#phelps" v-dragged class="card">Phelps shows the suspect overwhelming evidence.</div>
      <img id="#her-story" v-dragged src="/assets/images/hery-story-main.png" />
      <img id="#image-mydc" v-dragged src="/assets/images/170619_r30118.jpg" />
      <div id="#text-mydc" v-dragged class="card">Remembering the Murder You Didn't Commit</div>
      <img id="#experiment1" v-dragged src="/assets/images/107967_web.jpg" />
      <img id="#experiment3" v-dragged src="/assets/images/img_4004.jpg" />
      <img id="#experiment2" v-dragged src="/assets/images/GR-YFf.gif" />
      <img id="#heavyrain" v-dragged src="/assets/images/heavy-rain-playstation-3-ps3-466.jpg" />
      <img id="#lanoire" src="/assets/images/LA%20Noire_screenshot_198.jpg" v-dragged />
      <img id="#matrix" v-dragged src="/assets/images/8bsypt.gif" />
      <img
        v-dragged
        id="#hippocampus"
        src="/assets/images/creating-a-false-memory-in-the-hippocampus-1-638.jpg"
      />
      <div v-dragged id="#false-memory" class="card">
        <b>
          <i>False memory syndrome</i>
        </b> is a memory that is objectively false but that the person strongly believes occurred.
      </div>
      <div v-dragged id="#police-footage">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube-nocookie.com/embed/fxh1ft_WdV0?start=6"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
      <img v-dragged id="#lightcatch" src="/assets/images/citizen-1-articleLarge.jpg" />
      <img v-dragged id="#science1" src="/assets/images/41598_2017_10463_Fig3_HTML.jpg" />
      <div id="#categorie-visual" v-dragged class="categorie">actions</div>
    </div>
    <input
      onclick="
    this.select();
    document.execCommand('copy');"
      type="textarea"
      :value="localStorage.positions"
      class="positions"
    />
    <div class="zoom">
      <input
        type="range"
        min="0.9"
        max="5"
        step="0.01"
        v-bind:value="zoomRatio"
        v-on:input="zoomSlider($event)"
      />
      <!-- <div @click="zoom(false)">Zoom-</div>
      <div @click="zoom(true)">Zoom+</div>-->
    </div>
  </div>
</template>

<script>
module.exports = {
  components: {},
  data() {
    return {
      localStorage: localStorage,
      initialPositions: {
        "visual-2": { left: 120, top: 24 },
        "#ring": { left: 52, top: 16 },
        "visual-4": { left: 123, top: 37 },
        "visual-5": { left: 108.224, top: 26.1114 },
        "visual-3": { left: 156, top: 44 },
        "#sitguy": { left: 99, top: 14 },
        "visual-1": { left: 152, top: 15 },
        "#game": { left: 32.5936, top: 3.51849 },
        "#gps-tracking": { left: 62.8145, top: 56 },
        "#applymagicsauce": { left: 37.8887, top: 56.7777 },
        "#fear": { left: 64, top: 33 },
        "#psychopass": { left: 43, top: 3 },
        "#phelps": { left: 74.5181, top: 14.1481 },
        "#her-story": { left: 29, top: 8 },
        "#image-mydc": { left: 30, top: 27 },
        "#false-memory": { left: 10.0667, top: 49.333 },
        "#clearconscience": { left: 74.333, top: 5.33337 },
        "#text-mydc": { left: 39.1114, top: 44.5187 },
        evangelion: { left: 88.668, top: 35.5555 },
        home: { left: 144.571, top: 51.4429 },
        "#lightcatch": { left: 62.2219, top: 27.5552 },
        "#science1": { left: 46.7776, top: 47.3332 },
        "#categorie-visual": { left: 60, top: 9 },
        "#experiment1": { left: 21, top: 49.9999 },
        "#experiment2": { left: 15, top: 41.6 },
        "#experiment3": { left: 33.111, top: 44.1108 },
        "#heavyrain": { left: 39, top: 17 },
        "#matrix": { left: 25.2, top: 16.8 },
        "#hippocampus": { left: 8, top: 29 },
        "#lanoire": { left: 41, top: 10 },
        "#killed": { left: 59, top: 45 },
        "#dataselfievideo": { left: 50.1111, top: 59.3333 },
        "#police-footage": { left: 7, top: 19 },
        "#monitoring": { left: 12.4445, top: 56.9999 },
        laboratory: { left: 34, top: 75 },
        trial: { left: 28, top: 33 },
        interrogatory: { left: 23.9723, top: 10.4444 },
        AI: { left: 68.6668, top: 69.639 },
        blurred: { left: 27, top: 43 },
        facetoface: { left: 55.0558, top: 48 },
        "#categorie-narrative": { left: 3.55552, top: 5.38892 },
        fear: { left: 58, top: 38 },
        pressure: { left: 40, top: 31 },
        "#white-room": { left: 103, top: 14 },
        "#how-text2": { left: 45.3771, top: 35.3754 },
        "#why-text": { left: 27.3334, top: 33.5107 },
        "#what-text": { left: 8.79981, top: 33.5558 },
        "#how-text": { left: 45.1548, top: 33.5992 },
        "#categorie-what": { left: 18.723, top: 40.2781 },
        "#categorie-why": { left: 42.4449, top: 40.1664 },
        "#categorie-how": { left: 64.7224, top: 39.8903 },
        chatbot1: { left: 105.223, top: 41.1106 },
        ev2: { left: 119.556, top: 38.3331 },
        office: { left: 63.8887, top: 52.9998 },
        landmarks: { left: 93.3333, top: 44.2221 },
        "#output": { left: 144.113, top: 17.1109 }
      },
      forceInitial: true,
      zoomRatio: 0.9
    };
  },
  mounted() {
    if (!this.forceInitial) {
      localStorage.positions = JSON.stringify({
        ...this.initialPositions,
        ...JSON.parse(localStorage.positions)
      });
    }

    if (this.forceInitial || !localStorage.positions) {
      localStorage.positions = JSON.stringify(this.initialPositions);

      Object.keys(this.initialPositions).map(id => {
        const el = document.getElementById(id);
        if (el) {
          el.style.top = this.initialPositions[id].top + "em";
          el.style.left = this.initialPositions[id].left + "em";
          el.style.position = "absolute";
        }
      });
    }
  },
  methods: {
    zoomSlider(e) {
      this.$refs.panel.style.fontSize = e.target.value + "em";
    }
  }
};
</script>

<style scoped>
* {
  -webkit-user-drag: none;
}

@keyframes kenburnsnightmare {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(2);
  }
}

.question {
  font-size: 250% !important;
  font-weight: bold;
  background: black !important;
  color: white;
  font-family: Helvetica, sans-serif !important;
  text-align: center;
}

.crossed {
  text-decoration: line-through;
  text-decoration-color: red;
}

.keywords {
  font-weight: bold;
  font-size: 80%;
  text-decoration: underline;
  text-decoration-color: red;
  background: red;
}

.scene1 img {
  position: relative;
  animation: kenburnsnightmare 10s infinite;
}

div {
  user-select: none !important;
}

.panel * {
  cursor: pointer;
}

.categorie,
.title {
  font-weight: bold;
  font-size: 200%;
}

.output {
  width: 50em;
}

.output video {
  width: 50em;
}

.title {
  font-size: 400%;
}

.panel {
  font-size: 0.9em;
  min-width: 200em;
  min-height: 150em;
  height: 100%;
  width: 100%;
  background-color: #fff;
  color: #000;
  background-size: 10px 10px;
  background-image: linear-gradient(
      to right,
      rgb(215, 215, 215) 1px,
      transparent 1px
    ),
    linear-gradient(to bottom, rgb(215, 215, 215) 1px, transparent 1px);
}

.card {
  width: 15em;
  background: #ffffa5;
  padding: 0.25em;
  font-family: "Times New Roman", Helvetica, Arial, sans-serif;
  font-size: 0.75em;
  z-index: 99;
}

img {
  user-select: none;
  max-width: 10em;
}

iframe {
  max-width: 12em;
  max-height: 7em;
  padding: 0.5em 0;
  background: #000;
}

.home {
  width: 20em;
  max-width: 20em;
  height: 41em;
  background: black;
  overflow: hidden;
}
.home > * {
  font-size: 0.2em;
}
.positions {
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  width: 99.5%;
  filter: invert(1);
}

.zoom {
  position: fixed;
  bottom: 30px;
  right: 30px;
  cursor: pointer;
  color: #000;
}
</style>