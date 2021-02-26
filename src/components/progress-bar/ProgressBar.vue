<template>
  <canvas ref="canvas" width="400" height="400" />
</template>

<script>
export default {
  name: 'ProgressBar',

  props: {
    percentage: {
      type: Number,
      required: true,
    },

    colourId: {
      type: Number,
      required: true,
    }
  },

  watch: {
    percentage() {
      this.draw();
    },

    colourId() {
      this.draw();
    },
  },

  methods: {
    draw() {
      const percentage = this.percentage === 0 ? 100 : this.percentage;
      const ctx = this.$refs.canvas.getContext('2d');
      ctx.clearRect(0, 0, 400, 400);
      const start = 4.71;
      const diff = (percentage / 100) * Math.PI * 2;

      ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--primary-colour-active') || 'hsl(0, 91%, 71%)';
      ctx.lineWidth = 12;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.arc(200, 200, 170,  start, diff + start, false);
      ctx.stroke();
    }
  },

  mounted() {
    this.draw();
  },
}
</script>

<style scoped>

</style>
