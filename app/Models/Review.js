'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

/**
 * @property {string} id
 * @property {string} status (PENDING|COMPLETE)
 * @property {Date}   created
 */
class Review extends Model {
  createdBy() {
    return this.belongsTo('App/Models/User', 'created_by_id')
  }

  employee() {
    return this.belongsTo('App/Models/User', 'employee_id')
  }

  items() {
    return this.hasMany('App/Models/ReviewItem')
  }
}

module.exports = Review
