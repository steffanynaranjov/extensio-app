import axios from 'axios'

const api = axios.create({
  baseURL: 'https://6848999bec44b9f3494165c2.mockapi.io/api/v1/',
  headers: {
    'Content-Type': 'application/json',
  },
})

export default api
