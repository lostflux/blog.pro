export const formatDateByLocale = (locale: string, d: Date | string) => {
  return new Date(d).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export const toRelativeDate = (date: Date | string) => {
  const diff = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000)
  if (diff < 60) {
    return 'just now'
  } else if (diff < 3600) {
    return `${Math.floor(diff / 60)} minutes ago`
  } else if (diff < 86400) {
    return `${Math.floor(diff / 3600)} hours ago`
  } else if (diff < 604800) {
    return `${Math.floor(diff / 86400)} days ago`
  } else {
    return null
  }
}

/**
 * Format date to relative date if possible, otherwise format it by locale
 * @param date date to format
 * @returns {string} formatted date
 */
export const formatDate = (date: Date | string) => {
  return toRelativeDate(date) || formatDateByLocale('en-US', date)
}

export const random = (arr: Array<any>) => {
  return arr[Math.floor(Math.random() * arr.length)]
}
