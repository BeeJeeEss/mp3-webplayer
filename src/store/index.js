import Vuex from "vuex"
import Vue from "vue"
import axios from 'axios'
Vue.use(Vuex);

const state = {
    firstData: [],
    album: "",
    currSong: {},

}

const getters = {
    getFirstData(state) {
        return state.firstData
    },
    getCurrSong(state) {
        return state.currSong
    },
}

const actions = {
    getFirstDataAction({ commit }) {
        axios.get('http://localhost:3000/first')
            .then(response => {
                commit('SET_FDATA', response.data)
            })
    },
    nextAction({ commit }) {
        axios.get(`http://localhost:3000/getSongs?album=${state.album}`)
            .then(response => {
                commit('SET_SONGS', response.data)
            })
    }
}

const mutations = {
    SET_FDATA(state, firstData) {
        state.firstData = firstData
    },
    SET_COVER(state, album) {
        state.album = ""
        state.album = album
    },
    SET_SONGS(state, songs) {
        state.firstData.files = songs
    },
    SET_CURR_SONG(state, song) {
        state.currSong = {
            title: song.title,
            dir: song.dir,
            path: `http://localhost:3000/${song.dir}/${song.title}`
        }
    },
}

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})