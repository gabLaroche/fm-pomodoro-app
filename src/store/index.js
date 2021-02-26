import {createStore} from 'vuex'

export default createStore({
    state: {
        durations: {
            pomodoro: 25,
            'short-break': 5,
            'long-break': 15,
        },
        totalTime: (25 * 60),
    },
    mutations: {
        setDuration(state, payload) {
            state.durations[payload.key] = payload.value;
        },

        setTotalTime(state, totalTime) {
            state.totalTime = totalTime;
        }
    },
    actions: {
        setDuration(context, payload) {
            context.commit('setDuration', payload);
        },

        setTotalTime(context, totalTime) {
            context.commit('setTotalTime', totalTime);
        }
    },
})
