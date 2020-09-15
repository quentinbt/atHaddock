'use strict'

class StoreRoom {
  get rules () {
    return {
      'room.number': 'required|integer',
      'room.area': 'required|number',
      'room.priceCents': 'required|integer'
    }
  }
}

module.exports = StoreRoom
