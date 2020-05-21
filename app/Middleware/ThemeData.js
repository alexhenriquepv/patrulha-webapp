'use strict'

const path = use('path')
const fs = use('fs')
const _ = use('lodash')
const Helpers = use('Helpers')
const themePublicPath = '/site/themes/default'

class ThemeData {

  async handle ({ view }, next) {
    let currentThemeConfig = {}
    const currentFile = Helpers.resourcesPath("themes/current.json")
    const exist = fs.existsSync(currentFile)
    
    if (!exist) {
      const defaultFile = Helpers.resourcesPath("themes/default.json")
      fs.copyFileSync(defaultFile, currentFile)
    }

    currentThemeConfig = JSON.parse(fs.readFileSync(currentFile))

    view.share({ theme: currentThemeConfig })
    await next()
  }
}

module.exports = ThemeData
