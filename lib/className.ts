import _ from 'lodash'

export function getClassName(props: Object | undefined, customClassName?: string) {
  if (!props) return ''
  return _.get(props, customClassName || 'className')
}

export function omitClassName(props: Object | undefined, customClassName?: string | string[]) {
  if (!props) return ''
  return _.omit(props, customClassName || 'className')
}
