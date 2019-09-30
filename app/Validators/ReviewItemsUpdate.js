'use strict'
const ReviewItem = use('App/Models/ReviewItem')

class ReviewItemsUpdate {
  async authorize () {
    const me = await this.ctx.auth.getUser()

    const reviewItem = await ReviewItem.findOrFail(this.ctx.params.itemId)

    if (reviewItem.assignee_id !== me.id) {
      this.ctx.response.unauthorized({message: 'You are not authorized to make this review'})
      return false
    }

    return true
  }

  get rules () {
    return {
      rating: 'required|integer|range:0,6',
      feedback: 'max:255',
    }
  }
}

module.exports = ReviewItemsUpdate
