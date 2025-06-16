import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../src/screens/HomeScreen'
import RegisterVisitScreen from '../src/screens/RegisterVisitScreen'
import VisitHistoryScreen from '../src/screens/VisitHistoryScreen'
import { RootStackParamList } from './types'

const Stack = createNativeStackNavigator<RootStackParamList>()

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Productores' }}
        />
        <Stack.Screen
          name="RegisterVisit"
          component={RegisterVisitScreen}
          options={{ title: 'Registrar Visita' }}
        />
        <Stack.Screen
          name="VisitHistory"
          component={VisitHistoryScreen}
          options={{ title: 'Historial de Visitas' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigator
