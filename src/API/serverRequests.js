import axios from "axios";

const instance = axios.create({
    baseURL: `https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address`,
    headers: {
        "Authorization": "Token 3d8dc7d5eff3c5f99b0bbcd21d6aa76ea8d0278c",
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
})


export const dadataAPI = {
    requestAddresses (query) {
        return instance.post(``, {"query": query, "count": 10})
    }
}
