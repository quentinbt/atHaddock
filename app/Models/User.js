'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

/** 
*  @swagger
*  definitions:
*    User:
*      type: object
*      properties:
*        id:
*          type: number
*        firstName:
*          type: string
*        lastName:
*          type: string
*        phone:
*          type: string
*        birthDate:
*          type: string
*        nationality:
*          type: string
*        email:
*          type: string
*          format: email
*        password:
*          type: string
*        createdAt:
*          type: string
*          format: date-time
*        updatedAt:
*          type: string
*          format: date-time
*      required:
*        - firstName
*        - lastName
*        - phone
*        - birthDate
*        - nationality
*        - email
*/
class User extends Model {
  static boot () {
    super.boot()

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })
  }

  static get hidden () {
    return ['password']
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens () {
    return this.hasMany('App/Models/Token')
  }
}

module.exports = User
