import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import { getSongUrl } from '@/api/player'

export default new Vuex.Store({
  state: {
    songImg: '',
    songUrl: '',
    songName: '',
    songArtists: []
  },
  getters: {
    songImg(state) {
      return state.songImg
    },
    songUrl(state) {
      return state.songUrl
    },
    songName(state) {
      return state.songName
    },
    songArtists(state) {
      return state.songArtists
    }
  },
  mutations: {
    SET_SONGIMG(state, img) {
      state.songImg = img
    },
    SET_SONGURL(state, url) {
      state.songUrl = url
    },
    SET_SONGNAME(state, name) {
      state.songName = name
    },
    SET_SONGARTISTS(state, artists) {
      state.songArtists = artists
    }
  },
  actions: {
    getSongUrlX({ commit }, params) {
      return new Promise((resolve, reject) => {
        getSongUrl(params).then(res => {
          const { data } = res
          commit('SET_SONGURL', data[0].url)
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    getSong({ commit }, data) {
      return new Promise((resolve, reject) => {
        commit('SET_SONGIMG', data.img)
        commit('SET_SONGNAME', data.name)
        commit('SET_SONGARTISTS', data.artists)
        resolve()
      })
    }
  }
})
