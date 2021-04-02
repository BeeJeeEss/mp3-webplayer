import Vuex from "vuex"
import Vue from "vue"
import axios from 'axios'
Vue.use(Vuex);

const state = {
    firstData: [],
    album: "",
    currSong: {},
    songToAdd: {},
    playlist: {},
    in: false,
    src: 'http://localhost:3000/icons/playlist.svg',
    header: 'mp3 player',
}

const getters = {
    getFirstData(state) {
        return state.firstData
    },
    getCurrSong(state) {
        return state.currSong
    },
    getSongToAdd(state) {
        return state.songToAdd
    },
    getIn(state) {
        return state.in
    },
    getPlaySrc(state) {
        return state.src
    },
    getHeader(state) {
        return state.header
    }
}

const actions = {
    getFirstDataAction({ commit }) {
        axios.get('http://localhost:3000/first')
            .then(response => {
                commit('SET_FDATA', response.data)
                commit('SET_IN', false)
                commit('SET_SRC', 'http://localhost:3000/icons/playlist.svg')
                commit("SET_HEADER", "mp3 player");
            })
    },
    nextAction({ commit }) {
        axios.get(`http://localhost:3000/getSongs?album=${state.album}`)
            .then(response => {
                commit('SET_SONGS', response.data)
                commit('SET_IN', false)
                commit('SET_SRC', 'http://localhost:3000/icons/playlist.svg')
                commit("SET_HEADER", "mp3 player");
            })
    },
    sendSong({ commit }) {
        axios.get(`http://localhost:3000/add?song=${JSON.stringify(state.songToAdd)}`)
            .then(response => {
                commit('SET_SONGS', response.data)

            })
    },
    getPlaylistAction({ commit }) {
        axios.get('http://localhost:3000/playlist')
            .then(response => {
                commit('SET_SONGS', response.data)
            })
    },
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
    SET_SONG_PLAYLIST(state, song) {
        console.log("piosnka", song)
        state.songToAdd = {
            file: song.file,
            dir: song.dir,
        }
    },
    SET_IN(state, value) {
        state.in = value
    },
    SET_SRC(state, value) {
        state.src = value
    },
    SET_HEADER(state, value) {
        state.header = value
    }
}

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})