$(document).ready(() => {
    const $form = $("#form")

    $form.form({
        fields: {
            nome: {
                identifier: "nome",
                rules: [
                    { type: "empty", prompt: "Campo nome obrigatório" }
                ]
            },
            descricao: {
                identifier: 'descricao',
                rules: [
                    { type: "empty", prompt: "Campo solicitação obrigatório" }
                ]
            }
        },
        onSuccess: (e, fields) => {
            e.preventDefault()
            $.ajax({
                method: 'POST',
                url: $form.data('url'),
                data: fields,
                success: (res) => {
                    console.log('ok', res)
                    swal('OK', res.message, 'success')
                    $form[0].reset()
                    $(window).scrollTop(0)
                },
                error: (err) => {
                    swal('Ops', err.responseText, 'error')
                }
            })
        }
    })

    $('.ui.dropdown').dropdown()

    $('input[name=cep]').blur((e) => {
        const cep = $(e.currentTarget).val().replace(/\D/g, '')
        const validate = /^[0-9]{8}$/

        if (cep) {
            if (!validate.test(cep)) return

            $.ajax({
                url: `https://viacep.com.br/ws/${cep}/json`,
                success: (data) => {
                    $('input[name=cidade]').val(data.localidade)
                    $('input[name=bairro]').val(data.bairro)
                    $('input[name=rua]').val(data.logradouro)
                },
                error: (err) => console.log(err)
            })
        }
    })
})