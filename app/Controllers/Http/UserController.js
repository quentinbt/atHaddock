'use strict'
const User = use('App/Models/User')

class UserController {

  /**
  * @swagger
  * /login:
  *   post:
  *     summary: rest api to log users
  *     produces:
  *       - application/json
  *     parameters:
  *       - name: credential
  *         description: credential object
  *         in:  body
  *         required: true
  *         type: string
  *         schema:
  *           type: object
  *           properties:
  *             email:
  *               type: string
  *             password:
  *               type: string
  *     responses:
  *       201:
  *         description: login info
  *         schema:
  *           type: object
  *           properties:
  *             status:
  *               type: string
  *             data:
  *               type: string
  *       400:
  *         description: login has failed
  *         schema:
  *           type: object
  *           properties:
  *             status:
  *               type: string
  *             data:
  *               type: string
  */
  async login ({ request, response, auth }) {
    try {
      const login = request.only(['email', 'password'])
      const user = await User.findByOrFail("email", login.email)
      const token = await auth.attempt(
        login.email,
        login.password
      )
      await user.tokens().create({
        token: token.token,
        type: token.type
      })
      return response.status(201).json({
        status: 'success',
        data: token
      })
    } catch (error) {
      response.status(400).json({
        status: 'error',
        message: 'Invalid email/password'
      })
    }
  }

  /**
  * @swagger
  * /signup:
  *   post:
  *     summary: rest api to signup users
  *     produces:
  *       - application/json
  *     parameters:
  *       - name: user
  *         description: User object
  *         in:  body
  *         required: true
  *         type: string
  *         schema:
  *           type: object
  *           properties:
  *             firstName:
  *               type: string
  *             lastName:
  *               type: string
  *             phone:
  *               type: string
  *             birthDate:
  *               type: string
  *             nationality:
  *               type: string
  *             email:
  *               type: string
  *             password:
  *               type: string
  *     responses:
  *       201:
  *         description: signup info
  *         schema:
  *           type: object
  *           properties:
  *             status:
  *               type: string
  *             data:
  *               type: string
  *       400:
  *         description: signup has failed
  *         schema:
  *           type: object
  *           properties:
  *             status:
  *               type: string
  *             data:
  *               type: string
  */
  async signup ({ request, auth, response }) {
    try {
      const signupData = request.only(['firstName', 'lastName', 'phone', 'birthDate', 'nationality', 'email', 'password'])
      const user = await User.create(signupData)
      const token = await auth.generate(user)
      await user.tokens().create({
        token: token.token,
        type: token.type
      })
      return response.status(201).json({
        status: 'success',
        data: token
      })
    } catch (error) {
      return response.status(400).json({
        status: 'error',
        message: 'There was a problem creating the user, please try again later.'
      })
    }
  }

  /**
  * @swagger
  * /whoami:
  *   get:
  *     summary: rest api to get my information
  *     produces:
  *       - application/json
  *     security:
  *       - bearerAuth: []
  *     responses:
  *       200:
  *         description: user info
  *         schema:
  *           $ref: '#/definitions/User'
  */
  async whoami ({ auth, response }) {
    const currentUser = await auth.getUser()
    response.status(200).json(currentUser)
  }
}

module.exports = UserController
