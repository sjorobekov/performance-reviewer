/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

/**
 * @property {string} id
 * @property {string} email
 * @property {string} password
 * @property {string} fullname
 * @property {string} role   (ADMIN|USER)
 * @property {Date}   created_at
 * @property {Date}   updated_at
 */
class User extends Model {

  static boot() {
    super.boot()

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })
  }

  static get hidden () {
    return ['password']
  }
}

module.exports = User
