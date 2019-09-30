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

    const { data } = await axios.get('/api/v1/reviews', {
      params: { page, order },
    })

    return data
  },

  async getUnpaginated() {
    const { data } = await axios.get(`/api/v1/reviews?&unpaginated=true`)
    return data
  },

  async create({ commit }, payload) {
    const { data } = await axios.post('/api/v1/reviews', payload)
    return data
  },

  async getById({ commit }, id) {
    const { data } = await axios.get(`/api/v1/reviews/${id}`)
    return data
  },

  async update({ commit }, payload) {
    const { data } = await axios.put(`/api/v1/reviews/${payload.id}`, payload)
    return data
  },

  async remove({ commit }, payload) {
    const { data } = await axios.delete(`/api/v1/reviews/${payload.id}`)
    return data
  },

  async getItems({ commit }, id) {
    const { data } = await axios.get(`/api/v1/reviews/${id}/items`)
    return data
  },

  async addItem({ commit }, payload) {
    const { data } = await axios.post(`/api/v1/reviews/${payload.review_id}/items`, payload)
    return data
  },

  async updateItem({ commit }, payload) {
    const { data } = await axios.put(`/api/v1/reviews/${payload.review_id}/items/${payload.id}`, payload)
    return data
  },

  async removeItem({ commit }, payload) {
    const { data } = await axios.delete(`/api/v1/reviews/${payload.review_id}/items/${payload.id}`, payload)
    return data
  },

  async fetchPending() {
    const { data } = await axios.get(`/api/v1/pending`)
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
