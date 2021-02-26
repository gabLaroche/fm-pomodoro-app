<template>
  <div class="app-timer">
    <progress-bar
        :percentage="percentage"
        :colour-id="colourId"
    />

    <div class="app-timer__container">
      <h1 class="app-timer__time">{{ time }}</h1>

      <button
          class="app-timer__btn"
          v-if="(!timerRunning || timerPaused) && totalTime > 0"
          @click="startTimer"
      >
        Start
      </button>
      <button
          class="app-timer__btn"
          v-else-if="(timerRunning || !timerPaused) && totalTime > 0"
          @click="pauseTimer"
      >
        Pause
      </button>
      <button
          class="app-timer__btn"
          v-else-if="totalTime === 0"
          @click="resetTimer"
      >
        Reset
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import ProgressBar from '../progress-bar/ProgressBar.vue';

export default {
  components: {
    ProgressBar
  },

  props: {
    activeTimer: {
      type: String,
      required: true,
    },

    colourId: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      timerRunning: false,
      timerPaused: false,
      interval: null,
      percentage: 0,
    };
  },

  watch: {
    activeTimer(value) {
      this.resetTimer();
      this.setTotalTime((this.durations[value] * 60));
    },
  },

  computed: {
    ...mapState({
      durations: state => state.durations,
      totalTime: state => state.totalTime,
    }),

    time() {
      return `${this.minutes} : ${this.seconds}`;
    },

    minutes() {
      const min = Math.floor(this.totalTime / 60);
      return min >= 10 ? min : `0${min}`;
    },

    seconds() {
      const sec = this.totalTime - (this.minutes * 60);
      return sec >= 10 ? sec : `0${sec}`;
    },
  },

  methods: {
    ...mapActions([
        'setTotalTime',
    ]),

    countdownTimer() {
      if (this.totalTime === 0) {
        this.timerRunning = false;
        this.timerPaused = false;
        console.log('what?')
        clearInterval(this.interval);
      } else if (this.timerRunning) {
        this.setTotalTime(this.totalTime - 1);
        this.percentage = (((this.totalTime / 60) / this.durations[this.activeTimer]) * 100);
      }
    },

    startTimer() {
      this.timerPaused = false;
      this.timerRunning = true;
      this.interval = setInterval(this.countdownTimer, 1000);
    },

    pauseTimer() {
      this.timerPaused = true;
      this.timerRunning = false;
      clearInterval(this.interval);
    },

    resetTimer() {
      this.percentage = 0;
      this.timerRunning = false;
      this.timerPaused = false;
      clearInterval(this.interval);
      this.setTotalTime((this.durations[this.activeTimer] * 60));
    }
  },

  created() {
    this.unwatch = this.$store.watch(
        (state) => state.durations,
        () => {
          this.resetTimer();
        }
    )
  },

  beforeUnmount() {
    this.unwatch();
  }
}
</script>

<style lang="scss" scoped src="./app-timer.scss" />
