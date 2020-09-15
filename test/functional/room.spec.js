const { test, trait, beforeEach } = use('Test/Suite')('Room')
const Room = use('App/Models/Room')
const Factory = use('Factory')

trait('Test/ApiClient')
trait('Auth/Client')
trait('DatabaseTransactions')

let user
let apartment
let room

beforeEach(async () => {
  user = await Factory.model('App/Models/User').create()
  apartment = await Factory.model('App/Models/Apartment').create()
  room = await Factory.model('App/Models/Room').make()
  await apartment.rooms().save(room)
})

test('when not auth client get 401 when trying to get list of room', async ({ client }) => {
  const response = await client.get(`/apartments/${apartment.id}/rooms`).end()

  response.assertStatus(401)
})

test('get list of room', async ({ client }) => {
  const response = await client.get(`/apartments/${apartment.id}/rooms`).loginVia(user).end()

  response.assertStatus(200)
  response.assertJSONSubset([{
    number: room.number,
    area: room.area,
    priceCents: room.priceCents,
    apartmentId: apartment.id
  }])
})

test('when not auth client get 401 when trying to get detail of a room', async ({ client }) => {
  const response = await client.get(`/apartments/${apartment.id}/rooms/${room.id}`).end()

  response.assertStatus(401)
})

test('get detail of a room', async ({ client }) => {
  const response = await client.get(`/apartments/${apartment.id}/rooms/${room.id}`).loginVia(user).end()

  response.assertStatus(200)
  response.assertJSONSubset({
    number: room.number,
    area: room.area,
    priceCents: room.priceCents,
    apartmentId: apartment.id
  })
})

test('when not auth client get 401 when trying to create a room', async ({ client }) => {
  const room = {
    number: 42,
    area: 51.69,
    priceCents: 9999
  }
  const response = await client.post(`/apartments/${apartment.id}/rooms`).send({ room }).end()

  response.assertStatus(401)
})

test('create a room', async ({ client }) => {
  const room = {
    number: 42,
    area: 51.69,
    priceCents: 9999
  }
  const response = await client.post(`/apartments/${apartment.id}/rooms`).send({ room }).loginVia(user).end()

  response.assertStatus(201)
  response.assertJSONSubset({
    number: 42,
    area: 51.69,
    priceCents: 9999
  })
})

test('when not auth client get 401 when trying to update a room', async ({ client }) => {
  const response = await client.put(`/apartments/${apartment.id}/rooms/${room.id}`).send({ room: {number: 42} }).end()

  response.assertStatus(401)
})

test('update a room', async ({ client }) => {
  const response = await client.put(`/apartments/${apartment.id}/rooms/${room.id}`).send({ room: {number: 42} }).loginVia(user).end()

  response.assertStatus(200)
  response.assertJSONSubset({
    number: 42,
    area: room.area,
    priceCents: room.priceCents,
    apartmentId: apartment.id
  })
})

test('when not auth client get 401 when trying to delete a room', async ({ client, assert }) => {
  const response = await client.delete(`/apartments/${apartment.id}/rooms/${room.id}`).end()

  response.assertStatus(401)
})

test('delete a room', async ({ client, assert }) => {
  const response = await client.delete(`/apartments/${apartment.id}/rooms/${room.id}`).loginVia(user).end()

  response.assertStatus(200)
  response.assertJSONSubset({
    number: room.number,
    area: room.area,
    priceCents: room.priceCents,
    apartmentId: apartment.id
  })
  const deletedRoom = await Room.find(room.id)
  assert.equal(deletedRoom, null)
})

test('when not auth client get 401 when trying to rent a room', async ({ client, assert }) => {
  const response = await client.post(`/apartments/${apartment.id}/rooms/${room.id}/rent`).end()

  response.assertStatus(401)
})

test('rent a room', async ({ client, assert }) => {
  const response = await client.post(`/apartments/${apartment.id}/rooms/${room.id}/rent`).loginVia(user).end()

  response.assertStatus(200)
  response.assertJSONSubset({
    number: room.number,
    area: room.area,
    priceCents: room.priceCents,
    apartmentId: apartment.id,
    user_id: user.id
  })
})

test('get 401 when try to rent a room when user already rent another room', async ({ client, assert }) => {
  await room.tenant().associate(user)
  const response = await client.post(`/apartments/${apartment.id}/rooms/${room.id}/rent`).loginVia(user).end()

  response.assertStatus(401)
})

test('get 401 when try to rent a room already rented', async ({ client, assert }) => {
  const anotherUser = await Factory.model('App/Models/User').create()
  await room.tenant().associate(anotherUser)
  const response = await client.post(`/apartments/${apartment.id}/rooms/${room.id}/rent`).loginVia(user).end()

  response.assertStatus(401)
})
