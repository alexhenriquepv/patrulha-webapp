'use strict'
const Beneficiario = use('App/Models/Beneficiario')
const Database = use('Database')

class BeneficiarioController {

    async index ({ view, request }) {
        const page = request.input('page', 1)
        const nome = request.input('nome')
        let query = Database.from('beneficiarios')
        
        if (nome) {
            query.where('nome','like','%' + nome + '%')
        }

        const beneficiarios = await query.paginate(page, 3)
        return view.render('admin/beneficiarios/index', { beneficiarios })
    }

    async show ({ request, view }) {
        const id = request.params.id
        const beneficiario = await Beneficiario.find(id)
        return view.render('admin/beneficiarios/show', { beneficiario })
    }

    async mapa({ view }) {
        return view.render('admin/beneficiarios/mapa')
    }

    async store ({ request, response }) {
        const data = request.only([
            "nome","contato","cpf","rg","estado_civil","escolaridade",
            "profissao","ocupacao","cep","cidade","bairro","rua","complemento",
            "ponto_referencia","condicao_moradia","com_deficiencia","descricao"
        ])
        await Beneficiario.create(data)
        response.send({ message: 'Cadastro finalizado!' })
    }

    async destroy ({ request, response }) {
        const id = request.params.id
        await Beneficiario.query().where('id', id).delete()
        response.send({ message: 'Registro excluido!' })
    }
}

module.exports = BeneficiarioController