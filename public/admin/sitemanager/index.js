
Vue.component('modal', {
    props: ['images'],
    template: `
            <table class="ui celled small compact selectable table">
                <tbody>
                <tr v-for="image in images" v-on:click="$emit('select-item', image)">
                    <td><img :src="'/admin/filemanager/show/' + image" alt="" class="ui image tiny"></td>
                    <td>{{ image }}</td>
                </tr>
                </tbody>
            </table>
        `
})

$('document').ready(() => {
    const $btnChangeImg = $('.btn-change-img')
    const $form = $('#theme-form')

    const modal = new Vue({
        el: '#modal',
        data: {
            active: false,
            target: null,
            images: []
        },
        methods: {
            onSelect: function (image) {
                const parentEl = $(this.target).closest('.ui.card')
                const newpath = '/admin/filemanager/show/' + image
                parentEl.find('img').attr('src', newpath)
                parentEl.find('.field-value').val(newpath)
                swal.close()
            }
        },
        created: function () {
            const self = this
            $.ajax({
                url: '/admin/filemanager',
                success: (data) => {
                    self.images = data.files
                },
                error: (err) => console.log(err)
            })
        }
    })

    $btnChangeImg.click((e) => {
        swal({ content: modal.$el, buttons: false })
        modal.active = true
        modal.target = e.currentTarget
    })

    $form.form({
        onSuccess: (e, fields) => {console.log('submit')
            e.preventDefault()
            $.ajax({
                method: 'POST',
                url: '/admin/sitemanager',
                headers: { 'X-CSRF-TOKEN': $('meta[name=_csrf]').attr('content') },
                data: fields,
                success: (data) => {
                    swal('Ok', data.message, 'success')
                },
                error: (err) => console.log(err)
            })
        },
        onFailure: (err) => console.log(err)
    })
})