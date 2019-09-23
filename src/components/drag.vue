<template>
  <div v-dragged="onDragged">
    <slot />
  </div>
</template>

<script>
module.exports = {
  methods: {
    onDragged({
      el,
      deltaX,
      deltaY,
      offsetX,
      offsetY,
      clientX,
      clientY,
      first,
      last
    }) {
      if (first) {
        this.isDragging = true;
        return;
      }
      if (last) {
        this.isDragging = false;
        return;
      }
      var l = +window.getComputedStyle(el)["left"].slice(0, -2) || 0;
      var t = +window.getComputedStyle(el)["top"].slice(0, -2) || 0;
      el.style.left = l + deltaX + "px";
      el.style.top = t + deltaY + "px";
      el.style.position = "absolute";
    }
  }
};
</script>

<style scoped>
* {
  -webkit-user-drag: none;
  user-drag: none;
}
</style>