'use strict'

const ace = use('@adonisjs/ace')
const Helpers = use('Helpers')

class Install extends ace.Command {
  
  static get signature () {
    return `
      install
      { --theme: Reinstall only theme }
      { --users: Restore default users }
    `
  }

  static get description () {
    return 'Instala o sistema com as configurações iniciais'
  }

  async resetData () {
    this.info('Resetando o banco de dados')
    await ace.call('migration:reset')
    await this.removeDir(Helpers.tmpPath('filemanager/img'))
  }

  async createTables () {
    this.info('Criando as tabelas')
    await ace.call('migration:run')
  }

  async generateConfigFiles () {
    this.info('Gerando arquivos de configuração')
    await this.ensureDir(Helpers.tmpPath('filemanager/img'))
  }

  async onlyTheme () {
    await ace.call("seed", {}, { files: 'ConfigSeeder.js' })
  }

  async onlyDefaultUsers () {
    await ace.call("seed", {}, { files: 'UsuarioSeeder.js' })
  }

  async complete () {
    const reset = await this.confirm("Destruir os dados atuais?")
    try {
      if (reset) await this.resetData()
      await this.createTables()
      await this.generateConfigFiles()
      await this.onlyTheme()
      this.info(`Instalação concluída ${this.icon('success')}`)
    }
    catch (err) {
      this.error(`Falha durante a instalação ${this.icon('error')}`)
      this.error(err)
    }
  }

  async handle (args, flags) {
    if (flags.theme) await this.onlyTheme()
    else if (flags.users) await this.onlyDefaultUsers()
    else this.complete()
  }
}

module.exports = Install
