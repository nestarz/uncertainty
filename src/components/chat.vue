<template>
  <div class="bot">
    <div class="bot-container">
      <div id="my-botui-app" class="bot-main">
        <bot-ui></bot-ui>
      </div>
    </div>
    <div class="voice">
      <voice-analyzer></voice-analyzer>
    </div>
  </div>
</template>

<script>
const DELAY_UNIT = 2000;

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = {
  name: "app",
  components: {
    "voice-analyzer": httpVueLoader("src/components/audio.vue")
  },
  data() {
    return {
      botui: null,
      name: "Elias",
      audio: new Audio()
    };
  },
  mounted() {
    this.botui = new BotUI("my-botui-app", { vue: this.$vue });
    this.startBot();
  },
  methods: {
    startBot() {
      const botui = this.botui;
      botui.message
        .add({
          content: "Connecting..."
        })
        .then(() => {
          return botui.message.add({
            loading: true
          });
        })
        .then(async () => {
          await timeout(6000);
          botui.message.removeAll();
        })
        // .then(() => {
        //   return botui.message.add({
        //     content: "Hello."
        //   });
        // })
        // .then(res => {
        //   return this.botui.message.bot({
        //     content: `This experience is part of a new project aimed to prove behavorial hypotesis about criminology. It will not be hold against you whatsoever.`,
        //     delay: DELAY_UNIT
        //   });
        // })
        // .then(async () => {
        //   this.audio.src = "/assets/audio/hold against you whatsoever.m4a";
        //   await this.audio.play();
        // })
        .then(() => {
          return botui.message.add({
            content:
              "We will now access all your phone, your browsing history, your Facebook, Twitter, Instagram, Amazon and Google profile, all your emails and messages.",
            delay: DELAY_UNIT
          });
        })
        .then(async () => {
          this.audio.src = "/assets/audio/accept the request.m4a";
          await this.audio.play();
        })
        .then(() => {
          return botui.message.add({
            content: "Please accept the request.",
            delay: this.audio.duration * 1000
          });
        })
        .then(() => {
          return botui.action.button({
            action: [
              {
                text: "Accept",
                value: true
              },
              {
                text: "Reject",
                value: false
              }
            ]
          });
        })
        .then(() => {
          return botui.message.add({
            content:
              "Watch closely the following video, and try to identify to one of the two characters.",
            delay: DELAY_UNIT
          });
        })
        .then(async () => {
          this.audio.src = "/assets/audio/describe video.m4a";
          await this.audio.play();
        })
        .then(() => {
          return botui.message.add({
            type: "embed", // this is 'text' by default
            content: "https://www.youtube.com/embed/hqzCF18Ij1U",
            delay: this.audio.duration * 1000 + DELAY_UNIT
          });
        })
        .then(() => {
          return botui.action.button({
            action: [
              {
                text: "Done",
                value: true
              }
            ]
          });
        })
        .then(() => {
          return botui.message.remove(4);
          return botui.message.remove(5);
        })
        .then(index => {
          return botui.message.add({
            content: "Face the camera and say loudly the following sentences:",
            delay: DELAY_UNIT
          });
        })
        .then(async () => {
          this.audio.src = "/assets/audio/face the camera.m4a";
          await this.audio.play();
        })
        .then(() => {
          return botui.message.add({
            content:
              "I DID NOT KILL ANYONE. I WILL NOT KILL ANYONE. I AM NOT A KILLER.",
            delay: this.audio.duration * 1000 + DELAY_UNIT
          });
        })
        .then(async () => {
          this.audio.src = "/assets/audio/i am not a killer.m4a";
          await this.audio.play();
        });
    }
  }
};
</script>

<style scoped>
.bot {
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

.bot-container {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  max-width: 48em;
  width: 100%;
  /* max-height: 590px; */
  height: 100%;
  /* box-shadow: 0px 7px 40px 2px rgba(148, 149, 150, 0.1); */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: 0.3s ease-in-out;
  z-index: 1;
  position: relative;
}

.bot-main {
  height: 80%;
  overflow-y: auto;
  background-size: 100%;
  padding: 4em 0;
  padding: 0;
  height: 100%;
  /* box-shadow: 0px 7px 40px 2px rgba(148, 149, 150, 0.1); */
}

.voice {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
}
</style>