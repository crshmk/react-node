import axios from 'axios'
import type { AxiosInstance } from 'axios'

const makeAxios = (baseURL: string): AxiosInstance => 
  axios.create({
    baseURL,
    withCredentials: true,
    validateStatus: function (status: number): boolean {
      // Treat 200-299 as successful
      return status >= 200 && status < 300 
    }
  })

export default makeAxios
