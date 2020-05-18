$(document).ready(() => {
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
                <div class="item">
                    <img src="/admin/filemanager/show/${f}" alt="Teste" class="ui small image">
                    <div class="content">
                        <div class="header">
                            ${f}
                        </div>
                    </div>
                    <div class="right floated content">
                        <button class="ui button icon">
                            <i class="icon trash"></i>
                        </button>
                    </div>
                </div>
            `.trim()

            $fileList.append(template)
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

                if (selection) doUpload(el.files[0])
            }
            reader.readAsDataURL(el.files[0])
        })
        el.click()
    })

    getFiles()
})