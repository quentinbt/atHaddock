'use strict'

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

 const Factory = use('Factory')

Factory.blueprint('App/Models/Apartment', async faker => {
  return {
    name: faker.string(),
    street: faker.street(),
    zipCode: faker.zip(),
    city: faker.city()
  }
})

Factory.blueprint('App/Models/Room', async faker => {
  return {
    number: faker.integer({ min: 1, max: 100 }),
    area: faker.floating({ fixed: 2, min: 1, max: 1000 }),
    priceCents: faker.integer({ min: 1, max: 1000 }),
  }
})
