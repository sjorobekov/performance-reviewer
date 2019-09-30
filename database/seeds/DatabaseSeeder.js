'use strict'

/*
|--------------------------------------------------------------------------
| DatabaseSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const User = use('App/Models/User')

class DatabaseSeeder {
  async run () {
    const admin = await User.findBy('email', 'admin@reviewer.io')

    if (!admin) {
      await Factory
        .model('App/Models/User')
        .create({role: 'ADMIN', email: 'admin@reviewer.io'})
    }

    const admins = await Factory
      .model('App/Models/User')
      .createMany(10, {role: 'ADMIN'})

    const users = await Factory
      .model('App/Models/User')
      .createMany(50, {role: 'USER'})

    const reviews = await Factory
      .model('App/Models/Review')
      .createMany(10, { users, admins })

    const reviewItems = await Factory
      .model('App/Models/ReviewItem')
      .createMany(50, { users, reviews })
  }
}

module.exports = DatabaseSeeder
