const { Model } = require('objection')

class UserModel extends Model {
  static get tableName() {
    return 'users'
  }

  static get idColumn() {
    return 'user_id'
  }
}

module.exports = UserModel
