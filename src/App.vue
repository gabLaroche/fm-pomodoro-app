<template>
  <img :src="requiresrc/assets/img/logo.svg" alt="Pomodoro logotype">
  <AppControls
      :active-timer="activeTimer"
      @button-click="activeTimer = $event"
  />
  <AppTimer
      :active-timer="activeTimer"
      :colour-id="colourId"
  />
  <AppSettings
      :active-timer="activeTimer"
      @colour-changed="handleColourChange"
  />
</template>

<script>
import AppSettings from './components/app-settings/AppSettings.vue';
import AppTimer from './components/app-timer/AppTimer.vue';
import AppControls from './components/app-controls/AppControls.vue';

export default {
  components: {
    AppControls,
    AppTimer,
    AppSettings
  },

  data() {
    return {
      activeTimer: 'pomodoro',
      colourId: 1,
    };
  },

  methods: {
    handleColourChange(id) {
      this.colourId = id;
    },
  },
}
</script>

<style lang="scss" src="./assets/styles/app.scss" />
