import axios from 'axios'
import { Producer } from '../types'

const API_URL = 'https://6848999bec44b9f3494165c2.mockapi.io/api/v1/producers'

export const getProducers = async (): Promise<Producer[]> => {
  const res = await axios.get(API_URL)
  return res.data
}

export const getProducerById = async (id: string): Promise<Producer> => {
  const res = await axios.get(`${API_URL}/${id}`)
  return res.data
}
