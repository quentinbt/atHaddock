const { test, trait, beforeEach } = use('Test/Suite')('Apartment')
const Apartment = use('App/Models/Apartment')
const Factory = use('Factory')

trait('Test/ApiClient')
trait('DatabaseTransactions')

test('get list of apartment', async ({ client }) => {
  const apartment = await Factory.model('App/Models/Apartment').create()
  const response = await client.get('/apartments').end()

  response.assertStatus(200)
  response.assertJSONSubset([{
    name: apartment.name,
    street: apartment.street,
    zipCode: apartment.zipCode,
    city: apartment.city
  }])
})

test('get detail of an apartment', async ({ client }) => {
  const apartment = await Factory.model('App/Models/Apartment').create()
  const response = await client.get(`/apartments/${apartment.id}`).end()

  response.assertStatus(200)
  response.assertJSONSubset({
    name: apartment.name,
    street: apartment.street,
    zipCode: apartment.zipCode,
    city: apartment.city
  })
})

test('create an apartment', async ({ client }) => {
  const apartment = {
    name: "whatever",
    street: "42 rue du whatever",
    zipCode: "696969",
    city: "lyon"
  }
  const response = await client.post('/apartments').send({ apartment }).end()

  response.assertStatus(201)
  response.assertJSONSubset({
    name: "whatever",
    street: "42 rue du whatever",
    zipCode: "696969",
    city: "lyon"
  })
})

test('update an apartment', async ({ client }) => {
  const apartment = await Factory.model('App/Models/Apartment').create()
  const response = await client.put(`/apartments/${apartment.id}`).send({ apartment: {name: "not whatever"} }).end()

  response.assertStatus(200)
  response.assertJSONSubset({
    name: "not whatever",
    street: apartment.street,
    zipCode: apartment.zipCode,
    city: apartment.city
  })
})

test('delete an apartment', async ({ client, assert }) => {
  const apartment = await Factory.model('App/Models/Apartment').create()
  const response = await client.delete(`/apartments/${apartment.id}`).end()

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
