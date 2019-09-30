'use strict'

class ReviewItemsStore {
  get rules () {
    return {
      assignee_id: 'required|exists:users:id',
    }
  }
}

module.exports = ReviewItemsStore
