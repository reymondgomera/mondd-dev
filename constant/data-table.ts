export type DataTableConfig = typeof dataTableConfig

export const dataTableConfig = {
  comparisonOperators: [
    { label: 'Is', value: 'equals' as const },
    { label: 'Is not', value: 'notEquals' as const },
    { label: 'Contains', value: 'contains' as const },
    { label: 'Does not contain', value: 'notContains' as const },
    { label: 'Starts with', value: 'startsWith' as const },
    { label: 'Does not start with', value: 'notStartsWith' as const },
    { label: 'Ends with', value: 'endsWith' as const },
    { label: 'Does not end with', value: 'notEndsWith' as const },
    { label: 'Less than', value: 'lt' as const },
    { label: 'Less than or equal to', value: 'lte' as const },
    { label: 'Greater than', value: 'gt' as const },
    { label: 'Greater than or equal to', value: 'gte' as const }
  ],
  selectableOperators: [
    { label: 'Is', value: 'equals' as const },
    { label: 'Is not', value: 'notEquals' as const }
  ]
}
