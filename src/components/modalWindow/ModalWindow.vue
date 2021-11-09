<template>
    <b-modal id="responseModal" hide-header hide-footer ok-only >
        <h3>Вы успешно вызвали врача</h3>
        <hr>
        <h4>Информация о вызове:</h4>
        <p class="my-4">Имя:<span style="color: #5bc0de">  {{fullName}}</span></p>
        <p class="my-4">Адрес:<span style="color: #5bc0de">  {{address}}</span></p>
        <p class="my-4">Дата:<span style="color: #5bc0de">  {{reverseDate}}</span></p>
        <h4>Сервисная информация:</h4>
        <p class="my-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam amet aut blanditiis, consectetur consequuntur delectus dicta dolorem eligendi est facilis iusto molestiae nesciunt nisi nostrum nulla, odio omnis porro praesentium quam quos reiciendis rem saepe sit voluptas voluptatibus. Accusamus architecto aut error nemo omnis similique temporibus vel veniam! Dolor, eveniet.</p>
        <b-button variant="info" style="width: 100%" @click="$bvModal.hide('responseModal')">Close Me</b-button>
    </b-modal>
</template>

<script>
    export default {
        name: "ModalWindow",
        props: {
            fullName: String,
            address: String,
            appointmentDate: String,
        },
        computed: {
            reverseDate () {
                return this.appointmentDate.split(`-`).reverse().join(`.`)
            }
        }
    }
</script>

<style scoped>

</style>
