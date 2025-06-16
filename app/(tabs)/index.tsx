import React, { useEffect, useState } from 'react'
import { View, FlatList, Image, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useRouter } from 'expo-router'
import { getProducers } from '@/services/producerService'
import { Producer } from '@/types'

const HomeScreen = () => {
  const [producers, setProducers] = useState<Producer[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchProducers = async () => {
      try {
        const data = await getProducers()
        setProducers(data)
      } catch (error) {
        console.error('Error fetching producers:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducers()
  }, [])

  const renderItem = ({ item }: { item: Producer }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push({
        pathname: '/register-visit',
        params: { producer: JSON.stringify(item) },
      })
      }
      >
      <Image source={{ uri: item.photo }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.phone}>{item.phone}</Text>
        <Text style={styles.country}>{item.country}</Text>
      </View>
    </TouchableOpacity>
  )

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator testID="loading-indicator" size="large" color="#6200ee" />
      </View>
    )
  }
  

  return (
    <View style={styles.container}>
      <FlatList
        data={producers}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16 }}
      />
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    marginBottom: 12,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  phone: {
    color: '#555',
    marginBottom: 2,
  },
  country: {
    color: '#888',
    fontSize: 12,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
