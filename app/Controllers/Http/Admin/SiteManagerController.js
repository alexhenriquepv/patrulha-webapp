'use strict'

const Database = use('Database')

class SiteManagerController {

    index ({ view }) {
        return view.render('admin/sitemanager/index')
    }

    async store ({ request, response }) {
        const data = request.post()
        await Database
            .from('configs')
            .where({ name: 'theme' })
            .update({ value: JSON.stringify(data.theme) })
        response.send({ message: "O site foi atualizado" })
    }
}

module.exports = SiteManagerController
