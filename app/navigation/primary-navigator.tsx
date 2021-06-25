import React from "react"

import { createNativeStackNavigator } from "react-native-screens/native-stack"
import { WeatherScreen } from "app/screens"

export type PrimaryParamList = {
  weather: undefined
}

const Stack = createNativeStackNavigator<PrimaryParamList>()

export function PrimaryNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
      }}
    >
      <Stack.Screen name="weather" component={WeatherScreen} />
    </Stack.Navigator>
  )
}

const exitRoutes = ["weather"]
export const canExit = (routeName: string) => exitRoutes.includes(routeName)
