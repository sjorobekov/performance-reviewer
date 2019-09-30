/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
  Route.get('/', () => ({ greeting: 'Welcome to Dasher API' }))

  Route.post('/login', 'SecurityController.login')
  Route.post('/logout', 'SecurityController.logout')
  Route.get('/profile', 'SecurityController.profile')
    .middleware(['auth'])

  Route.get('/profile.js', async ({ response, auth }) => {
    let user = null
    try {
      user = JSON.stringify(await auth.getUser())
    } catch (e) {}

    response.header('Cache-Control', 'private, no-cache, no-store, must-revalidate')
    response.header('Expires', '-1')
    response.header('Pragma', 'no-cache')
    response.header('Content-type', 'application/javascript; charset=UTF-8')
    return `(function(w){w.profile='${user}'})(window)`
  })

  Route.resource('users', 'UserController')
    .apiOnly()
    .validator(new Map([
      [['users.store'], ['UserStore']],
      [['users.update'], ['UserStore']]
    ]))

  Route.get('pending', 'ReviewController.getPending').middleware(['auth'])

  Route.get('reviews', 'ReviewController.index').middleware(['admin'])
  Route.post('reviews', 'ReviewController.store').middleware(['admin'])
    .validator('ReviewStore')
  Route.get('reviews/:id', 'ReviewController.show').middleware(['auth'])
  Route.put('reviews/:id', 'ReviewController.update').middleware(['admin'])
    .validator('ReviewStore')
  Route.delete('reviews/:id', 'ReviewController.destroy').middleware(['admin'])

  Route.get('reviews/:id/items', 'ReviewController.getItems').middleware(['auth'])
  Route.post('reviews/:id/items', 'ReviewController.addItem').middleware(['admin'])
    .validator('ReviewItemsStore')
  Route.put('reviews/:id/items/:itemId', 'ReviewController.updateItem')
    .middleware(['auth'])
    .validator('ReviewItemsUpdate')
  Route.delete('reviews/:id/items/:itemId', 'ReviewController.removeItem')
    .middleware(['admin'])

  Route.post('/validation/check_email', 'ValidationController.checkEmail')
}).prefix('/api/v1')


Route.get('*', ({response}) => response.download('./public/index.html'))

