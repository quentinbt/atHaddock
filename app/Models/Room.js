'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

/** 
*  @swagger
*  definitions:
*    Room:
*      type: object
*      properties:
*        id:
*          type: number
*        number:
*          type: number
*        area:
*          type: number
*        priceCents:
*          type: number
*        apartmentId:
*          type: number
*        createdAt:
*          type: string
*          format: date-time
*        updatedAt:
*          type: string
*          format: date-time
*      required:
*        - number
*        - area
*        - priceCents
*        - apartmentId
*/
class Room extends Model {
  apartment () {
    return this.belongsTo('App/Models/Room')
  }
}

module.exports = Room
