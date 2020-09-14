const { test, trait, beforeEach } = use('Test/Suite')('Apartment')
const Apartment = use('App/Models/Apartment')
const Factory = use('Factory')

trait('Test/ApiClient')
trait('Auth/Client')
trait('DatabaseTransactions')

let user
let apartment

beforeEach(async () => {
  user = await Factory.model('App/Models/User').create()
  apartment = await Factory.model('App/Models/Apartment').create()
})

test('when not auth client get 401 when trying to get list of apartment', async ({ client }) => {
  const response = await client.get('/apartments').end()

  response.assertStatus(401)
})

test('get list of apartment', async ({ client }) => {
  const response = await client.get('/apartments').loginVia(user).end()

  response.assertStatus(200)
  response.assertJSONSubset([{
    name: apartment.name,
    street: apartment.street,
    zipCode: apartment.zipCode,
    city: apartment.city
  }])
})

test('when not auth client get 401 when trying to get detail of an apartment', async ({ client }) => {
  const response = await client.get(`/apartments/${apartment.id}`).end()

  response.assertStatus(401)
})

test('get detail of an apartment', async ({ client }) => {
  const response = await client.get(`/apartments/${apartment.id}`).loginVia(user).end()

  response.assertStatus(200)
  response.assertJSONSubset({
    name: apartment.name,
    street: apartment.street,
    zipCode: apartment.zipCode,
    city: apartment.city
  })
})

test('when not auth client get 401 when trying to create an apartment', async ({ client }) => {
  apartment = {
    name: "whatever",
    street: "42 rue du whatever",
    zipCode: "696969",
    city: "lyon"
  }
  const response = await client.post('/apartments').send({ apartment }).end()

  response.assertStatus(401)
})

test('create an apartment', async ({ client }) => {
  const apartment = {
    name: "whatever",
    street: "42 rue du whatever",
    zipCode: "696969",
    city: "lyon"
  }
  const response = await client.post('/apartments').send({ apartment }).loginVia(user).end()

  response.assertStatus(201)
  response.assertJSONSubset({
    name: "whatever",
    street: "42 rue du whatever",
    zipCode: "696969",
    city: "lyon"
  })
})

test('when not auth client get 401 when trying to update an apartment', async ({ client }) => {
  const response = await client.put(`/apartments/${apartment.id}`).send({ apartment: {name: "not whatever"} }).end()

  response.assertStatus(401)
})

test('update an apartment', async ({ client }) => {
  const response = await client.put(`/apartments/${apartment.id}`).send({ apartment: {name: "not whatever"} }).loginVia(user).end()

  response.assertStatus(200)
  response.assertJSONSubset({
    name: "not whatever",
    street: apartment.street,
    zipCode: apartment.zipCode,
    city: apartment.city
  })
})

test('when not auth client get 401 when trying to delete an apartment', async ({ client, assert }) => {
  const response = await client.delete(`/apartments/${apartment.id}`).end()

  response.assertStatus(401)
})

test('delete an apartment', async ({ client, assert }) => {
  const response = await client.delete(`/apartments/${apartment.id}`).loginVia(user).end()

  response.assertStatus(200)
  response.assertJSONSubset({
    name: apartment.name,
    street: apartment.street,
    zipCode: apartment.zipCode,
    city: apartment.city
  })
  const deleteApartment = await Apartment.find(apartment.id)
  assert.equal(deleteApartment, null)
})
