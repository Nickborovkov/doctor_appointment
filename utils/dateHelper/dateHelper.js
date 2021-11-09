export const getTodayDate = () => {
    let now = new Date()
    let yearNow = String(now.getFullYear())
    let monthNow = String(now.getMonth()+1)
    let dateNow = String(now.getDate()).length === 1
        ? '0' + now.getDate()
        : now.getDate()

    return `${yearNow}-${monthNow}-${dateNow}`
}

export const getDateAfterTwoWeeks = () => {
    let now = new Date(Date.now() + 1209600000)
    let yearNow = String(now.getFullYear())
    let monthNow = String(now.getMonth()+1)
    let dateNow = String(now.getDate()).length === 1
        ? '0' + now.getDate()
        : now.getDate()

    return `${yearNow}-${monthNow}-${dateNow}`
}

