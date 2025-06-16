import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Image,
} from 'react-native'
import { getVisits, getOfflineVisits } from '../../services/visitService'
import { Visit } from '../../types'

const VisitHistoryScreen = () => {
  const [visits, setVisits] = useState<Visit[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchVisits = async () => {
      try {
        const online = await getVisits()
        const offline = await getOfflineVisits()
        setVisits([...online, ...offline])
      } catch (error) {
        console.error('Error loading visits', error)
      } finally {
        setLoading(false)
      }
    }

    fetchVisits()
  }, [])

  const renderItem = ({ item }: { item: Visit }) => (
    <View style={styles.card}>
      <Text style={styles.label}>Productor ID:</Text>
      <Text style={styles.value}>{item.producer_id}</Text>

      <Text style={styles.label}>Observaciones:</Text>
      <Text style={styles.value}>{item.observations}</Text>

      <Text style={styles.label}>Ubicación:</Text>
      <Text style={styles.value}>
        {item.lat.toFixed(4)}, {item.lon.toFixed(4)}
      </Text>

      <Text style={styles.label}>Fecha:</Text>
      <Text style={styles.value}>{new Date(item.date).toLocaleString()}</Text>

      {item.photo && (
        <Image source={{ uri: item.photo }} style={styles.image} />
      )}
    </View>
  )

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#6200ee" />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={visits}
        keyExtractor={(item) => item.id || `${item.producer_id}-${item.date}`}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16 }}
        ListEmptyComponent={<Text style={styles.empty}>No hay visitas registradas.</Text>}
      />
    </View>
  )
}

export default VisitHistoryScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  card: {
    backgroundColor: '#f5f5f5',
    marginBottom: 12,
    padding: 12,
    borderRadius: 8,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  value: {
    marginBottom: 8,
    fontSize: 14,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginTop: 8,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  empty: {
    textAlign: 'center',
    marginTop: 40,
    color: '#777',
  },
})
