export function parseAddress(addy) {
    if(typeof (addy) != 'string') return ''

    const chunks = addy.split(',')

    return chunks[1] + ', ' + chunks[2]
}