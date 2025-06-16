import React from 'react'
import { render, waitFor } from '@testing-library/react-native'
import { Producer } from '@/types'

jest.mock('@/services/producerService', () => ({
  getProducers: jest.fn(),
}))

import HomeScreen from '../app/(tabs)/index'
import { getProducers } from '@/services/producerService'

const mockProducers: Producer[] = [
  {
    id: '1',
    name: 'Prod 1',
    phone: '123',
    country: 'Country 1',
    photo: 'url1',
    lat: 10.123,
    lon: -20.456,
    created_at: '2025-06-16T00:00:00Z',
  },
  {
    id: '2',
    name: 'Prod 2',
    phone: '456',
    country: 'Country 2',
    photo: 'url2',
    lat: 11.789,
    lon: -21.987,
    created_at: '2025-06-16T00:00:00Z',
  },
]

describe('HomeScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('muestra el loader mientras carga', () => {
    (getProducers as jest.Mock).mockReturnValue(new Promise(() => {}))
    const { getByTestId } = render(<HomeScreen />)
    expect(getByTestId('loading-indicator')).toBeTruthy()
  })

  it('muestra la lista de productores después de cargar', async () => {
    (getProducers as jest.Mock).mockResolvedValue(mockProducers)

    const { getByText, queryByTestId } = render(<HomeScreen />)

    await waitFor(() => {
      expect(queryByTestId('loading-indicator')).toBeNull()
    })

    expect(getByText('Prod 1')).toBeTruthy()
    expect(getByText('Prod 2')).toBeTruthy()
  })
})
