import Vue from 'vue'
import Vuex from 'vuex'
import {dadataAPI} from "../API/serverRequests";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        addressSuggestions: null
    },
    mutations: {
        setAddressSuggestions (state, addressSuggestions) {
            state.addressSuggestions = addressSuggestions
        }
    },
    actions: {
        async getAddressSuggestions ({commit}, query) {
            const response = await dadataAPI.requestAddresses(query)
            commit(`setAddressSuggestions`, response.data.suggestions)
        }
    },
    getters: {
        getAddressSuggestions (state) {
            return state.addressSuggestions
        }
    },
})
