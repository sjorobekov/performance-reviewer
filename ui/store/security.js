import axios from 'axios'

const state = {
  profile: JSON.parse(window.profile),
}

// getters
const getters = {
  isLoggedIn (state) {
    return !!state.profile
  },
  isAdmin (state) {
    return state.profile && (state.profile.role === 'ADMIN')
  },
}

// actions
const actions = {
  async fetchProfile({ commit }) {
    const profile = await axios.get('/api/v1/profile')
    commit('setProfile', profile)
    return profile
  },

  async signIn({ commit }, { email, password }) {
    const { data } = await axios.post('/api/v1/login', {
      email,
      password,
    })
    commit('setProfile', data)
    return data
  },

  async signOut({ commit }) {
    const { data } = await axios.post('/api/v1/logout')
    commit('setProfile', null)
    return data
  },
}

// mutations
const mutations = {
  setProfile (state, profile) {
    state.profile = profile
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
