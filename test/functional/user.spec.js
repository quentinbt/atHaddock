const { test, trait } = use('Test/Suite')('User')
const User = use('App/Models/User')
const Factory = use('Factory')

trait('Test/ApiClient')
trait('Auth/Client')
trait('DatabaseTransactions')

test('login should return token infos when succeed', async ({ client }) => {
  const user = await Factory.model('App/Models/User').create()
  const response = await client.post('/login').send({email: user.email, password: "password"}).end()

  const tokens = await user.tokens().fetch()
  response.assertStatus(201)
  response.assertJSONSubset({
    status: 'success',
    data: {
      type: 'bearer',
      token: tokens.rows[tokens.rows.length - 1].token,
      refreshToken: null
    }
  })
})

test('login should return 401 when wrong credential', async ({ client }) => {
  const user = await Factory.model('App/Models/User').create()
  const response = await client.post('/login').send({email: user.email, password: "password2"}).end()

  response.assertStatus(400)
})

test('sign should return token infos when succeed and create the user', async ({ client }) => {
  const response = await client.post('/signup').send({firstName: 'captain', lastName: 'haddock', phone: 'whatever', birthDate: 'whatever', nationality: 'whatever', email: 'captain@haddock.fr', password: "password"}).end()

  const user = await User.findBy('email', 'captain@haddock.fr')
  const tokens = await user.tokens().fetch()
  response.assertStatus(201)
  response.assertJSONSubset({
    status: 'success',
    data: {
      type: 'bearer',
      token: tokens.rows[tokens.rows.length - 1].token,
      refreshToken: null
    }
  })
})

test('login should return 401 when wrong credential', async ({ client }) => {
  const response = await client.post('/signup').send({email: 'ladf'}).end()

  response.assertStatus(400)
})

test('when not auth client get 401 when trying to get whoami', async ({ client }) => {
  const user = await Factory.model('App/Models/User').create()
  const response = await client.get(`/whoami`).end()

  response.assertStatus(401)
})

test('get detail of a room', async ({ client }) => {
  const user = await Factory.model('App/Models/User').create()
  const response = await client.get(`whoami`).loginVia(user).end()

  response.assertStatus(200)
  response.assertJSONSubset({
    firstName: user.firstName,
    lastName: user.lastName,
    phone: user.phone,
    birthDate: user.birthDate,
    nationality: user.nationality,
    email: user.email 
  })
})
