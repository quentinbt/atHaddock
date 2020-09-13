'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RoomSchema extends Schema {
  up () {
    this.create('rooms', (table) => {
      table.increments()
      table.integer('number').notNullable()
      table.float('area').notNullable()
      table.integer('priceCents').notNullable()
      table.integer('apartmentId').unsigned().references('id').inTable('apartments')
      table.timestamps()
    })
  }

  down () {
    this.drop('rooms')
  }
}

module.exports = RoomSchema
