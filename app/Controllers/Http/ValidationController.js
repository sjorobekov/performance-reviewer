'use strict'

const User = use('App/Models/User')

class ValidationController {
  async checkEmail({request}) {
    const email = request.input('email')
    const id = request.input('id', null)

    const user = await User.findBy({ email })

    const result = {}

    if (!id) {
      result.valid = !user
    } else {
      result.valid = !user || user.id === id
    }

    if (!result.valid) {
      result.data = {
        message: `This email is already taken.`
      }
    }

    return result
  }
}

module.exports = ValidationController
