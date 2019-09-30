/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up() {
    this.create('users', (table) => {
      table.uuid('id').unique().notNullable()
      table.string('email', 254).notNullable().unique()
      table.string('password', 60).notNullable()
      table.string('fullname', 80).notNullable()
      table.enu('role', ['ADMIN', 'USER'], { useNative: true, enumName: 'user_role' }).notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('users')
      .raw('drop type if exists user_role')
  }
}

module.exports = UserSchema
