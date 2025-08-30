// Data formatting utilities for dates, numbers, currency, and other data types

import { format, formatDistance, formatRelative, parseISO } from 'date-fns'

// Date formatting constants
const DATE_FORMATS = {
  DISPLAY: 'MMM dd, yyyy',
  DISPLAY_WITH_TIME: 'MMM dd, yyyy HH:mm',
  ISO: 'yyyy-MM-dd',
  ISO_WITH_TIME: "yyyy-MM-dd'T'HH:mm:ss",
  SHORT: 'MM/dd/yyyy',
  SHORT_WITH_TIME: 'MM/dd/yyyy HH:mm',
  TIME_ONLY: 'HH:mm',
  TIME_WITH_SECONDS: 'HH:mm:ss',
  MONTH_YEAR: 'MMMM yyyy',
  DAY_MONTH: 'MMM dd',
}

// Currency formatting constants
const CURRENCY_CONFIG = {
  USD: { symbol: '$', code: 'USD', locale: 'en-US' },
  EUR: { symbol: '€', code: 'EUR', locale: 'de-DE' },
  GBP: { symbol: '£', code: 'GBP', locale: 'en-GB' },
  JPY: { symbol: '¥', code: 'JPY', locale: 'ja-JP' },
  CAD: { symbol: 'C$', code: 'CAD', locale: 'en-CA' },
  AUD: { symbol: 'A$', code: 'AUD', locale: 'en-AU' },
}

/**
 * Format date to display string
 * @param {Date|string|number} date - Date to format
 * @param {string} formatStr - Format string (optional)
 * @returns {string} - Formatted date string
 */
export const formatDate = (date, formatStr = DATE_FORMATS.DISPLAY) => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : new Date(date)
    if (isNaN(dateObj.getTime())) return 'Invalid Date'
    return format(dateObj, formatStr)
  } catch (error) {
    return 'Invalid Date'
  }
}

/**
 * Format date to relative time (e.g., "2 hours ago")
 * @param {Date|string|number} date - Date to format
 * @param {Date} baseDate - Base date for comparison (defaults to now)
 * @returns {string} - Relative time string
 */
export const formatRelativeTime = (date, baseDate = new Date()) => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : new Date(date)
    if (isNaN(dateObj.getTime())) return 'Invalid Date'
    return formatDistance(dateObj, baseDate, { addSuffix: true })
  } catch (error) {
    return 'Invalid Date'
  }
}

/**
 * Format date to relative format (e.g., "Today at 2:30 PM")
 * @param {Date|string|number} date - Date to format
 * @param {Date} baseDate - Base date for comparison (defaults to now)
 * @returns {string} - Relative format string
 */
export const formatRelativeDate = (date, baseDate = new Date()) => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : new Date(date)
    if (isNaN(dateObj.getTime())) return 'Invalid Date'
    return formatRelative(dateObj, baseDate)
  } catch (error) {
    return 'Invalid Date'
  }
}

/**
 * Format date to ISO string
 * @param {Date|string|number} date - Date to format
 * @returns {string} - ISO date string
 */
export const formatISODate = (date) => formatDate(date, DATE_FORMATS.ISO)

/**
 * Format date to ISO string with time
 * @param {Date|string|number} date - Date to format
 * @returns {string} - ISO date string with time
 */
export const formatISODateTime = (date) => formatDate(date, DATE_FORMATS.ISO_WITH_TIME)

/**
 * Format date to short format
 * @param {Date|string|number} date - Date to format
 * @returns {string} - Short date string
 */
export const formatShortDate = (date) => formatDate(date, DATE_FORMATS.SHORT)

/**
 * Format date to display format with time
 * @param {Date|string|number} date - Date to format
 * @returns {string} - Date string with time
 */
export const formatDateTime = (date) => formatDate(date, DATE_FORMATS.DISPLAY_WITH_TIME)

/**
 * Format time only
 * @param {Date|string|number} date - Date to format
 * @returns {string} - Time string
 */
export const formatTime = (date) => formatDate(date, DATE_FORMATS.TIME_ONLY)

/**
 * Format time with seconds
 * @param {Date|string|number} date - Date to format
 * @returns {string} - Time string with seconds
 */
export const formatTimeWithSeconds = (date) => formatDate(date, DATE_FORMATS.TIME_WITH_SECONDS)

/**
 * Format month and year
 * @param {Date|string|number} date - Date to format
 * @returns {string} - Month and year string
 */
export const formatMonthYear = (date) => formatDate(date, DATE_FORMATS.MONTH_YEAR)

/**
 * Format day and month
 * @param {Date|string|number} date - Date to format
 * @returns {string} - Day and month string
 */
export const formatDayMonth = (date) => formatDate(date, DATE_FORMATS.DAY_MONTH)

/**
 * Check if date is today
 * @param {Date|string|number} date - Date to check
 * @returns {boolean} - True if date is today
 */
export const isToday = (date) => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : new Date(date)
    const today = new Date()
    return dateObj.toDateString() === today.toDateString()
  } catch (error) {
    return false
  }
}

/**
 * Check if date is yesterday
 * @param {Date|string|number} date - Date to check
 * @returns {boolean} - True if date is yesterday
 */
export const isYesterday = (date) => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : new Date(date)
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    return dateObj.toDateString() === yesterday.toDateString()
  } catch (error) {
    return false
  }
}

/**
 * Check if date is this week
 * @param {Date|string|number} date - Date to check
 * @returns {boolean} - True if date is this week
 */
export const isThisWeek = (date) => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : new Date(date)
    const today = new Date()
    const startOfWeek = new Date(today)
    startOfWeek.setDate(today.getDate() - today.getDay())
    startOfWeek.setHours(0, 0, 0, 0)
    
    const endOfWeek = new Date(startOfWeek)
    endOfWeek.setDate(startOfWeek.getDate() + 6)
    endOfWeek.setHours(23, 59, 59, 999)
    
    return dateObj >= startOfWeek && dateObj <= endOfWeek
  } catch (error) {
    return false
  }
}

/**
 * Format number with thousand separators
 * @param {number} number - Number to format
 * @param {number} decimals - Number of decimal places
 * @param {string} locale - Locale for formatting
 * @returns {string} - Formatted number string
 */
export const formatNumber = (number, decimals = 0, locale = 'en-US') => {
  try {
    if (typeof number !== 'number' || isNaN(number)) return '0'
    
    return new Intl.NumberFormat(locale, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(number)
  } catch (error) {
    return '0'
  }
}

/**
 * Format number as percentage
 * @param {number} number - Number to format (0-1 for decimal, 0-100 for percentage)
 * @param {number} decimals - Number of decimal places
 * @param {boolean} isDecimal - True if number is decimal (0-1), false if percentage (0-100)
 * @returns {string} - Formatted percentage string
 */
export const formatPercentage = (number, decimals = 1, isDecimal = false) => {
  try {
    if (typeof number !== 'number' || isNaN(number)) return '0%'
    
    const percentage = isDecimal ? number * 100 : number
    
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(percentage) + '%'
  } catch (error) {
    return '0%'
  }
}

/**
 * Format currency amount
 * @param {number} amount - Amount to format
 * @param {string} currency - Currency code (USD, EUR, etc.)
 * @param {string} locale - Locale for formatting
 * @returns {string} - Formatted currency string
 */
export const formatCurrency = (amount, currency = 'USD', locale = 'en-US') => {
  try {
    if (typeof amount !== 'number' || isNaN(amount)) return '$0.00'
    
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount)
  } catch (error) {
    return '$0.00'
  }
}

/**
 * Format currency with custom symbol
 * @param {number} amount - Amount to format
 * @param {string} symbol - Currency symbol
 * @param {number} decimals - Number of decimal places
 * @param {string} locale - Locale for formatting
 * @returns {string} - Formatted currency string
 */
export const formatCurrencyCustom = (amount, symbol = '$', decimals = 2, locale = 'en-US') => {
  try {
    if (typeof amount !== 'number' || isNaN(amount)) return `${symbol}0.00`
    
    const formatted = new Intl.NumberFormat(locale, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(amount)
    
    return `${symbol}${formatted}`
  } catch (error) {
    return `${symbol}0.00`
  }
}

/**
 * Format file size in human readable format
 * @param {number} bytes - Number of bytes
 * @param {number} decimals - Number of decimal places
 * @returns {string} - Formatted file size string
 */
export const formatFileSize = (bytes, decimals = 2) => {
  try {
    if (bytes === 0) return '0 Bytes'
    
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
  } catch (error) {
    return '0 Bytes'
  }
}

/**
 * Format phone number
 * @param {string} phone - Phone number string
 * @param {string} format - Format string (e.g., '(###) ###-####')
 * @returns {string} - Formatted phone number
 */
export const formatPhoneNumber = (phone, format = '(###) ###-####') => {
  try {
    if (!phone) return ''
    
    // Remove all non-digit characters
    const digits = phone.replace(/\D/g, '')
    
    if (digits.length === 0) return ''
    
    let result = format
    let digitIndex = 0
    
    for (let i = 0; i < format.length && digitIndex < digits.length; i++) {
      if (format[i] === '#') {
        result = result.replace('#', digits[digitIndex])
        digitIndex++
      }
    }
    
    // Remove any remaining # symbols
    result = result.replace(/#/g, '')
    
    return result
  } catch (error) {
    return phone || ''
  }
}

/**
 * Format credit card number (mask all but last 4 digits)
 * @param {string} cardNumber - Credit card number
 * @param {string} maskChar - Character to use for masking
 * @returns {string} - Masked credit card number
 */
export const formatCreditCard = (cardNumber, maskChar = '*') => {
  try {
    if (!cardNumber) return ''
    
    const digits = cardNumber.replace(/\D/g, '')
    if (digits.length < 4) return cardNumber
    
    const lastFour = digits.slice(-4)
    const masked = maskChar.repeat(digits.length - 4)
    
    return `${masked}${lastFour}`
  } catch (error) {
    return cardNumber || ''
  }
}

/**
 * Format social security number
 * @param {string} ssn - Social security number
 * @returns {string} - Formatted SSN
 */
export const formatSSN = (ssn) => {
  try {
    if (!ssn) return ''
    
    const digits = ssn.replace(/\D/g, '')
    if (digits.length !== 9) return ssn
    
    return `${digits.slice(0, 3)}-${digits.slice(3, 5)}-${digits.slice(5)}`
  } catch (error) {
    return ssn || ''
  }
}

/**
 * Format name (capitalize first letter of each word)
 * @param {string} name - Name string
 * @returns {string} - Formatted name
 */
export const formatName = (name) => {
  try {
    if (!name) return ''
    
    return name
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  } catch (error) {
    return name || ''
  }
}

/**
 * Format initials from name
 * @param {string} name - Name string
 * @param {number} maxInitials - Maximum number of initials
 * @returns {string} - Formatted initials
 */
export const formatInitials = (name, maxInitials = 2) => {
  try {
    if (!name) return ''
    
    const words = name.trim().split(' ').filter(word => word.length > 0)
    const initials = words
      .slice(0, maxInitials)
      .map(word => word.charAt(0).toUpperCase())
      .join('')
    
    return initials
  } catch (error) {
    return ''
  }
}

/**
 * Format text to title case
 * @param {string} text - Text to format
 * @returns {string} - Title case text
 */
export const formatTitleCase = (text) => {
  try {
    if (!text) return ''
    
    const minorWords = ['a', 'an', 'and', 'as', 'at', 'but', 'by', 'for', 'in', 'of', 'on', 'or', 'the', 'to', 'up', 'yet']
    
    return text
      .toLowerCase()
      .split(' ')
      .map((word, index) => {
        if (index === 0 || !minorWords.includes(word)) {
          return word.charAt(0).toUpperCase() + word.slice(1)
        }
        return word
      })
      .join(' ')
  } catch (error) {
    return text || ''
  }
}

/**
 * Format text to sentence case
 * @param {string} text - Text to format
 * @returns {string} - Sentence case text
 */
export const formatSentenceCase = (text) => {
  try {
    if (!text) return ''
    
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
  } catch (error) {
    return text || ''
  }
}

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @param {string} suffix - Suffix to add when truncated
 * @returns {string} - Truncated text
 */
export const truncateText = (text, maxLength = 100, suffix = '...') => {
  try {
    if (!text || text.length <= maxLength) return text
    
    return text.substring(0, maxLength - suffix.length) + suffix
  } catch (error) {
    return text || ''
  }
}

/**
 * Format duration in human readable format
 * @param {number} seconds - Duration in seconds
 * @returns {string} - Formatted duration string
 */
export const formatDuration = (seconds) => {
  try {
    if (typeof seconds !== 'number' || isNaN(seconds)) return '0s'
    
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = Math.floor(seconds % 60)
    
    if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`
    } else if (minutes > 0) {
      return `${minutes}m ${secs}s`
    } else {
      return `${secs}s`
    }
  } catch (error) {
    return '0s'
  }
}

export default {
  formatDate,
  formatRelativeTime,
  formatRelativeDate,
  formatISODate,
  formatISODateTime,
  formatShortDate,
  formatDateTime,
  formatTime,
  formatTimeWithSeconds,
  formatMonthYear,
  formatDayMonth,
  isToday,
  isYesterday,
  isThisWeek,
  formatNumber,
  formatPercentage,
  formatCurrency,
  formatCurrencyCustom,
  formatFileSize,
  formatPhoneNumber,
  formatCreditCard,
  formatSSN,
  formatName,
  formatInitials,
  formatTitleCase,
  formatSentenceCase,
  truncateText,
  formatDuration,
}
