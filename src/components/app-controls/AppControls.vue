<template>
  <ul class="app-controls">
    <li
        v-for="(button, index) in buttons"
        :key="index"
        :class="['app-controls__control', { 'app-controls__control--active': button.slug === activeTimer }]"
    >
      <button
          class="app-control__btn"
          @click="$emit('button-click', button.slug)"
      >
        {{ button.text }}
      </button>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    activeTimer: {
      type: String,
      required: true,
    },
  },

  emits: ['button-click'],

  data() {
    return {
      buttons: [
        {
          text: 'pomodoro',
          slug: 'pomodoro'
        },
        {
          text: 'short break',
          slug: 'short-break'
        },
        {
          text: 'long break',
          slug: 'long-break'
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped src="./app-controls.scss" />
