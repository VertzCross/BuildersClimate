import App from "./app/app.tsx"
import { AppRegistry } from "react-native"

const APP_NAME = "BuildersClimate"

const SHOW_STORYBOOK = false

let RootComponent = App
if (__DEV__ && SHOW_STORYBOOK) {
  const { StorybookUIRoot } = require("./storybook")
  RootComponent = StorybookUIRoot
}

AppRegistry.registerComponent(APP_NAME, () => RootComponent)
