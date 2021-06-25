import React, { useEffect, useState, useCallback } from "react"
import {
  Platform,
  View,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  Image,
  ImageStyle,
} from "react-native"
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps"
import { observer } from "mobx-react-lite"
import { Header, Screen, Text, WeatherModal } from "app/components"
import { color, typography } from "app/theme"
import { useStores } from "app/models"
import { watchLocation, clearWatcher, getCurrentLocation } from "app/utils/geolocation"

import { getWeatherBackground, getWeatherIcon } from "./weatherUtils"

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  flex: 1,
  backgroundColor: color.transparent,
}
const MAP: ViewStyle = {
  flex: 1,
  height: "100%",
  width: "100%",
  alignItems: "center",
}
const WEATHER_TAG: ViewStyle = {
  alignItems: "flex-end",
  position: "absolute",
  right: 0,
  top: "15%",
  height: 120,
  width: 150,
  borderBottomStartRadius: 10,
  borderTopStartRadius: 10,
  backgroundColor: color.palette.blue,
  opacity: 0.7,
  shadowColor: color.palette.black,
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.5,
  shadowRadius: 5,
  elevation: Platform.OS === "ios" ? 5 : 0,
}
const WEATHER_TAG_CONTENT: ViewStyle = {
  backgroundColor: color.transparent,
  alignItems: "center",
  alignSelf: "center",
}
const WEATHER_TAG_TITLE: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
}
const TEXT: TextStyle = {
  color: color.palette.white,
  fontFamily: typography.primary,
}

const HEADER_TITLE: TextStyle = {
  ...TEXT,
  fontWeight: "bold",
  fontSize: 18,
  textAlign: "center",
  letterSpacing: 1.5,
}

const IMAGE: ImageStyle = { width: 60, height: 60 }

export const WeatherScreen = observer(() => {
  const { ClimateStore } = useStores()
  const [isVisible, setVisible] = useState(false)
  const [mapRegion, setMapRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  })

  const initializeScreen = useCallback(async () => {
    watchLocation(async (value: { latitude: number; longitude: number }) => {
      await ClimateStore.getCurrentWeather(value)
      setMapRegion(ClimateStore.currentWeather.mapLocation())
    })
  }, [ClimateStore, setMapRegion])

  useEffect(() => {
    initializeScreen()
    return () => clearWatcher()
  }, [initializeScreen])

  return (
    <View testID="WeatherScreen" style={FULL}>
      <Header
        headerText={ClimateStore.currentWeather.name || "BuilderClimate"}
        titleStyle={HEADER_TITLE}
        rightIcon="cloud"
        onRightPress={() =>
          getCurrentLocation(async (value: { latitude: number; longitude: number }) => {
            await ClimateStore.getCurrentWeather(value)
            setMapRegion(ClimateStore.currentWeather.mapLocation())
          })
        }
      />
      <Screen style={CONTAINER} preset="fixed" unsafe>
        <MapView provider={PROVIDER_GOOGLE} style={MAP} region={mapRegion}>
          {ClimateStore.currentWeather.coord && (
            <Marker
              coordinate={{
                latitude: ClimateStore.currentWeather.mapLocation().latitude,
                longitude: ClimateStore.currentWeather.mapLocation().longitude,
              }}
              title="You"
              description="Your current location"
            />
          )}
        </MapView>
        {!isVisible && ClimateStore.currentWeather.coord && (
          <View style={WEATHER_TAG} testID="WeatherTag">
            <TouchableOpacity style={WEATHER_TAG_CONTENT} onPress={() => setVisible(true)}>
              <View style={WEATHER_TAG_TITLE}>
                <Image
                  source={{
                    uri: getWeatherIcon(ClimateStore.currentWeather.currentWeather().icon),
                  }}
                  style={IMAGE}
                />
                <Text preset="header" text={ClimateStore.currentWeather.currentWeather().main} />
              </View>
              <Text>
                <Text preset="bold" text="Temperature: " />
                <Text text={ClimateStore.currentWeather.currentWeather().temp.toFixed(0)} />
                <Text preset="secondary" text="°C" />
              </Text>
              <Text text={ClimateStore.currentWeather.currentWeather().description} />
            </TouchableOpacity>
          </View>
        )}
        {ClimateStore.currentWeather.coord && (
          <WeatherModal
            visible={isVisible}
            setVisible={setVisible}
            background={getWeatherBackground[ClimateStore.currentWeather.currentWeather().main]}
          />
        )}
      </Screen>
    </View>
  )
})
