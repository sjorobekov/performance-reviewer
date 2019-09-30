const { ServiceProvider } = require('@adonisjs/fold')

class UuidServiceProvider extends ServiceProvider {
  register() {
    this.app.singleton('Uuid', () => {
      return new (require('.'))()
    })
  }
}

module.exports = UuidServiceProvider
