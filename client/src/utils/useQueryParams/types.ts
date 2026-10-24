type QueryParamOptions = 'continue' | 'list' | 'others' | 'here'

type QueryParams = {
  [K in QueryParamOptions]?: string  
}
