import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import security from './security'
import users from './users'
import reviews from './reviews'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    security,
    users,
    reviews,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
})
