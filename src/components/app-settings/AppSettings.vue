<template>
  <teleport to="body">
    <div
        v-if="isOpen"
        ref="overlay"
        class="overlay"
        @click="handleClickOutside"
    >
      <div class="overlay__body">
        <h2>Settings</h2>

        <div class="overlay__content">
          <h4>Time (Minutes)</h4>

          <div class="overlay__timers">
            <div
                v-for="(duration, key) in durations"
                :key="key"
                class="overlay__field-group"
            >
              <label
                  class="overlay__label"
                  :for="key"
              >
                {{ durationText(key) }}
              </label>
              <div class="overlay__input-container">
                <input
                    class="overlay__input"
                    :id="key"
                    type="number"
                    min="1"
                    max="60"
                    :value="duration"
                    @change="handleDurationChange({ key: key, value: parseInt($event.target.value, 10) })"
                />
                <button
                    :aria-label="`increase ${durationText(key)} duration`"
                    class="overlay__input-btn overlay__input-btn--increase"
                    @click="handleDurationChange({ key: key, value: (duration + 1) })"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="7">
                    <path fill="none" stroke="#1E213F" stroke-width="2" d="M1 6l6-4 6 4"/>
                  </svg>
                </button>
                <button
                    :aria-label="`decrease ${durationText(key)} duration`"
                    class="overlay__input-btn overlay__input-btn--decrease"
                    @click="handleDurationChange({ key: key, value: (duration - 1) })"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="7">
                    <path fill="none" stroke="#1E213F" stroke-width="2" d="M1 1l6 4 6-4"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div class="overlay__style-container overlay__style-container--fonts">
            <h4>Font</h4>

            <ul class="overlay__style overlay__style--fonts">
              <li
                  v-for="font in fonts"
                  :key="font.id"
                  :style="{ fontFamily: `var(--font-family-${font.id})`}"
                  :class="[
                      'overlay__style-nugget',
                      'overlay__style-nugget--font',
                      {'overlay__style-nugget--font-active': font.id === activeFont}
                  ]"
              >
                <button
                    :style="{ fontFamily: `var(--font-family-${font.id})`}"
                    @click="handleFontChange(font.id)"
                >
                  <span aria-hidden="true">
                    Aa
                  </span>
                  <span class="visually-hidden">
                    Change font to {{ font.value }}
                  </span>
                </button>
              </li>
            </ul>
          </div>

          <div class="overlay__style-container">
            <h4>Colour</h4>
            <ul class="overlay__style overlay__style--colours">
              <li
                  v-for="colour in colours"
                  :key="colour.id"
                  :class="[
                      'overlay__style-nugget',
                      'overlay__style-nugget--colour',
                      {'overlay__style-nugget--colour-active': colour.id === activeColour}
                  ]"
              >
                <button
                    @click="handleColourChange(colour.id)"
                    :style="{ backgroundColor: `var(--primary-colour-${colour.id})`}"
                >
                  <span class="visually-hidden">
                    Change colour to {{ colour.value }}
                  </span>
                </button>
              </li>
            </ul>
          </div>

          <button
              class="overlay__apply-btn"
              @click="closeOverlay"
          >
            Apply
          </button>
        </div>

        <button
            class="overlay__close"
            @click="closeOverlay"
            aria-label="close overlay"
        >
          <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
          >
            <path
                fill="#1E213F" fill-rule="evenodd"
                d="M11.95.636l1.414 1.414L8.414 7l4.95 4.95-1.414 1.414L7 8.414l-4.95 4.95L.636 11.95 5.586 7 .636 2.05 2.05.636 7 5.586l4.95-4.95z"
            />
          </svg>
        </button>
      </div>
    </div>
  </teleport>
  <button
      class="settings__button"
      @click="isOpen = true"
  >
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
    >
      <path
          fill="#D7E0FF"
          d="M26.965 17.682l-2.927-2.317c.055-.448.097-.903.097-1.365 0-.462-.042-.917-.097-1.365l2.934-2.317a.702.702 0 00.167-.896l-2.775-4.851a.683.683 0 00-.847-.301l-3.454 1.407a10.506 10.506 0 00-2.345-1.379l-.52-3.71A.716.716 0 0016.503 0h-5.55a.703.703 0 00-.687.588l-.52 3.71c-.847.357-1.63.819-2.345 1.379L3.947 4.27a.691.691 0 00-.847.301L.325 9.422a.705.705 0 00.167.896l2.927 2.317c-.055.448-.097.903-.097 1.365 0 .462.042.917.097 1.365L.492 17.682a.702.702 0 00-.167.896L3.1 23.429a.683.683 0 00.847.301L7.4 22.323a10.506 10.506 0 002.345 1.379l.52 3.71c.056.329.34.588.687.588h5.55a.703.703 0 00.687-.588l.52-3.71c.847-.357 1.631-.819 2.346-1.379l3.454 1.407c.313.119.673 0 .847-.301l2.775-4.851a.705.705 0 00-.167-.896zM13.73 18.9c-2.685 0-4.857-2.191-4.857-4.9 0-2.709 2.172-4.9 4.857-4.9 2.684 0 4.856 2.191 4.856 4.9 0 2.71-2.172 4.9-4.856 4.9z"
      />
    </svg>
  </button>
</template>

<script>
import {mapState, mapActions} from 'vuex';

export default {
  props: {
    activeTimer: {
      type: String,
      required: true,
    },
  },

  emits: ['colour-changed'],

  data() {
    return {
      activeColour: 1,
      activeFont: 1,
      isOpen: false,
      fonts: [
        {
          id: 1,
          value: 'Kumbh Sans',
        },
        {
          id: 2,
          value: 'Roboto Slab',
        },
        {
          id: 3,
          value: 'Space Mono',
        },
      ],
      colours: [
        {
          id: 1,
          value: 'Red',
        },
        {
          id: 2,
          value: 'Turquoise',
        },
        {
          id: 3,
          value: 'Magenta',
        },
      ]
    }
  },

  computed: {
    ...mapState({
      durations: state => state.durations,
    }),
  },

  methods: {
    ...mapActions([
      'setDuration',
      'setTotalTime',
    ]),

    closeOverlay() {
      this.isOpen = false;
    },

    durationText(key) {
      switch (key) {
        case 'pomodoro':
          return 'pomodoro';
        case 'short-break':
          return 'short break';
        case 'long-break':
          return 'long break';
      }
    },

    handleClickOutside(event) {
      const overlay = this.$refs.overlay;
      const target = event.target;

      if (target === overlay) {
        this.closeOverlay();
      }
    },

    handleKeyup(event) {
      if (event.key === 'Escape') {
        this.closeOverlay();
      }
    },

    handleColourChange(id) {
      this.activeColour = id;
      document.documentElement.style.setProperty('--primary-colour-active', `var(--primary-colour-${id})`);
      this.$emit('colour-changed', id);
    },

    handleFontChange(id) {
      this.activeFont = id;
      document.documentElement.style.setProperty('--font-family-active', `var(--font-family-${id})`);
    },

    handleDurationChange(payload) {
      const {key, value} = payload;

      if (value < 1 || value > 60) {
        return;
      }

      this.setDuration(payload);

      if (key === this.activeTimer) {
        this.setTotalTime((value * 60))
      }
    },
  },

  mounted() {
    window.addEventListener('keyup', this.handleKeyup);
  },

  beforeUnmount() {
    window.removeEventListener('keyup', this.handleKeyup);
  }
}
</script>

<style lang="scss" scoped src="./app-settings.scss"/>
