'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RoomSchema extends Schema {
  up () {
    this.table('rooms', (table) => {
      table.integer('userId').unsigned().references('id').inTable('users')
    })
  }

  down () {
    this.table('rooms', (table) => {
      table.dropForeign('userId')
      table.dropColumn('userId')
    })
  }
}

module.exports = RoomSchema
