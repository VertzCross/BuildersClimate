import Geolocation from "@react-native-community/geolocation"

export const getCurrentLocation = (setLocation) =>
  Geolocation.getCurrentPosition((location) => {
    const { latitude, longitude } = location.coords
    setLocation({ latitude, longitude })
  })

export const watchLocation = (setLocation) => {
  Geolocation.watchPosition((location) => {
    const { latitude, longitude } = location.coords
    setLocation({ latitude, longitude })
  })
}

export const clearWatcher = () => Geolocation.stopObserving()
