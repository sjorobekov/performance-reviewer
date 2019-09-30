'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ReviewSchema extends Schema {
  up () {
    this.create('reviews', (table) => {
      table.uuid('id').unique().notNullable()
      table.enu('status', ['PENDING', 'COMPLETE'], { useNative: true, enumName: 'review_status' })
        .defaultsTo('PENDING')
      table.uuid('created_by_id').references('id').inTable('users')
      table.uuid('employee_id').references('id').inTable('users')
      table.timestamps()
    })

    this.create('review_items', (table) => {
      table.uuid('id').unique().notNullable()
      table.uuid('review_id').references('id').inTable('reviews')
      table.uuid('assignee_id').references('id').inTable('users')
      table.string('feedback', 255)
      table.integer('rating')
    })
  }

  down () {
    this.drop('reviews')
      .raw('drop type if exists review_status')

    this.drop('review_items')
  }
}

module.exports = ReviewSchema
