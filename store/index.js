import Vue from 'vue'
import Vuex from 'vuex'
import {dadataAPI} from "../API/serverRequests";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        addressSuggestions: null,
        currentSuggestion: null,
        isLoading: false,
        error: null,
    },
    mutations: {
        setAddressSuggestions (state, addressSuggestions) {
            state.addressSuggestions = addressSuggestions
        },
        setCurrentSuggestion (state, currentSuggestion) {
            state.currentSuggestion = currentSuggestion
        },
        setIsLoading (state, isLoading) {
            state.isLoading = isLoading
        },
        setError (state, error) {
            state.error = error
        },
    },
    actions: {
        async getAddressSuggestions ({commit}, query) {
            try {
                commit(`setError`, null)
                commit(`setIsLoading`, true)
                const response = await dadataAPI.requestAddresses(query)
                if(response.data.suggestions.length > 0){
                    commit(`setAddressSuggestions`, response.data.suggestions)
                }else {
                    commit(`setError`, `no results`)
                }
                commit(`setIsLoading`, false)
            }catch (error) {
                commit(`setError`, error.name)
            }

        }
    },
    getters: {
        getAddressSuggestions (state) {
            return state.addressSuggestions
        },
        getCurrentSuggestion (state) {
            return state.currentSuggestion
        },
        getIsLoading (state) {
            return state.isLoading
        },
        getError (state) {
            return state.error
        },
    },
})
