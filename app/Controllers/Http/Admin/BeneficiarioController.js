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

    async seed ({ response }) {
        const items = [
            { nome: 'João Macedo', descricao: 'solicitacao 1', cep: '69087303', cidade: 'Manaus', bairro: 'Novo Reino', rua: 'Rua Jacunda' },
            { nome: 'Alessandra Nunes', descricao: 'solicitacao 2', cep: '69087240', cidade: 'Manaus', bairro: 'Tancredo Neves', rua: 'Beco Bela Vista' },
            { nome: 'Lívia Costa', descricao: 'solicitacao 3', cep: '69087380', cidade: 'Manaus', bairro: 'Tancredo Neves', rua: 'Rua Trinta e Um de Maio' },
            { nome: 'Filomena cascaes', descricao: 'solicitacao 4', cep: '69088270', cidade: 'Manaus', bairro: 'Jorge Teixeira', rua: 'Rua dos Lírios' },
            { nome: 'Maurício Marreiro', descricao: 'solicitacao 5', cep: '69088495', cidade: 'Manaus', bairro: 'Jorge Teixeira', rua: 'Rua L' },
            { nome: 'Bernadinha Furtado', descricao: 'solicitacao 6', cep: '69099256', cidade: 'Manaus', bairro: 'Cidade Nova', rua: 'Santa Mirtes' },
            { nome: 'Leandro Moreira', descricao: 'solicitacao 7', cep: '69099311', cidade: 'Manaus', bairro: 'Cidade de Deus', rua: 'Travessa São João' },
            { nome: 'Crycia Lopes', descricao: 'solicitacao 8', cep: '69099790', cidade: 'Manaus', bairro: 'Cidade de Deus', rua: 'Rua Rosário do Sul' },
        ]

        for (let i in items) {
            await Beneficiario.create(items[i])
        }

        response.send({ message: "Seed realizado com sucesso" })
    }
}

module.exports = BeneficiarioController