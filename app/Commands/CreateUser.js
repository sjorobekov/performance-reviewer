'use strict'

const { Command } = require('@adonisjs/ace')
const User = use('App/Models/User')
const Database = use('Database')

class CreateUser extends Command {
  static get signature () {
    return 'create:user'
  }

  static get description () {
    return 'This command creates user in the system'
  }

  async handle (args, options) {
    const user = new User()

    user.email = await this.ask('Enter email:')
    user.fullname = await this.ask('Enter fullname:')
    user.password = await this.secure('Enter password:')

    user.role = await this.choice('Choose role:', ['USER', 'ADMIN'], 'USER')

    try {
      await user.save()
      this.info(`${this.icon('success')} User has been created`)
    } catch (e) {
      this.error(e.message)
    } finally {
      Database.close()
    }
  }
}

module.exports = CreateUser
