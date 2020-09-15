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
  .validator(new Map([
    [['apartments.store'], ['StoreApartment']],
    [['apartments.update'], ['UpdateApartment']]
  ]))
Route.resource('apartments.rooms', 'RoomController').middleware(['auth:jwt'])
  .validator(new Map([
    [['apartments.rooms.store'], ['StoreRoom']],
    [['apartments.rooms.update'], ['UpdateRoom']]
  ]))
Route.get('whoami', 'UserController.whoami').middleware(['auth:jwt'])
Route.post('apartments/:apartments_id/rooms/:id/rent', 'RoomController.rent').middleware(['auth:jwt'])
Route.post('apartments/:apartments_id/rooms/:id/unrent', 'RoomController.unrent').middleware(['auth:jwt'])
Route.post('login', 'UserController.login')
  .validator('Login')
Route.post('signup', 'UserController.signup')
