/* Country in the task must be in english,
but the API responds with countries names in russian
here is why this function manually translates most common countries*/

export let countryTranslate = (country) => {
    switch (country) {
        case 'Россия':
            return 'Russia'
        case 'Украина':
            return 'Ukraine'
        case 'Беларусь':
            return 'Belarus'
        case 'Казахстан':
            return 'Kazakhstan'
    }
}
