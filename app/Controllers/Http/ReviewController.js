const Review = use('App/Models/Review')
const ReviewItem = use('App/Models/ReviewItem')

const Uuid = use('Uuid')
const Database = use('Database')

class ReviewController {
  async index({ request }) {
    return Database.select('reviews.*', 'employee.fullname as employee_fullname', 'author.fullname as author_fullname')
      .from('reviews')
      .innerJoin('users as employee', 'reviews.employee_id', 'employee.id')
      .leftJoin('users as author', 'reviews.created_by_id', 'author.id')
      .orderBy('reviews.created_at', 'desc')
      .paginate(request.input('page'))
  }

  async store({request, auth}) {
    const review = new Review()
    const me = await auth.getUser()

    review.merge({
      id: Uuid.v4(),
      ...request.only(['employee_id']),
      created_by_id: me.id,
    })

    await review.save()

    return review
  }

  async show({params}) {
    const review = await Review.findOrFail(params.id)
    review._employee = await review.employee().fetch()
    return review
  }

  async update({params, request}) {
    const review = await Review.findOrFail(params.id)

    review.merge({
      ...request.only(['employee_id']),
    })

    await review.save()

    return review
  }

  async getItems({params}) {
    const review = await Review.findOrFail(params.id)

    return Database.select('review_items.*', 'assignee.fullname as assignee_fullname')
      .from('review_items')
      .innerJoin('users as assignee', 'review_items.assignee_id', 'assignee.id')
      .where('review_items.review_id', review.id)
  }

  async addItem({params, request}) {
    const item = new ReviewItem()

    item.merge({
      id: Uuid.v4(),
      ...request.only(['assignee_id']),
      review_id: params.id,
    })

    await item.save()

    item.assignee_fullname = (await item.assignee().fetch()).fullname
    return item
  }

  async getPending({ auth }) {
    const me = await auth.getUser()

    const item = await ReviewItem.query()
      .where('assignee_id', me.id)
      .andWhereRaw('rating IS NULL')
      .first()

    if (item) {
      const review = await item.review().fetch()
      const employee = await review.employee().fetch()
      item.employee_id = employee.id
      item.employee_fullname = employee.fullname
    }

    return item
  }

  async updateItem({params, request}) {
    const item = await ReviewItem.findOrFail(params.itemId)

    item.merge({
      ...request.only(['rating', 'feedback'])
    })

    await item.save()

    return item
  }

  async removeItem({params}) {
    const item = await ReviewItem.findOrFail(params.itemId)

    await item.delete()
  }

  async destroy({params}) {
    const trx = await Database.beginTransaction()

    const review = await Review.findOrFail(params.id)

    try {
      await ReviewItem
        .query()
        .where('review_id', review.id)
        .delete(trx)

      await review.delete(trx)

      await trx.commit()
    } catch (e) {
      await trx.rollback()
      throw new Error('Error while removing Review')
    }
  }
}

module.exports = ReviewController
