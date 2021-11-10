<template>
    <b-modal id="responseModal" hide-header hide-footer ok-only >
        <!--Basic text info-->
        <h3>Вы успешно вызвали врача</h3>
        <hr>
        <h4>Информация о вызове:</h4>
        <p class="my-4">Имя:<span style="color: #5bc0de">  {{fullName}}</span></p>
        <p class="my-4">Адрес:<span style="color: #5bc0de">  {{address}}</span></p>
        <p class="my-4">Дата:<span style="color: #5bc0de">  {{reverseDate}}</span></p>

        <!--Result string as in example-->
        <h4>Сервисная информация:</h4>
        <p class="my-4">{{resultString}}</p>

        <!--Close button-->
        <b-button variant="info"
                  style="width: 100%"
                  @click="confirmAppointment">Готово</b-button>
    </b-modal>
</template>

<script>
    export default {
        name: "ModalWindow",
        props: {
            fullName: String,
            address: String,
            appointmentDate: String,
            clearForm: Function,
            resultString: String,
        },
        computed: {
            reverseDate () {
                return this.appointmentDate.split(`-`).reverse().join(`.`)
            },
        },
        methods: {
            confirmAppointment () {
                this.$bvModal.hide('responseModal')
                this.clearForm()
            },
        },
    }
</script>
