const { test, trait, beforeEach } = use('Test/Suite')('Room')
const Room = use('App/Models/Room')
const Factory = use('Factory')

trait('Test/ApiClient')
trait('DatabaseTransactions')

test('get list of room', async ({ client }) => {
  const apartment = await Factory.model('App/Models/Apartment').create()
  const room = await Factory.model('App/Models/Room').make()
  await apartment.rooms().save(room)
  const response = await client.get(`/apartments/${apartment.id}/rooms`).end()

  response.assertStatus(200)
  response.assertJSONSubset([{
    number: room.number,
    area: room.area,
    priceCents: room.priceCents,
    apartmentId: apartment.id
  }])
})

test('get detail of a room', async ({ client }) => {
  const apartment = await Factory.model('App/Models/Apartment').create()
  const room = await Factory.model('App/Models/Room').make()
  await apartment.rooms().save(room)
  const response = await client.get(`/apartments/${apartment.id}/rooms/${room.id}`).end()

  response.assertStatus(200)
  response.assertJSONSubset({
    number: room.number,
    area: room.area,
    priceCents: room.priceCents,
    apartmentId: apartment.id
  })
})

test('create an room', async ({ client }) => {
  const apartment = await Factory.model('App/Models/Apartment').create()
  const room = {
    number: 42,
    area: 51.69,
    priceCents: 9999
  }
  const response = await client.post(`/apartments/${apartment.id}/rooms`).send({ room }).end()

  response.assertStatus(201)
  response.assertJSONSubset({
    number: 42,
    area: 51.69,
    priceCents: 9999
  })
})

test('update an apartment', async ({ client }) => {
  const apartment = await Factory.model('App/Models/Apartment').create()
  const room = await Factory.model('App/Models/Room').make()
  await apartment.rooms().save(room)
  const response = await client.put(`/apartments/${apartment.id}/rooms/${room.id}`).send({ room: {number: 42} }).end()

  response.assertStatus(200)
  response.assertJSONSubset({
    number: 42,
    area: room.area,
    priceCents: room.priceCents,
    apartmentId: apartment.id
  })
})

test('delete an apartment', async ({ client, assert }) => {
  const apartment = await Factory.model('App/Models/Apartment').create()
  const room = await Factory.model('App/Models/Room').make()
  await apartment.rooms().save(room)
  const response = await client.delete(`/apartments/${apartment.id}/rooms/${room.id}`).end()

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
