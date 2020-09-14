'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

const Route = use('Route')

Route.get('/', () => {
  return { status: 'server is UP!' }
})

Route.resource('apartments', 'ApartmentController').middleware(['auth:jwt'])
Route.resource('apartments.rooms', 'RoomController').middleware(['auth:jwt'])
Route.get('whoami', 'UserController.whoami').middleware(['auth:jwt'])
Route.post('login', 'UserController.login')
Route.post('signup', 'UserController.signup')
