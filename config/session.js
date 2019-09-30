'use strict'

const Env = use('Env')

module.exports = {
  /*
  |--------------------------------------------------------------------------
  | Session Driver
  |--------------------------------------------------------------------------
  |
  | The session driver to be used for storing session values. It can be
  | cookie, file or redis.
  |
  | For `redis` driver, make sure to install and register `@adonisjs/redis`
  |
  */
  driver: 'redis',

  /*
  |--------------------------------------------------------------------------
  | Cookie Name
  |--------------------------------------------------------------------------
  |
  | The name of the cookie to be used for saving session id. Session ids
  | are signed and encrypted.
  |
  */
  cookieName: 'adonis-sess',

  /*
  |--------------------------------------------------------------------------
  | Clear session when browser closes
  |--------------------------------------------------------------------------
  |
  | If this value is true, the session cookie will be temporary and will be
  | removed when browser closes.
  |
  */
  clearWithBrowser: true,

  /*
  |--------------------------------------------------------------------------
  | Session age
  |--------------------------------------------------------------------------
  |
  | This value is only used when `clearWithBrowser` is set to false. The
  | age must be a valid https://npmjs.org/package/ms string or should
  | be in milliseconds.
  |
  | Valid values are:
  |  '2h', '10d', '5y', '2.5 hrs'
  |
  */
  age: '2h',

  /*
  |--------------------------------------------------------------------------
  | Cookie options
  |--------------------------------------------------------------------------
  |
  | Cookie options defines the options to be used for setting up session
  | cookie
  |
  */
  cookie: {
    httpOnly: true,
    path: '/',
    sameSite: false
  },

  /*
  |--------------------------------------------------------------------------
  | Redis config
  |--------------------------------------------------------------------------
  |
  | The configuration for the redis driver.
  |
  */
  redis: {
    host: Env.getOrFail('REDIS_HOST'),
    port: Env.getOrFail('REDIS_PORT'),
    password: null,
    db: 0,
    keyPrefix: ''
  }
}
