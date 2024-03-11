export function formatDate(
    timestamp: number,
    config: {
        format?: any
        humanize?: boolean
    }
) {
    let { format = 'dd/MM/yyyy', humanize = false } = config
    if (!timestamp) return 'No Date specified'
    const date = new Date(timestamp)
    format = format.replace('dd', formatNumber(date.getDate()))
    format = format.replace('MM', formatNumber(date.getMonth() + 1))
    format = format.replace('yyyy', date.getFullYear())
    format = format.replace('hh', formatNumber(date.getHours()))
    format = format.replace('mm', formatNumber(date.getMinutes()))
    if (humanize) {
        const today = formatDate(Date.now(), { ...config, humanize: false })
        if (today === format) return 'Today'
    }
    return format
}

function formatNumber(number: number) {
    return number > 10 ? number : '0' + number.toString()
}

export function formatStandard(time: number | Date) {
    return new Date(time).toLocaleString('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short',
        timeZone: 'Asia/Bangkok',
    })
}

export const formatCurrency = (price: number) => {
    return price.toLocaleString('vie-VN', {
        style: 'currency',
        currency: 'vnd',
    })
}

export const formatPointNumber = (value: Number | string) => {
    let num = Number.parseInt(value.toString().replaceAll('.', ''))
    num = isNaN(num) ? 0 : num
    return new Intl.NumberFormat('vi-VN', {
        style: 'decimal',
    }).format(num)
}

export const transformToISO8601 = (input: string) => {
    // Create a Date object with the input string
    const dateObj = new Date(input)

    // Check if the date is valid
    if (isNaN(dateObj.getTime())) {
        throw new Error('Invalid date format')
    }

    // Convert the Date object to ISO-8601 format
    return dateObj
}

export const getTimeFromDate = (date: Date) => {
    return date.getHours() + ':' + date.getMinutes()
}

export const getDateFromDate = (date: Date) => {
    return (
        date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
    )
}

export function formatDateShort(time: number | Date) {
    return new Date(time).toLocaleString('vi-VN', {
        dateStyle: 'short',
        timeZone: 'Asia/Bangkok',
    })
}

export function formatTimeOnly(time: number | Date) {
    return new Date(time).toLocaleString('vi-VN', {
        timeStyle: 'short',
        timeZone: 'Asia/Bangkok',
    })
}
