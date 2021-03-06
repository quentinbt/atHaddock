'use strict'

const Room = use('App/Models/Room')
const Apartment = use('App/Models/Apartment')

/**
 * Resourceful controller for interacting with rooms
 */
class RoomController {

  /**
  * @swagger
  * /apartments/{apartmentId}/rooms:
  *   get:
  *     summary: rest api to list rooms
  *     security:
  *       - bearerAuth: []
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
  *         description: list rooms
  *         schema:
  *           type: array
  *           items:
  *             $ref: '#/definitions/Room'
  *       401:
  *         description: User is not connected
  *       500:
  *         description: server error
  */
  async index ({ params, response }) {
    const apartment = await Apartment.findOrFail(params.apartments_id)
    const rooms = await apartment.rooms().fetch()
    response.status(200).json(rooms)
  }

  /**
  * @swagger
  * /apartments/{apartmentId}/rooms:
  *   post:
  *     summary: rest api to create an rooms
  *     produces:
  *       - application/json
  *     security:
  *       - bearerAuth: []
  *     parameters:
  *       - in: path
  *         name: apartmentId
  *         schema:
  *           type: integer
  *         required: true
  *         description: Numeric ID of the apartment to get
  *       - name: room
  *         description: Room object
  *         in:  body
  *         required: true
  *         type: string
  *         schema:
  *           type: object
  *           properties:
  *             room:
  *               type: object
  *               properties:
  *                 number:
  *                   type: number
  *                 area:
  *                   type: number
  *                 priceCents:
  *                   type: number
  *     responses:
  *       201:
  *         description: create an room
  *         schema:
  *           type: array
  *           items:
  *             $ref: '#/definitions/Room'
  *       400:
  *         description: missing params
  *       401:
  *         description: User is not connected
  *       500:
  *         description: server error
  */
  async store ({ params, request, response }) {
    const apartment = await Apartment.findOrFail(params.apartments_id)
    const { room } = request.only(['room.number', 'room.area', 'room.priceCents'])
    const createdRoom = await apartment.rooms().create(room)
    response.status(201).json(createdRoom)
  }

  /**
  * @swagger
  * /apartments/{apartmentId}/rooms/{roomId}:
  *   get:
  *     summary: rest api to get details of a room
  *     security:
  *       - bearerAuth: []
  *     produces:
  *       - application/json
  *     parameters:
  *       - in: path
  *         name: apartmentId
  *         schema:
  *           type: integer
  *         required: true
  *         description: Numeric ID of the apartment to get
  *       - in: path
  *         name: roomId
  *         schema:
  *           type: integer
  *         required: true
  *         description: Numeric ID of the room to get
  *     responses:
  *       200:
  *         description: get a room
  *         schema:
  *           $ref: '#/definitions/Room'
  *       401:
  *         description: User is not connected
  *       500:
  *         description: server error
  */
  async show ({ params, response, view }) {
    const apartment = await Apartment.findOrFail(params.apartments_id)
    const room = await Room.findOrFail(params.id)
    response.status(200).json(room)
  }

  /**
  * @swagger
  * /apartments/{apartmentId}/rooms/{roomId}:
  *   put:
  *     summary: rest api to update a room
  *     security:
  *       - bearerAuth: []
  *     produces:
  *       - application/json
  *     parameters:
  *       - in: path
  *         name: apartmentId
  *         schema:
  *           type: integer
  *         required: true
  *         description: Numeric ID of the apartment to get
  *       - in: path
  *         name: roomId
  *         schema:
  *           type: integer
  *         required: true
  *         description: Numeric ID of the room to get
  *       - name: room
  *         description: Room object
  *         in:  body
  *         required: true
  *         type: string
  *         schema:
  *           type: object
  *           properties:
  *             room:
  *               type: object
  *               properties:
  *                 number:
  *                   type: number
  *                 area:
  *                   type: number
  *                 priceCents:
  *                   type: number
  *     responses:
  *       200:
  *         description: updated room
  *         schema:
  *           $ref: '#/definitions/Room'
  *       400:
  *         description: missing params
  *       401:
  *         description: User is not connected
  *       500:
  *         description: server error
  */
  async update ({ params, request, response }) {
    await Apartment.findOrFail(params.apartments_id)
    const roomToUpdate = await Room.findOrFail(params.id)
    const { room } = request.only(['room.number', 'room.area', 'room.priceCents'])
    roomToUpdate.merge(room)
    await roomToUpdate.save()
    response.status(200).json(roomToUpdate)
  }

  /**
  * @swagger
  * /apartments/{apartmentId}/rooms/{roomId}:
  *   delete:
  *     summary: rest api to delete a room
  *     security:
  *       - bearerAuth: []
  *     produces:
  *       - application/json
  *     parameters:
  *       - in: path
  *         name: apartmentId
  *         schema:
  *           type: integer
  *         required: true
  *         description: Numeric ID of the apartment to delete
  *       - in: path
  *         name: roomId
  *         schema:
  *           type: integer
  *         required: true
  *         description: Numeric ID of the room to get
  *     responses:
  *       200:
  *         description: deleted room
  *         schema:
  *           $ref: '#/definitions/Room'
  *       401:
  *         description: User is not connected
  *       500:
  *         description: server error
  */
  async destroy ({ params, response }) {
    await Apartment.findOrFail(params.apartments_id)
    const roomToDelete = await Room.findOrFail(params.id)
    await roomToDelete.delete()
    response.status(200).json(roomToDelete)
  }

  /**
  * @swagger
  * /apartments/{apartmentId}/rooms/{roomId}/rent:
  *   post:
  *     summary: rest api to rent a room for current user
  *     security:
  *       - bearerAuth: []
  *     produces:
  *       - application/json
  *     parameters:
  *       - in: path
  *         name: apartmentId
  *         schema:
  *           type: integer
  *         required: true
  *         description: Numeric ID of the apartment to delete
  *       - in: path
  *         name: roomId
  *         schema:
  *           type: integer
  *         required: true
  *         description: Numeric ID of the room to get
  *     responses:
  *       200:
  *         description: rent room
  *         schema:
  *           $ref: '#/definitions/Room'
  *       401:
  *         description: when room is already rented or user rent an other room
  *       500:
  *         description: server error
  */
  async rent ({ params, auth, response }) {
    await Apartment.findOrFail(params.apartments_id)
    const room = await Room.findOrFail(params.id)
    const currentUser = await auth.getUser()
    if (room.userId) {
      return response.status(401).json({message: 'room has already a tenant'})
    }
    const currentUserRoom = await currentUser.room().fetch()
    if (currentUserRoom) {
      return response.status(401).json({message: 'user has already a room'})
    }
    await room.tenant().associate(currentUser)
    response.status(200).json(room)
  }

  /**
  * @swagger
  * /apartments/{apartmentId}/rooms/{roomId}/unrent:
  *   post:
  *     summary: rest api to unrent a room for current user
  *     security:
  *       - bearerAuth: []
  *     produces:
  *       - application/json
  *     parameters:
  *       - in: path
  *         name: apartmentId
  *         schema:
  *           type: integer
  *         required: true
  *         description: Numeric ID of the apartment to delete
  *       - in: path
  *         name: roomId
  *         schema:
  *           type: integer
  *         required: true
  *         description: Numeric ID of the room to get
  *     responses:
  *       200:
  *         description: rent room
  *         schema:
  *           $ref: '#/definitions/Room'
  *       401:
  *         description: when room is not rended by current user
  *       500:
  *         description: server error
  */
  async unrent ({ params, auth, response }) {
    await Apartment.findOrFail(params.apartments_id)
    const room = await Room.findOrFail(params.id)
    const currentUser = await auth.getUser()
    if (room.userId !== currentUser.id) {
      return response.status(401).json({message: 'you are not tenant of this room'})
    }
    await room.tenant().dissociate(currentUser)
    response.status(200).json(room)
  }
}

module.exports = RoomController
