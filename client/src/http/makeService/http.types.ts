import { AxiosResponse } from 'axios'

export type ReturnFetchedDataType<T = any> = (response: AxiosResponse) => T
