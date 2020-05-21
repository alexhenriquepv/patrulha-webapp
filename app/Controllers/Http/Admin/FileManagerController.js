'use strict'
const Helpers = use('Helpers')
const fs = use('fs')
const IMG_PATH = "filemanager/img"

class FileManagerController {

    index ({ request, response, view }) {
        const format = request.accepts(['json', 'html'])
        if (format == 'json') {
            const files = fs.readdirSync(Helpers.tmpPath(IMG_PATH))
            return response.send({ files: files })
        }
        
        return view.render('admin/filemanager/index')
    }

    async store ({ request, response }) {
        const file = request.file('file', {
            types: ['image'],
            size: '0.2mb'
        })

        if (!file) {
            return response.status(403).send({ message: "Arquivo inválido" })
        }
        await file.move(Helpers.tmpPath('filemanager/img'))
        if (!file.moved()) {
            console.log(file.error())
            response.status(500).send({ message: "Falha durante o upload" })
        }
        else {
            response.send({ message: "Arquivo enviado!" })
        }
    }

    async show({ params, response }) {
        const path = Helpers.tmpPath(IMG_PATH + "/" + params.name)
        response.download(path)
    }

    async destroy({ params, response }) {
        const path = Helpers.tmpPath(IMG_PATH + "/" + params.name)
        fs.unlinkSync(path)
        response.send({ message: 'Arquivo excluido!' })
    }
}

module.exports = FileManagerController
