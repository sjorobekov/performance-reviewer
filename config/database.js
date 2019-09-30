/** @type {import('@adonisjs/framework/src/Env')} */
const Env = use('Env')

module.exports = {
  /*
  |--------------------------------------------------------------------------
  | Default Connection
  |--------------------------------------------------------------------------
  |
  | Connection defines the default connection settings to be used while
  | interacting with SQL databases.
  |
  */
  connection: 'pg',

  /*
  |--------------------------------------------------------------------------
  | PostgreSQL
  |--------------------------------------------------------------------------
  |
  | Here we define connection settings for PostgreSQL database.
  |
  | npm i --save pg
  |
  */
  pg: {
    client: 'pg',
    connection: {
      host: Env.getOrFail('DB_HOST'),
      port: Env.getOrFail('DB_PORT'),
      user: Env.getOrFail('DB_USER'),
      password: Env.getOrFail('DB_PASSWORD'),
      database: Env.getOrFail('DB_DATABASE'),
    },
    debug: Env.get('DB_DEBUG', false),
  },
}
