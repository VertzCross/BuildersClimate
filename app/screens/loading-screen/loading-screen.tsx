import React, { useCallback, useEffect, useRef, useState } from "react"
import { Animated, TextStyle, ViewStyle, ImageBackground } from "react-native"
import { observer } from "mobx-react-lite"

import { Text } from "app/components"
import { color, spacing } from "app/theme"

const FULL: ViewStyle = {
  flex: 1,
  position: "absolute",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  height: "100%",
  width: "100%",
  paddingHorizontal: spacing[6],
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: color.palette.white,
}
const LOADING_CLOUD: ViewStyle = {
  height: "100%",
  width: "100%",
  alignItems: "center",
  justifyContent: "center",
}
const LOADING_LOGO: TextStyle = {
  marginTop: spacing[8] + spacing[3],
  color: color.palette.blue,
}

export const LoadingScreen = observer(() => {
  const [isLoading, setIsLoading] = useState(true)
  const fadeAnim = useRef(new Animated.Value(1)).current

  const fadeOut = useCallback(() => {
    return Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 4000,
      useNativeDriver: true,
    }).start(() => {
      setIsLoading(false)
    })
  }, [fadeAnim])

  useEffect(() => {
    fadeOut()
  }, [fadeOut])

  return isLoading ? (
    <Animated.View testID="LoadingScreen" style={{ ...FULL, opacity: fadeAnim }}>
      <ImageBackground style={LOADING_CLOUD} source={require("./cloud.png")} resizeMode="contain">
        <Text preset="title" style={LOADING_LOGO} text="Builders Climate" />
      </ImageBackground>
    </Animated.View>
  ) : null
})
