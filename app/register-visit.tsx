import { useLocalSearchParams, useRouter } from 'expo-router'
import { Producer } from '@/types'
import * as Location from 'expo-location'
import * as ImagePicker from 'expo-image-picker'
import React, { useEffect, useState } from 'react'
import {
  Alert,
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { saveVisit, saveVisitOffline } from '@/services/visitService'

const RegisterVisitScreen = () => {
  const { producer } = useLocalSearchParams()
  const router = useRouter()

  const parsedProducer: Producer = JSON.parse(producer as string)

  const [observations, setObservations] = useState('')
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null)
  const [photo, setPhoto] = useState<string | null>(null)

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        Alert.alert('Permiso denegado', 'Se necesita acceso a la ubicación para continuar.')
        return
      }

      let loc = await Location.getCurrentPositionAsync({})
      setLocation({ lat: loc.coords.latitude, lon: loc.coords.longitude })
    })()
  }, [])

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
      quality: 0.5,
    })

    if (!result.canceled) {
      setPhoto(`data:image/jpeg;base64,${result.assets[0].base64}`)
    }
  }

  const handleSubmit = async () => {
    if (!observations || !location) {
      Alert.alert('Faltan datos', 'Por favor completa todos los campos.')
      return
    }

    const visit = {
      producer_id: parsedProducer.id,
      user_id: 60,
      date: new Date().toISOString(),
      lat: location.lat,
      lon: location.lon,
      observations,
      photo: photo ?? undefined,
    }

    try {
      await saveVisit(visit)
      Alert.alert('Éxito', 'Visita registrada correctamente.')
    } catch (error) {
      await saveVisitOffline(visit)
      Alert.alert('Sin conexión', 'Guardado en modo offline.')
    }

    router.back()
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrar Visita a {parsedProducer.name}</Text>

      <TextInput
        style={styles.input}
        placeholder="Observaciones"
        value={observations}
        onChangeText={setObservations}
        multiline
      />

      <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
        <Text style={styles.imagePickerText}>Seleccionar Foto (opcional)</Text>
      </TouchableOpacity>

      {photo && <Image source={{ uri: photo }} style={styles.image} />}

      <Button title="Guardar Visita" onPress={handleSubmit} color="#6200ee" />
    </View>
  )
}

export default RegisterVisitScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 16,
  },
  input: {
    height: 120,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    borderRadius: 6,
    textAlignVertical: 'top',
    marginBottom: 16,
  },
  imagePicker: {
    marginBottom: 16,
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 6,
  },
  imagePickerText: {
    textAlign: 'center',
    color: '#333',
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 16,
    borderRadius: 6,
  },
})
