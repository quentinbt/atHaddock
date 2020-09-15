'use strict'

class UpdateApartment {
  get rules () {
    return {
      'apartment.name': 'string',
      'apartment.street': 'string',
      'apartment.zipCode': 'string',
      'apartment.city': 'string'
    }
  }
}

module.exports = UpdateApartment
