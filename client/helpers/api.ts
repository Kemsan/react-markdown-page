// -- CORE
import axios from 'axios'
// -- DATA
const { API_SERVER_HOST } = process.env
const { API_CLIENT_HOST } = process.env

// Create baseUrl for api
const baseURL = typeof window !== 'undefined' ? API_CLIENT_HOST : API_SERVER_HOST

// Create axios instance
const instance = axios.create({
  baseURL,
  timeout: 60 * 1000,
  withCredentials: true
})

export default instance
