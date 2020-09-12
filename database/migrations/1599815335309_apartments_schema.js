'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ApartmentsSchema extends Schema {
  up () {
    this.create('apartments', (table) => {
      table.increments()
      table.string('name').notNullable()
      table.string('street').notNullable()
      table.string('zipCode').notNullable()
      table.string('city').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('apartments')
  }
}

module.exports = ApartmentsSchema
