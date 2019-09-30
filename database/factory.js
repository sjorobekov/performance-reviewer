/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')
/** @type {import('../providers/Uuid')} */
const Uuid = use('Uuid')

Factory.blueprint('App/Models/User', async (faker, i, data) => {
  const fullname = faker.name()
  const username = fullname.toLowerCase().replace(' ', '.')

  return {
    id: Uuid.v4(),
    fullname,
    email: data.email || `${username}@reviewer.io`,
    password: 'fake',
    role: data.role || faker.weighted(['USER', 'ADMIN'], [8, 1]),
  }
})

Factory.blueprint('App/Models/Review', async (faker, i, { users, admins }) => {
  return {
    id: Uuid.v4(),
    employee_id: faker.pickone(users).id,
    created_by_id: faker.pickone(admins).id,
  }
})

Factory.blueprint('App/Models/ReviewItem', async (faker, i, { users, reviews }) => {
  const rating = faker.weighted([null, 5, 4, 3, 2, 1], [10, 10, 3, 1, 1, 1])

  return {
    id: Uuid.v4(),
    review_id: faker.pickone(reviews).id,
    assignee_id: faker.pickone(users).id,
    rating,
    feedback: rating === null ? null : faker.paragraph({ sentences: 2})
  }
})
