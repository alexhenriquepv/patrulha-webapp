'use strict'

const fs = use('fs')
const Helpers = use('Helpers')

class SiteManagerController {

    index ({ view }) {
        return view.render('admin/sitemanager/index')
    }

    store ({ request, response }) {
        const data = request.post()
        const themeFile = Helpers.resourcesPath('themes/current.json')
        const currentConfig = fs.readFileSync(themeFile)
        const config = Object.assign(JSON.parse(currentConfig), data.theme)
        fs.writeFileSync(themeFile, JSON.stringify(config, null, 4))
        response.send({ message: "O site foi atualizado" })
    }
}

module.exports = SiteManagerController
