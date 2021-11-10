<template>
  <b-container class="mt-5" @click="hintsActive = false">
    <b-row class="justify-content-center">
      <b-col xs="12" md="6">
        <b-card tag="div">

          <div style="display: flex; justify-content: center">
            <h3 style="text-align: center; margin-right: 10px">Вызов врача на дом</h3>
            <div style="width: 40px;">
              <img style="width: 100%" src="../assets/icons/appLogo.png" alt="appLogo">
            </div>
            <hr class="mb-5">
          </div>

          <b-form>

            <!--Name input-->
            <div class="inputBlock">
              <p>Введите имя:</p>
              <b-form-input id="fullName"
                            type="text"
                            v-model="$v.fullName.$model"
                            class="mb-3"
                            @blur="$v.fullName.$touch()"
              ></b-form-input>
              <p v-if="!$v.fullName.required && $v.fullName.$dirty"
                 class="error"
              >
                Поле обязательно
              </p>
              <p v-if="!$v.fullName.fullNameRegex && $v.fullName.$dirty"
                 class="error"
              >
                Введите полное ФИО, цифры недопустимы
              </p>
            </div>

            <!--Address input-->
            <div class="inputBlock">
              <p>Введите адрес:</p>
              <b-form-input id="address"
                            type="text"
                            v-model="$v.address.$model"
                            class="mb-3"
                            placeholder="Выберите из списка подсказок"
                            @blur="$v.address.$touch()"
                            @input="hintsActive = true"
                            @keydown="showAddressSuggestions(address)"
                            @click.stop="hintsActive = true"
              ></b-form-input>
              <p v-if="!$v.address.required && $v.address.$dirty"
                 class="error"
              >
                Поле обязательно, выберите адрес из списка подсказок
              </p>
            </div>

              <!--Search address hints section-->
              <div v-if="hintsActive" class="hintsHolder">
                <div v-if="getIsLoading" style="display: flex; justify-content: center">
                  <b-spinner variant="info"></b-spinner>
                </div>

                <div v-else-if="!getIsLoading && !getErorr">
                  <p class="hintItem"
                     :key="item.value"
                     v-for="item in getAddressSuggestions"
                     @click="chooseAddress(item.value, item)"
                  >
                    {{item.value}}
                  </p>
                </div>

              </div>

            <!--Date input-->
            <div class="inputBlock">
              <p>Выберите дату:</p>
              <b-form-input id="appointmentDate"
                            type="date"
                            v-model="$v.appointmentDate.$model"
                            :min="dateToday"
                            :max="dateAfterTwoWeeks"
                            class="mb-3"
                            @blur="$v.appointmentDate.$touch()"
              ></b-form-input>
              <p v-if="!$v.appointmentDate.required && $v.appointmentDate.$dirty"
                 class="error"
              >
                Поле обязательно
              </p>
            </div>

            <!--Buttons section-->
            <b-button-group style="display: flex; justify-content: center">
              <b-button class="mt-3"
                        variant="info"
                        :disabled="!$v.fullName.fullNameRegex ||
                    !$v.fullName.required ||
                    !$v.address.required ||
                    !$v.appointmentDate.required ||
                     !addressFromList"
                        @click="setAppointment"
              >
                Записаться
              </b-button>

              <b-button class="mt-3"
                        variant="danger"
                        @click="clearForm"
              >
                Очистить
              </b-button>
            </b-button-group>


          </b-form>

        </b-card>
      </b-col>
    </b-row>

    <ModalWindow :fullName="fullName"
                 :address="address"
                 :appointmentDate="appointmentDate"
                 :clearForm="clearForm"
                 :resultString="resultInfo"
    ></ModalWindow>

  </b-container>
</template>

<script>

  import {getDateAfterTwoWeeks, getTodayDate} from "../utils/dateHelper/dateHelper";
  import {required} from "vuelidate/lib/validators";
  import { helpers } from 'vuelidate/lib/validators'
  import ModalWindow from "./components/modalWindow/ModalWindow";
  import {transliterate} from "../utils/translitToEnglish/translitToEnglish";
  import {nameShortener} from "../utils/nameShortener/nameShortener";
  import {countryTranslate} from "../utils/countryTranslate/countryTranslate";

  //Regexp for fullName input (3 words, 2 chars min)
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
      resultInfo: ``,
      /* For correct app work, the address
      should be chose from the hints list*/
      addressFromList: false,
    }
  },
  computed: {
    // helper for today's date
    dateToday () {
      return getTodayDate()
    },
    // helper for date in two weeks
    dateAfterTwoWeeks () {
      return getDateAfterTwoWeeks()
    },
    // address suggestions from API
    getAddressSuggestions () {
      return this.$store.getters.getAddressSuggestions
    },
    //loading spinner
    getIsLoading () {
      return this.$store.getters.getIsLoading
    },
    //Errors
    getErorr () {
      return this.$store.getters.getError
    },
    //Chosen address
    getCurrSuggestion () {
      return this.$store.getters.getCurrentSuggestion
    },
  },
  methods: {
    showAddressSuggestions (address) {
      this.$store.dispatch(`getAddressSuggestions`, address)
    },
    chooseAddress (clickedHint, hintInfo) {
      this.address = clickedHint
      this.hintsActive = false
      this.$store.commit(`setCurrentSuggestion`, hintInfo)
      this.addressFromList = true
    },
    setAppointment () {
      this.buildResultString()
      this.$bvModal.show('responseModal')
    },
    clearForm () {
      this.fullName = ``
      this.address = ``
      this.appointmentDate = ``
      this.$v.$reset()
      this.addressFromList = false
    },
    //Building result string as in example
    buildResultString () {
      this.resultInfo = countryTranslate(this.getCurrSuggestion.data.country)  + '/'
              + this.getCurrSuggestion.data.region_iso_code + '/'
              + transliterate(nameShortener(this.fullName)) + '/'
              + 'GLAT' + this.getCurrSuggestion.data.geo_lat + '-'
              + 'GLON' + this.getCurrSuggestion.data.geo_lon + '/'
              + this.appointmentDate
    }
  },
  //Validations for input
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

}
</script>

<style scoped>
  .hintsHolder{
    position: absolute;
    top: 304px;
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
    background-color: #0dcaf0;
  }
  .error{
    color: tomato;
    position: absolute;
    bottom: 0;
    padding-left: 3px;
  }
  .inputBlock{
    position: relative;
    padding-bottom: 50px;
  }
</style>
