import { TextInputProps } from "react-native"

export interface TextFieldProps extends TextInputProps {
  visible: boolean
  setVisible: Function
  background: string
}
