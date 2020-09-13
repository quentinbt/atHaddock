'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

/** 
*  @swagger
*  definitions:
*    Apartment:
*      type: object
*      properties:
*        id:
*          type: number
*        name:
*          type: string
*        street:
*          type: string
*        zipCode:
*          type: string
*        city:
*          type: string
*        createdAt:
*          type: string
*          format: date-time
*        updatedAt:
*          type: string
*          format: date-time
*      required:
*        - name
*        - street
*        - zipCode
*        - city
*/
class Apartment extends Model {
  rooms () {
    return this.hasMany('App/Models/Room')
  }
}

module.exports = Apartment
