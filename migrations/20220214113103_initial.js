exports.up = (knex) => {
  return knex.schema.createTable('users', (table) => {
    table.increments('user_id')
    table.string('username').unique().notNullable()
    table.string('passwordHash').notNullable()
    table.string('passwordSalt').notNullable()
  })
    .createTable('decks', (table) => {
      table.increments('deck_id')
      table.string('deckname').notNullable()
      table.integer('user_id').unsigned()
      table.foreign('user_id').references('users.user_id')
    })
}

exports.down = (knex) => {
  return knex.schema
    .dropTable('decks')
    .dropTable('users')
}
