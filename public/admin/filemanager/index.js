$(document).ready(() => {
    const MAX_FILE_SIZE = 200000 // bytes
    $btnSelectFile = $('#btn-file-select')
    $fileList = $('#file-list')

    function getFiles () {
        $.ajax({
            url: $fileList.data('url'),
            beforeSend: () => $fileList.toggleClass('loading'),
            success: (data) => appendToList(data.files),
            error: (err) => swal('Ocorreu um problema', err.responseText, 'error'),
            complete: () => $fileList.toggleClass('loading')
        })
    }

    function appendToList(files) {
        $fileList.html('')
        files.forEach(f => {
            const template = `
                <div class="item" data-url="/admin/filemanager/${f}">
                    <img src="/admin/filemanager/show/${f}" alt="Teste" class="ui small image">
                    <div class="content">
                        <div class="header">
                            ${f}
                        </div>
                    </div>
                    <div class="right floated content">
                        <button class="ui button icon btn-file-delete">
                            <i class="icon trash"></i>
                        </button>
                    </div>
                </div>
            `.trim()

            $fileList.append(template)
        })
        listenDeletes()
    }

    function listenDeletes () {
        $('.btn-file-delete').click((e) => {
            const el = $(e.currentTarget)
            const parent = el.closest('.item')
            $.ajax({
                method: 'DELETE',
                url: parent.data('url'),
                headers: { 'X-CSRF-TOKEN': $('meta[name="_csrf"]').attr('content') },
                beforeSend: () => el.addClass('loading'),
                success: () => parent.remove(),
                error: (err) => {
                    swal('Ocorreu um problema', err.responseText, 'error')
                    el.removeClass('loading')
                }
            })
        })
    }

    function doUpload(file) {
        const formData = new FormData()
        formData.append('file', file)

        $.ajax({
            method: 'POST',
            url: $btnSelectFile.data('url'),
            headers: { 'X-CSRF-TOKEN': $('meta[name="_csrf"]').attr('content') },
            data: formData,
            contentType: false,
            processData: false,
            success: () => {
                swal.close()
                getFiles()
            },
            error: (err) => { swal('Ocorreu um problema', err.responseText, 'error') },
            complete: () => swal.stopLoading()
        })
    }

    $btnSelectFile.click(() => {
        const el = document.createElement('input')
        el.type = 'file'
        el.addEventListener('change', () => {
            const reader = new FileReader()
            reader.onload = async (e) => {
                const selection = await swal({
                    text: el.files[0].name,
                    icon: e.target.result,
                    buttons: {
                        confirm: { text: 'Enviar', closeModal: false },
                        cancel: { text: 'Cancelar', visible: true }
                    }
                })

                if (selection) {
                    const img = new Image()
                    img.src = e.target.result
                    img.onload = () => {
                        const fileSize = el.files[0].size
                        const proportion = fileSize / MAX_FILE_SIZE
                        if (proportion > 1) {
                            const canvas = document.createElement('canvas')
                            const ctx = canvas.getContext('2d')
                            canvas.width = img.naturalWidth / proportion
                            canvas.height = img.naturalHeight / proportion
                            ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
                            ctx.canvas.toBlob((b) => {
                                const f = new File([b], el.files[0].name, {
                                    type: 'image/jpeg'
                                })
                                doUpload(f)
                            })
                        }
                        else {
                            doUpload(f)
                        }
                    }
                }
            }
            reader.readAsDataURL(el.files[0])
        })
        el.click()
    })

    getFiles()
})