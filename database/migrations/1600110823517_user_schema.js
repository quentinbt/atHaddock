'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.table('users', (table) => {
      table.dropColumn('username')
      table.string('firstName').notNullable()
      table.string('lastName').notNullable()
      table.string('phone').notNullable()
      table.string('birthDate').notNullable()
      table.string('nationality').notNullable()
    })
  }

  down () {
    this.table('users', (table) => {
      table.string('username', 80).notNullable()
      table.dropColumn('firstName')
      table.dropColumn('lastName')
      table.dropColumn('phone')
      table.dropColumn('birthDate')
      table.dropColumn('nationality')
    })
  }
}

module.exports = UserSchema
