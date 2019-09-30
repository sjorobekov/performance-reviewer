class SecurityController {
  async login ({ request, auth }) {
    const { email, password } = request.only(['email', 'password'])

    await auth.attempt(email, password)

    return auth.user
  }

  async logout ({ auth }) {
    await auth.logout()
    return {status: 'ok'}
  }

  async profile ({ auth }) {
    return await auth.getUser()
  }
}

module.exports = SecurityController
