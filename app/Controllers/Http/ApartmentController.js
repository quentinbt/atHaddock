'use strict'

const Apartment = use('App/Models/Apartment')

/**
 * Resourceful controller for interacting with apartments
 */
class ApartmentController {

  /**
  * @swagger
  * /apartments:
  *   get:
  *     summary: rest api to list apartments
  *     produces:
  *       - application/json
  *     responses:
  *       200:
  *         description: list apartments
  *         schema:
  *           type: array
  *           items:
  *             $ref: '#/definitions/Apartment'
  */
  async index ({ response }) {
    const apartments = await Apartment.all()
    response.status(200).json(apartments)
  }

  /**
  * @swagger
  * /apartments:
  *   post:
  *     summary: rest api to create an apartment
  *     produces:
  *       - application/json
  *     parameters:
  *       - name: apartment
  *         description: Apartment object
  *         in:  body
  *         required: true
  *         type: string
  *         schema:
  *           type: object
  *           properties:
  *             apartment:
  *               type: object
  *               properties:
  *                 name:
  *                   type: string
  *                 street:
  *                   type: string
  *                 zipCode:
  *                   type: string
  *                 city:
  *                   type: string
  *     responses:
  *       201:
  *         description: create an apartment
  *         schema:
  *           type: array
  *           items:
  *             $ref: '#/definitions/Apartment'
  */
  async store ({ request, response }) {
    const { apartment } = request.body
    const createdApartment =  await Apartment.create(apartment)
    response.status(201).json(createdApartment)
  }

  /**
  * @swagger
  * /apartments/{apartmentId}:
  *   get:
  *     summary: rest api to get details of an apartment
  *     produces:
  *       - application/json
  *     parameters:
  *       - in: path
  *         name: apartmentId
  *         schema:
  *           type: integer
  *         required: true
  *         description: Numeric ID of the apartment to get
  *     responses:
  *       200:
  *         description: get an apartment
  *         schema:
  *           $ref: '#/definitions/Apartment'
  */
  async show ({ params, response }) {
    const apartment = await Apartment.findOrFail(params.id)
    response.status(200).json(apartment)
  }

  /**
  * @swagger
  * /apartments/{apartmentId}:
  *   put:
  *     summary: rest api to update an apartment
  *     produces:
  *       - application/json
  *     parameters:
  *       - in: path
  *         name: apartmentId
  *         schema:
  *           type: integer
  *         required: true
  *         description: Numeric ID of the apartment to get
  *       - name: apartment
  *         description: Apartment object
  *         in:  body
  *         required: true
  *         type: string
  *         schema:
  *           type: object
  *           properties:
  *             apartment:
  *               type: object
  *               properties:
  *                 name:
  *                   type: string
  *                 street:
  *                   type: string
  *                 zipCode:
  *                   type: string
  *                 city:
  *                   type: string
  *     responses:
  *       200:
  *         description: updated apartment
  *         schema:
  *           $ref: '#/definitions/Apartment'
  */
  async update ({ params, request, response }) {
    const apartmentToUpdate = await Apartment.findOrFail(params.id)
    const { apartment } = request.body
    apartmentToUpdate.merge(apartment)
    await apartmentToUpdate.save()
    response.status(200).json(apartmentToUpdate)
  }

  /**
  * @swagger
  * /apartments/{apartmentId}:
  *   delete:
  *     summary: rest api to delete an apartment
  *     produces:
  *       - application/json
  *     parameters:
  *       - in: path
  *         name: apartmentId
  *         schema:
  *           type: integer
  *         required: true
  *         description: Numeric ID of the apartment to delete
  *     responses:
  *       200:
  *         description: deleted apartment
  *         schema:
  *           $ref: '#/definitions/Apartment'
  */
  async destroy ({ params, response }) {
    const apartmentToDelete = await Apartment.findOrFail(params.id)
    await apartmentToDelete.delete()
    response.status(200).json(apartmentToDelete)
  }
}

module.exports = ApartmentController
