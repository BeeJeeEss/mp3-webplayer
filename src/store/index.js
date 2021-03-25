import Vuex from "vuex"
import Vue from "vue"
import axios from 'axios'

Vue.use(Vuex);

const state = {
    firstData: [],
    album: "",
}

const getters = {
    getFirstData: function (state) {
        return state.firstData
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
    getSongs(state, album) {
        state.album = ""
        state.album = album
    },
    SET_SONGS(state, songs) {
        state.firstData.files = songs
    }
}
export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})