'use strict'

const User = use('App/Models/User')
const Uuid = use('Uuid')

class UserController {
  async index({request}) {
    const query = request.get()

    const db = User.query()

    db.orderBy('fullname', request.input('order', 'asc'))

    if (query.unpaginated) {
      return db.fetch()
    } else {
      return db.paginate(request.input('page'))
    }
  }

  async store({request}) {
    const user = new User()

    user.merge({
      id: Uuid.v4(),
      ...request.only(['email', 'fullname', 'password', 'role']),
    })

    await user.save()

    return user
  }

  async show({params}) {
    return User.findOrFail(params.id)
  }

  async update({params, request}) {
    const user = await User.findOrFail(params.id)

    user.merge({
      ...request.only(['email', 'fullname', 'role']),
    })

    const password = request.input('password', null)

    if (password) {
      user.password = password
    }

    await user.save()

    return user
  }

  async destroy({params}) {
    const user = await User.findOrFail(params.id)

    await user.delete()
  }
}

module.exports = UserController
