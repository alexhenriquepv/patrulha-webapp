$(document).ready(() => {
    $('.btn-del').click((e) => {
        const el = $(e.currentTarget)
        
        $.ajax({
            method: 'DELETE',
            url: el.data('url'),
            data: { '_csrf': $('meta[name=_csrf]').attr('content') },
            beforeSend: () => el.addClass('loading'),
            success: (data) => {
                console.log(data.message)
                el.parents('tr').remove()
            },
            error: (err) => {
                swal('Ocorreu um problema', err.responseText, 'error')
                el.removeClass('loading')
            }
        })
    })
})