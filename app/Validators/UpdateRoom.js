'use strict'

class UpdateRoom {
  get rules () {
    return {
      'room.number': 'integer',
      'room.area': 'number',
      'room.priceCents': 'integer'
    }
  }
}

module.exports = UpdateRoom
