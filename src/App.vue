<template>
  <b-container class="mt-5">
    <b-row class="justify-content-center">
      <b-col xs="12" md="6">
        <b-card tag="div">

          <h3 style="text-align: center">Вызов врача на дом</h3>
          <hr class="mb-5">

          <p>Введите имя:</p>
          <b-form-input id="fullName"
                        type="text"
                        v-model="fullName"
                        class="mb-3"
          ></b-form-input>

          <p>Введите адрес:</p>
          <b-form-input id="address"
                        type="text"
                        v-model="address"
                        class="mb-3"
          ></b-form-input>

          <p>Выберите дату:</p>
          <b-form-input id="appointmentDate"
                        type="date"
                        v-model="appointmentDate"
                        :min="dateToday"
                        class="mb-3"
          ></b-form-input>

          <b-button class="mt-3" @click="openModal" style="width: 100%" block variant="info">Записаться</b-button>

        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>

import {getTodayDate} from "../utils/dateHelper/dateHelper";

export default {
  name: 'App',
  data () {
    return {
      fullName: ``,
      address: ``,
      appointmentDate: ``,
      modalWindow: false,
    }
  },
  computed: {
    dateToday () {
      return getTodayDate()
    }
  },
  methods: {
    openModal () {
      this.modalWindow = true
    }
  }
}
</script>
