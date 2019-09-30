'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

/**
 * @property {string} id
 * @property {number} rating
 * @property {string} feedback
 */
class ReviewItem extends Model {
  assignee() {
    return this.belongsTo('App/Models/User', 'assignee_id')
  }

  review() {
    return this.belongsTo('App/Models/Review')
  }

  static boot () {
    super.boot()
    this.addTrait('NoTimestamp')
  }

  static get table () {
    return 'review_items'
  }
}

module.exports = ReviewItem
