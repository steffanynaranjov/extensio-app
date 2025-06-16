import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Visit } from '../types'

const VISITS_API = 'https://6848999bec44b9f3494165c2.mockapi.io/api/v1/visits'
const OFFLINE_STORAGE_KEY = 'offline_visits'

export const getVisits = async (): Promise<Visit[]> => {
  const res = await axios.get(VISITS_API)
  return res.data
}

export const saveVisit = async (visit: Visit): Promise<void> => {
  await axios.post(VISITS_API, visit)
}

export const saveVisitOffline = async (visit: Visit): Promise<void> => {
  const stored = await AsyncStorage.getItem(OFFLINE_STORAGE_KEY)
  const visits = stored ? JSON.parse(stored) : []
  visits.push(visit)
  await AsyncStorage.setItem(OFFLINE_STORAGE_KEY, JSON.stringify(visits))
}

export const getOfflineVisits = async (): Promise<Visit[]> => {
  const stored = await AsyncStorage.getItem(OFFLINE_STORAGE_KEY)
  return stored ? JSON.parse(stored) : []
}

export const syncOfflineVisits = async (): Promise<void> => {
  const visits = await getOfflineVisits()
  if (!visits.length) return

  for (const visit of visits) {
    try {
      await saveVisit(visit)
    } catch (error) {
      console.error('Error al sincronizar visita offline:', error)
      return
    }
  }

  await AsyncStorage.removeItem(OFFLINE_STORAGE_KEY)
}
