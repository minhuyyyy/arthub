export const combineSellerNickname = (arr: any[]): string => {
    let result = ''

    arr.forEach((element) => {
        result += element.sellerNickname + ', '
    })

    return result.slice(0, -2)
}

export function parseDateString(dateString: string): Date | null {
    const parts = dateString.split(/\/|\s|:/) // Split the string using /, space, and : as delimiters
    if (parts.length === 5) {
        const year =
            parseInt(parts[2], 10) > 2000
                ? parseInt(parts[2], 10)
                : parseInt(parts[2], 10) + 2000 // Assuming 2-digit year, adjust as needed
        const month = parseInt(parts[1], 10) - 1 // Months are 0-based in JavaScript Date object
        const day = parseInt(parts[0], 10)
        const hours = parseInt(parts[3], 10)
        const minutes = parseInt(parts[4], 10)

        if (
            !isNaN(year) &&
            !isNaN(month) &&
            !isNaN(day) &&
            !isNaN(hours) &&
            !isNaN(minutes)
        ) {
            return new Date(year, month, day, hours, minutes)
        }
    }

    // Return null if parsing fails
    return null
}

export function randomString(length: number): string {
    const result = []
    const characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    const charactersLength = characters.length
    for (let i = 0; i < length; i++) {
        result.push(
            characters.charAt(Math.floor(Math.random() * charactersLength))
        )
    }
    return result.join('')
}
