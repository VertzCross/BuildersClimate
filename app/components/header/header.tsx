import React from "react"
import { View, ViewStyle, TextStyle } from "react-native"
import LinearGradient from "react-native-linear-gradient"

import { HeaderProps } from "./header.props"
import { Button, Text, Icon } from "app/components"
import { spacing, color } from "app/theme"
import { translate } from "app/i18n/"

const isIos = Platform.OS === "ios"

const ROOT: ViewStyle = {
  flexDirection: "row",
  paddingHorizontal: spacing[4],
  alignItems: "center",
  paddingTop: isIos ? spacing[8] : spacing[4],
  paddingBottom: spacing[5],
  justifyContent: "flex-start",
}
const TITLE: TextStyle = { textAlign: "center" }
const TITLE_MIDDLE: ViewStyle = { flex: 1, justifyContent: "center" }
const LEFT: ViewStyle = { width: 32 }
const RIGHT: ViewStyle = { width: 32 }

/**
 * Header that appears on many screens. Will hold navigation buttons and screen title.
 */
export function Header(props: HeaderProps) {
  const {
    onLeftPress,
    onRightPress,
    rightIcon,
    leftIcon,
    headerText,
    headerTx,
    style,
    titleStyle,
  } = props
  const header = headerText || (headerTx && translate(headerTx)) || ""

  return (
    <LinearGradient
      colors={[color.palette.blue, color.palette.lightBlue]}
      style={{ ...ROOT, ...style }}
    >
      {leftIcon ? (
        <Button preset="link" onPress={onLeftPress}>
          <Icon icon={leftIcon} />
        </Button>
      ) : (
        <View style={LEFT} />
      )}
      <View style={TITLE_MIDDLE}>
        <Text style={{ ...TITLE, ...titleStyle }} text={header} />
      </View>
      {rightIcon ? (
        <Button preset="link" onPress={onRightPress}>
          <Icon icon={rightIcon} />
        </Button>
      ) : (
        <View style={RIGHT} />
      )}
    </LinearGradient>
  )
}
