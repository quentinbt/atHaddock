'use strict'

class StoreApartment {
  get rules () {
    return {
      'apartment.name': 'required|string',
      'apartment.street': 'required|string',
      'apartment.zipCode': 'required|string',
      'apartment.city': 'required|string'
    }
  }
}

module.exports = StoreApartment
