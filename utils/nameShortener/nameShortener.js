export let nameShortener = (fullName) => {
    let shortVersion = fullName.split(` `)
    let result = `${shortVersion[0][0]}${shortVersion[1][0]}${shortVersion[2][0]}`
    return result
}

