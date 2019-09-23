<template>
  <div class="monitor">
    <div class="labo">
      <video autoplay loop>
        <source src="/assets/videos/labo2.mp4" type="video/mp4" />
      </video>
    </div>
    <div class="gps-analyzer">
      <video autoplay loop>
        <source src="/assets/videos/gps.mp4" type="video/mp4" />
      </video>
    </div>
    <div class="text-analyzer">
      <video autoplay loop>
        <source src="/assets/videos/twitter.mp4" type="video/mp4" />
      </video>
    </div>
    <div class="msn-analyzer">
      <video autoplay loop>
        <source src="/assets/videos/msn.mp4" type="video/mp4" />
      </video>
    </div>
    <div class="image-analyzer">
      matching...
      <img class="me" src="/assets/images/me.gif" />
      <img class="me" src="/assets/images/criminals.gif" />
      <div class="classifier">0.0013</div>
    </div>
  </div>
</template>

<script>
module.exports = {
  name: "app",
  components: {
    "voice-analyzer": httpVueLoader("src/components/audio.vue")
  }
};
</script>

<style scoped>
.monitor {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: flex-end;
}

.text-analyzer {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 20%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  flex-direction: column;
  filter: contrast(1.3);
  mix-blend-mode: screen;
}

.text-analyzer video {
  width: 300px;
}

@keyframes classifier {
  0% {
    transform: scale(1.2) translate(0, 0);
    background-color: #000;
  }
  25% {
    transform: scale(1.19) translate(0, -3px);
  }
  50% {
    transform: scale(1.2) translate(0, 0);
    background-color: #000;
  }
  75% {
    transform: scale(1.2) translate(0, 3px);
  }
  100% {
    transform: scale(1.2) translate(0, 0);
  }
}

.classifier {
  display: none;
  font-size: 12px;
  font-weight: 100;
  background: red;
  z-index: 9;
  position: absolute;
  top: 50%;
  width: 50px;
  height: 50px;
  transform: scale(1.2);
  color: black;
  animation: classifier 1s 0.1s linear infinite;
}

.image-analyzer {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 200%;
}

.me {
  filter: grayscale(2) contrast(2);
  height: 200px;
}

.gps-analyzer {
  position: absolute;
  top: 11%;
  left: 30%;
  opacity: 1;
  z-index: 0;
  filter: contrast(2.5) brightness(47.5);
  mix-blend-mode: screen;
}

.gps-analyzer video {
  width: 620px;
  filter: invert(1);
}

.msn-analyzer {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 20%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  filter: contrast(1.3) grayscale(1);
  max-width: 300px;
  overflow: hidden;
  mix-blend-mode: screen;
}

.msn-analyzer video {
  width: 310px;
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