import axios from 'axios'

const state = {}

// getters
const getters = {}

// actions
const actions = {
  async getList({ commit }, pagination) {
    const { page } = pagination
    let order

    if (pagination.descending) {
      order = 'desc'
    } else {
      order = 'asc'
    }

    const { data } = await axios.get('/api/v1/users', {
      params: { page, order },
    })

    return data
  },

  async getUnpaginated() {
    const { data } = await axios.get(`/api/v1/users?&unpaginated=true`)
    return data
  },

  async create({ commit }, payload) {
    const { data } = await axios.post('/api/v1/users', payload)
    return data
  },

  async update({ commit }, payload) {
    const { data } = await axios.put(`/api/v1/users/${payload.id}`, payload)
    return data
  },

}

// mutations
const mutations = {}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
