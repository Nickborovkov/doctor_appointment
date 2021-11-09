<template>
    <b-modal id="responseModal">
        <p class="my-4">{{fullName}}</p>
        <p class="my-4">{{address}}</p>
        <p class="my-4">{{appointmentDate}}</p>
    </b-modal>
</template>

<script>
    export default {
        name: "ModalWindow",
        props: {
            fullName: String,
            address: String,
            appointmentDate: String,
        }
    }
</script>

<style scoped>

</style>
