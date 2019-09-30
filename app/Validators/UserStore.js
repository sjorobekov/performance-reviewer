'use strict'

const User = use('App/Models/User')

class UserStore {
  async authorize () {
    const me = await this.ctx.auth.getUser()

    if (me.role !== 'ADMIN') {
      this.ctx.response.unauthorized({message: 'Only admins can manage users'})
      return false
    }

    return true
  }

  get rules () {
    const userId = this.ctx.params.id

    const rules = {
      // validation rules
      email: 'required|email|unique:users',
      password: 'required',
      fullname: 'required',
      role: 'required|in:ADMIN,USER',
    }

    // if updating existing user
    if (userId) {
      rules.email = `required|email|unique:users,email,id,${userId}`
      delete rules.password
      rules.role = 'required|in:ADMIN,USER'
    }

    return rules
  }

  get sanitizationRules () {
    return {
      email: 'normalize_email',
      fullname: 'trim'
    }
  }

  get validateAll () {
    return true
  }
}

module.exports = UserStore
