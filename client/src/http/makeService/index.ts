import qs from 'qs'
import makeAxios from './makeAxios'
import type { AxiosInstance, AxiosResponse } from 'axios'

type SerializableValue = string | number | boolean | Date | SerializableValue[] | { [key: string]: SerializableValue } | null | undefined

type QueryParamsType = {
  [key: string]: SerializableValue
}

type RequestMethod = 'get' | 'post' | 'put' | 'delete'

const makeService = (baseURL: string) => {
  const http: AxiosInstance = makeAxios(baseURL)

  const get = async <ResponseType>(route: string, params?: QueryParamsType): Promise<AxiosResponse<ResponseType>> => {
    try {
      const query = qs.stringify(params || {})
      const response: AxiosResponse<ResponseType> = await http.get(`${route}?${query}`)
      return response 
     
    } catch (error) {
    
      console.error(`Error fetching data from ${route}:`, error)
      throw error
    }
  }

  const request = (method: RequestMethod) => async <PayloadType, ResponseDataType>(
    path: string,
    payload?: PayloadType
  ): Promise<AxiosResponse<ResponseDataType>> => {
    try {
      const response: AxiosResponse<ResponseDataType> = await http[method]<ResponseDataType>(path, payload)
      return response
    } catch (error) {
      console.error(`Error posting data to ${path}:`, error)
      throw error
    }
  }

  return {

   /**
     * @template PayloadType The object that will be transformed into query params.
     * @template ResponseDataType The type handed to reponse.data.
     * @param {string} path The URL path.
     * @param {PayloadType} [payload] The data payload to send with the request.
     * @returns {Promise<AxiosResponse<ResponseDataType>>} AxiosResponse with expected response data.
     * 
     * @example 
     *   serverHttp.get<{restaurant: Restaurant}>(`/menus/${restaurantId}`)
     *     .then(res => res?.data?.restaurant)
  */
    get,

  /**
   * @template PayloadType The payload type for the request.
   * @template ResponseDataType The type handed to reponse.data.
   * @param {string} path The URL path.
   * @param {PayloadType} [payload] The data payload to send with the request.
   * @returns {Promise<AxiosResponse<ResponseDataType>>} AxiosResponse with expected response data.
   * 
   * @example 
   *   serverHttp.post<{ menuItem: MenuItem }, { restaurant: Restaurant }>(url, { menuItem })
   *     .then(res => res?.data?.restaurant)
   */
    post: request('post'),

  /**
   * @template PayloadType The payload type for the request.
   * @template ResponseDataType The type handed to reponse.data.
   * @param {string} path The URL path.
   * @param {PayloadType} [payload] The data payload to send with the request.
   * @returns {Promise<AxiosResponse<ResponseDataType>>} AxiosResponse with expected response data.
   * 
   * @example 
   *   serverHttp.put<{menu: Menu}, {restaurant: Restaurant}>(`/menus/${menuId}`, { menu })
   *     .then(res => res?.data?.restaurant)
   */
    put: request('put'),

    /**
   * @template PayloadType The payload type for the request.
   * @template ResponseDataType The type handed to reponse.data.
   * @param {string} path The URL path.
   * @param {PayloadType} [payload] The data payload to send with the request.
   * @returns {Promise<AxiosResponse<ResponseDataType>>} AxiosResponse with expected response data.
   * 
   * @example 
   *   await serverHttp.delete<User>('/users/42')
   */
    delete: request('delete')
  }
}

export default makeService
