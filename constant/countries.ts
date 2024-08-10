import ct from 'countries-and-timezones'

export const data = ct.getAllCountries()

export const countries = Object.entries(ct.getAllCountries()).map(([key, value]) => ({ code: key, country: value }))
export const countryNames = countries.map((data) => data.country.name)
export const countryCodes = countries.map((data) => data.code)

export type CountryCodes = keyof typeof data
