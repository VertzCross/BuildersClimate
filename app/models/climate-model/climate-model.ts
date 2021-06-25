/* eslint-disable @typescript-eslint/camelcase */
import { Instance, SnapshotOut, types } from "mobx-state-tree"

export const ClimateModel = types
  .model("Climate")
  .props({
    id: types.maybeNull(types.number),
    name: types.maybeNull(types.string),
    coord: types.maybeNull(types.model({ lat: types.number, lon: types.number })),
    weather: types.array(
      types.model({
        id: types.number,
        main: types.string,
        description: types.string,
        icon: types.string,
      }),
    ),
    main: types.maybeNull(
      types.model({
        feels_like: types.number,
        humidity: types.number,
        pressure: types.number,
        temp: types.number,
        temp_max: types.number,
        temp_min: types.number,
      }),
    ),
    base: types.maybeNull(types.string),
    clouds: types.maybeNull(types.model({ all: types.number })),
    wind: types.maybeNull(
      types.model({
        deg: types.maybeNull(types.number),
        gust: types.maybeNull(types.number),
        speed: types.maybeNull(types.number),
      }),
    ),
  })
  .views((self) => ({
    mapLocation: () => {
      return {
        latitude: self.coord.lat,
        longitude: self.coord.lon,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }
    },
    currentWeather: () => {
      return { ...self.weather[0], temp: self.main.temp }
    },
  }))

type ClimateType = Instance<typeof ClimateModel>
export interface Climate extends ClimateType {}
type ClimateSnapshotType = SnapshotOut<typeof ClimateModel>
export interface ClimateSnapshot extends ClimateSnapshotType {}
