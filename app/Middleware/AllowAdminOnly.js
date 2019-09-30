'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
const GE = require('@adonisjs/generic-exceptions')

class AllowAdminOnly {

  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ auth, request }, next) {
    let isAdmin = false

    try {
      let user = await auth.getUser()

      if (user && (user.role === 'ADMIN')) {
        isAdmin = true
      }
    } catch (e) {}

    if (!isAdmin) {
      throw new GE.HttpException(`Only admin can access the route ${request.method()} ${request.url()}`, 403, 'E_ADMIN_ONLY')
    }

    await next()
  }
}

module.exports = AllowAdminOnly
