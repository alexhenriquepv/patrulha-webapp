'use strict'

const Factory = use('Factory')
const Database = use('Database')
const Helpers = use('Helpers')
const fs = use('fs')

class ConfigSeeder {
  async run () {
    const themeDefaultData = fs.readFileSync(Helpers.resourcesPath('themes/default.json'), "utf8")
    try {
      await Database.table('configs').truncate()
      await Factory.get('configs').create({ name: "theme", value: themeDefaultData })
      console.log('seed config ok')
    }
    catch (err) {
      console.log(err)
    }
  }
}

module.exports = ConfigSeeder
