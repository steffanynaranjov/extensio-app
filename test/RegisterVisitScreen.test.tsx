import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react-native'
import RegisterVisitScreen from '../app/register-visit' // cambia la ruta si es distinta
import * as Location from 'expo-location'
import * as ImagePicker from 'expo-image-picker'
import { Alert } from 'react-native'

jest.mock('expo-router', () => ({
  useRouter: () => ({ back: jest.fn() }),
  useLocalSearchParams: () => ({
    producer: JSON.stringify({
      id: '1',
      name: 'Productor Test',
      phone: '123',
      country: 'País',
      photo: 'url',
      lat: 0,
      lon: 0,
      created_at: '2024-01-01',
    }),
  }),
}))

jest.mock('@/services/visitService', () => ({
  saveVisit: jest.fn(),
  saveVisitOffline: jest.fn(),
}))

jest.mock('expo-location')
jest.mock('expo-image-picker')

jest.spyOn(Alert, 'alert')

describe('RegisterVisitScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    ;(Location.requestForegroundPermissionsAsync as jest.Mock).mockResolvedValue({ status: 'granted' })
    ;(Location.getCurrentPositionAsync as jest.Mock).mockResolvedValue({
      coords: { latitude: 10, longitude: 20 },
    })
  })

  it('muestra el nombre del productor y permite escribir observaciones', async () => {
    const { getByText, getByPlaceholderText } = render(<RegisterVisitScreen />)

    await waitFor(() => expect(Location.getCurrentPositionAsync).toHaveBeenCalled())

    expect(getByText('Registrar Visita a Productor Test')).toBeTruthy()

    const input = getByPlaceholderText('Observaciones')
    fireEvent.changeText(input, 'Todo bien')

    expect(input.props.value).toBe('Todo bien')
  })
})
