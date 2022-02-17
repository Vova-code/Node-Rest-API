const { Model } = require('objection')
const User = require('./UserModel')

class DeckModel extends Model {
  static get tableName() {
    return 'decks'
  }

  static get idColumn() {
    return 'deck_id'
  }

  static get relationMappings() {
    return {
      owner: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'decks.user_id',
          to: 'users.user_id'
        }
      }
    }
  }
}

module.exports = DeckModel
