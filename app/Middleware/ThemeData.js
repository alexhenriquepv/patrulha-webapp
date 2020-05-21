'use strict'

const Database = use('Database')

class ThemeData {

  async handle ({ view }, next) {
    let theme = await Database.from('configs').where({ name: 'theme' }).first()
    const currentThemeConfig = JSON.parse(theme.value)
    view.share({ theme: currentThemeConfig })
    await next()
  }
}

module.exports = ThemeData
