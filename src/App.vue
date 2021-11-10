<template>
  <b-container class="mt-5" @click="hintsActive = false">
    <b-row class="justify-content-center">
      <b-col xs="12" md="6">
        <b-card tag="div">

          <h3 style="text-align: center">Вызов врача на дом</h3>
          <hr class="mb-5">

          <b-form @click.stop="">

            <p>Введите имя:</p>
            <b-form-input id="fullName"
                          type="text"
                          v-model="$v.fullName.$model"
                          class="mb-3"
                          @blur="$v.fullName.$touch()"
            ></b-form-input>
              <p style="color: tomato" v-if="!$v.fullName.required && $v.fullName.$dirty">Поле обязательно</p>
              <p style="color: tomato" v-if="!$v.fullName.fullNameRegex && $v.fullName.$dirty">Введите полное ФИО, цифры недопустимы</p>


            <p>Введите адрес:</p>
            <b-form-input id="address"
                          type="text"
                          v-model="$v.address.$model"
                          class="mb-3"
                          @blur="$v.address.$touch()"
                          @keydown="showAddressSuggestions(address)"
                          @click="hintsActive = true"
            ></b-form-input>
              <p style="color: tomato" v-if="!$v.address.required && $v.address.$dirty">Поле обязательно</p>


              <div v-if="hintsActive" class="hintsHolder">
                <p class="hintItem" :key="item.value" v-for="item in getAddressSuggestions"
                   @click="chooseAddress(item.value)">
                  {{item.value}}</p>
              </div>


            <p>Выберите дату:</p>
            <b-form-input id="appointmentDate"
                          type="date"
                          v-model="$v.appointmentDate.$model"
                          :min="dateToday"
                          :max="dateAfterTwoWeeks"
                          class="mb-3"
                          @blur="$v.appointmentDate.$touch()"
            ></b-form-input>
              <p style="color: tomato" v-if="!$v.appointmentDate.required && $v.appointmentDate.$dirty">Поле обязательно</p>


            <b-button class="mt-3"
                      style="width: 100%" variant="info"
                      :disabled="!$v.fullName.fullNameRegex ||
                    !$v.fullName.required ||
                    !$v.address.required ||
                    !$v.appointmentDate.required"
                      @click="$bvModal.show('responseModal')"
            >
              Записаться
            </b-button>

          </b-form>

        </b-card>
      </b-col>
    </b-row>

    <ModalWindow :fullName="fullName"
                 :address="address"
                 :appointmentDate="appointmentDate"
    ></ModalWindow>

  </b-container>
</template>

<script>

  import {getDateAfterTwoWeeks, getTodayDate} from "../utils/dateHelper/dateHelper";
  import {required} from "vuelidate/lib/validators";
  import { helpers } from 'vuelidate/lib/validators'
  import ModalWindow from "./components/modalWindow/ModalWindow";

  const fullNameRegex = helpers.regex('fullNameRegex',
          /^(([а-яА-ЯёЁ\s]+|[a-zA-Z\s]+){2})+ (([а-яА-ЯёЁ\s]+|[a-zA-Z\s]+){2})+ (([а-яА-ЯёЁ\s]+|[a-zA-Z\s]+){2})+$/)

export default {
  name: 'App',
  data () {
    return {
      fullName: ``,
      address: ``,
      appointmentDate: ``,
      modalWindow: false,
      hintsActive: false,
    }
  },
  computed: {
    dateToday () {
      return getTodayDate()
    },
    dateAfterTwoWeeks () {
      return getDateAfterTwoWeeks()
    },
    getAddressSuggestions () {
      return this.$store.getters.getAddressSuggestions
    }
  },
  validations: {
    fullName: {
      required,
      fullNameRegex,
    },
    address: {
      required,
    },
    appointmentDate: {
      required,
    },
  },
  components: {
    ModalWindow: ModalWindow,
  },
  methods: {
    showAddressSuggestions (address) {
      this.$store.dispatch(`getAddressSuggestions`, address)
    },
    chooseAddress (clickedHint) {
      this.address = clickedHint
      this.hintsActive = false
    }
  }
}
</script>

<style>
  .hintsHolder{
    position: absolute;
    top: 286px;
    left: 50%;
    z-index: 1000;
    background-color: #ffffff;
    box-shadow: 1px 1px 1px #d4d4d4, -1px -1px 1px #d4d4d4;
    border-radius: 5px;
    width: 80%; transform: translateX(-50%)
  }
  .hintItem{
    cursor: pointer;
    margin: 0;
    padding: 3px;
  }
  .hintItem:hover{
    background-color: #5bc0de;
  }
</style>
