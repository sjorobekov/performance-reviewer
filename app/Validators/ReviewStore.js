'use strict'

class ReviewStore {
  get rules () {
    return {
      employee_id: 'required|exists:users:id',
    }
  }
}

module.exports = ReviewStore
