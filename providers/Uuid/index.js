const uuidv4 = require('uuid/v4')

class Uuid {
  v4 () {
    return uuidv4()
  }
}

module.exports = Uuid
