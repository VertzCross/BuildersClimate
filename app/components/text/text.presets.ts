import { TextStyle } from "react-native"
import { color, typography } from "../../theme"

const BASE: TextStyle = {
  fontFamily: typography.primary,
  color: color.text,
  fontSize: 15,
}

export const presets = {
  default: BASE,

  bold: { ...BASE, fontWeight: "bold" } as TextStyle,

  header: { ...BASE, fontSize: 24, fontWeight: "bold" } as TextStyle,

  title: { ...BASE, fontSize: 34, fontWeight: "bold" } as TextStyle,

  subcopy: { ...BASE, fontSize: 16 } as TextStyle,

  fieldLabel: { ...BASE, fontSize: 13, color: color.dim } as TextStyle,

  secondary: { ...BASE, fontSize: 9, color: color.text } as TextStyle,
}

export type TextPresets = keyof typeof presets
