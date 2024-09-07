import { get, omit } from 'radash'

export function getClassName(props: Object | undefined, customClassName?: string) {
  if (!props) return ''
  return get<string>(props, customClassName || 'className')
}

export function omitClassName(props: Object | undefined, customClassName?: string | string[]) {
  if (!props) return ''

  if (customClassName && Array.isArray(customClassName)) return omit(props, customClassName as (keyof Object)[])

  return omit(props, [(customClassName || 'className') as keyof Object])
}
