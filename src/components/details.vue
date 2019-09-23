<template>
  <div class="about">
    <div class="button" tabindex="0">about</div>
    <div class="details">
      <div class="container" v-for="lead in leads" :key="lead.img">
        <img :src="lead.img" />
        <div class="text" v-if="lead.text">{{ lead.text }}</div>
      </div>
    </div>
  </div>
</template>

<script>
module.exports = {
  data() {
    return {
      leads: [
        {
          img:
            "https://pa1.narvii.com/5943/819ab06fd08d1dcb5c04b777486d96cbbb6eb687_hq.gif",
          text:
            "A person's Crime Coefficient is a numerical measure of said person's probability/propensity to commit a crime. It determine if a target is a latent criminal or otherwise. It is calculated and determined by the target's stress level (Hue) and other biological readings."
        },
        {
          img: "https://media.giphy.com/media/zg0IO38HIOH8k/giphy.gif",
          text: ""
        }
      ]
    };
  }
};
</script>

<style scoped>
.details {
  display: flex;
  display: none;
}

.button:focus-within + .details {
  display: block;
}

.container {
  position: relative;
  padding-right: 1rem;
  padding-top: 1rem;
}

.container .text {
  font-family: Helvetica, Arial, sans-serif;
  padding: 1rem;
  padding-left: 0;
  max-width: 50%;
}

.container img {
  position: absolute;
  right: 0;
  display: none;
}

.container:hover img {
  display: block;
}
</style>