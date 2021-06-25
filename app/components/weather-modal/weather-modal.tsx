import React from "react"
import { observer } from "mobx-react-lite"
import Modal from "react-native-modal"
import {
  View,
  Image,
  ViewStyle,
  ImageBackground,
  ImageStyle,
  TextStyle,
  Linking,
} from "react-native"
import { color, spacing } from "app/theme"
import { Text } from "app/components"
import { useStores } from "app/models"
import { getWeatherIcon } from "app/screens/weather-screen/weatherUtils"

import { TextFieldProps } from "./weather-modal.props"
import { Button } from "../button/button"

const MODAL_CONTAINER: ViewStyle = {
  flex: 1,
  alignItems: "center",
  justifyContent: "flex-end",
  paddingBottom: spacing[4],
  position: "relative",
}

const MODAL_BACKGROUND: ImageStyle = {
  width: 330,
  height: 630,
  alignItems: "center",
  justifyContent: "space-between",
  borderRadius: 10,
  padding: spacing[4],
  overflow: "hidden",
}

const MODAL_OVERLAYER: ViewStyle = {
  position: "absolute",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: color.palette.black,
  opacity: 0.4,
  alignItems: "center",
}
const WEATHER_SECTION: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
}
const TEMP_SECTION: ViewStyle = {
  width: "100%",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  paddingHorizontal: spacing[4],
}

const IMAGE: ImageStyle = { width: 100, height: 100 }
const COPYRIGHT: TextStyle = {
  fontSize: 16,
  fontWeight: "bold",
  marginTop: spacing[5],
  textDecorationColor: color.text,
  textDecorationLine: "underline",
}
const LINK_LINE: ViewStyle = {
  flex: 1,
  backgroundColor: color.text,
  height: 1,
  marginHorizontal: spacing[2],
}

export const WeatherModal = observer((props: TextFieldProps) => {
  const { visible, setVisible, background } = props
  const { ClimateStore } = useStores()

  return (
    <Modal
      style={MODAL_CONTAINER}
      testID="WeatherModal"
      animationIn="slideInRight"
      animationOut="slideOutRight"
      onBackdropPress={() => setVisible(false)}
      isVisible={visible}
      swipeDirection={["right"]}
      onSwipeComplete={() => setVisible(false)}
    >
      <ImageBackground
        source={{ uri: background }}
        style={MODAL_BACKGROUND}
        resizeMode="cover"
        resizeMethod="scale"
      >
        <View style={MODAL_OVERLAYER} />
        <Text preset="title" text={ClimateStore.currentWeather.name} />
        <View style={WEATHER_SECTION}>
          <Image
            source={{ uri: getWeatherIcon(ClimateStore.currentWeather.currentWeather().icon) }}
            style={IMAGE}
          />
          <View>
            <Text preset="title" text={ClimateStore.currentWeather.currentWeather().main} />
            <Text
              preset="subcopy"
              text={ClimateStore.currentWeather.currentWeather().description}
            />
          </View>
        </View>
        <View style={WEATHER_SECTION}>
          <Image
            source={{
              uri: "https://img.icons8.com/plasticine/2x/windy-weather.png",
            }}
            style={IMAGE}
          />
          <View>
            <Text preset="header" text="Speed" />
            <Text
              preset="header"
              text={`${ClimateStore.currentWeather.wind.speed.toFixed(1)} km/h`}
            />
          </View>
        </View>
        <View style={TEMP_SECTION}>
          <Text preset="header" text="Temperature" />
          <View style={LINK_LINE} />
          <Text>
            <Text preset="header" text={ClimateStore.currentWeather.main.temp.toFixed(0)} />
            <Text preset="bold" text="°C" />
          </Text>
        </View>
        <View style={TEMP_SECTION}>
          <Text preset="header" text="Feels Like: " />
          <View style={LINK_LINE} />
          <Text>
            <Text preset="header" text={ClimateStore.currentWeather.main.feels_like.toFixed(0)} />
            <Text preset="bold" text="°C" />
          </Text>
        </View>

        <View style={TEMP_SECTION}>
          <Text preset="header" text="Min Temperature: " />
          <View style={LINK_LINE} />
          <Text>
            <Text preset="header" text={ClimateStore.currentWeather.main.temp_min.toFixed(0)} />
            <Text preset="bold" text="°C" />
          </Text>
        </View>

        <View style={TEMP_SECTION}>
          <Text preset="header" text="Max Temperature: " />
          <View style={LINK_LINE} />
          <Text>
            <Text preset="header" text={ClimateStore.currentWeather.main.temp_max.toFixed(0)} />
            <Text preset="bold" text="°C" />
          </Text>
        </View>

        <View style={TEMP_SECTION}>
          <Text preset="header" text="Pressure: " />
          <View style={LINK_LINE} />
          <Text>
            <Text preset="header" text={ClimateStore.currentWeather.main.pressure.toFixed(0)} />
            <Text preset="bold" text="mb" />
          </Text>
        </View>

        <View style={TEMP_SECTION}>
          <Text preset="header" text="Humidity: " />
          <View style={LINK_LINE} />
          <Text>
            <Text preset="header" text={ClimateStore.currentWeather.main.humidity.toFixed(0)} />
            <Text preset="bold" text="%" />
          </Text>
        </View>
        <Button
          textStyle={COPYRIGHT}
          preset="link"
          text="openweathermap.org"
          onPress={() => {
            Linking.openURL("https://openweathermap.org")
          }}
        />
      </ImageBackground>
    </Modal>
  )
})
