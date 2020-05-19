'use strict'

const path = use('path')
const fs = use('fs')
const _ = use('lodash')
const Helpers = use('Helpers')
const themePublicPath = '/site/themes/default'

class ThemeData {

  async handle ({ view }, next) {
    // const defaultThemeConfig = JSON.parse(fs.readFileSync(Helpers.resourcesPath(`themes/default.json`)))
    const currentThemeConfig = JSON.parse(fs.readFileSync(Helpers.resourcesPath(`themes/current.json`)))
    // const config = Object.assign(defaultThemeConfig, currentThemeConfig)

    view.share({ theme: currentThemeConfig })

    await next()
  }
}

module.exports = ThemeData
