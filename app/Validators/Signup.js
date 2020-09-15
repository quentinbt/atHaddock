'use strict'

class Signup {
  get rules () {
    return {
      'firstName': 'required|string',
      'lastName': 'required|string',
      'phone': 'required|string',
      'birthDate': 'required|string',
      'nationality': 'required|string',
      'email': 'required|email',
      'password': 'required|string'
    }
  }
}

module.exports = Signup
