import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"

import { withEnvironment } from "app/models/extensions/with-environment"
import { ClimateModel, ClimateSnapshot } from "app/models/climate-model"

export const ClimateStoreModel = types
  .model("ClimateStore")
  .extend(withEnvironment)
  .props({
    currentWeather: types.optional(ClimateModel, {}),
    isLoading: types.optional(types.boolean, true),
  })
  .actions((self) => ({
    setLoading: (value) => {
      self.isLoading = value
    },
    setCurrentClimate: (newClimate: ClimateSnapshot) => {
      self.currentWeather = ClimateModel.create(newClimate)
    },
  }))
  .actions((self) => ({
    getCurrentWeather: flow(function * (coords: { latitude: number; longitude: number }) {
      self.setLoading(true)
      const results = yield self.environment.api.getClimate(coords)
      self.setLoading(false)
      if (results.kind === "ok") self.setCurrentClimate(results.data)
    }),
  }))

type ClimateStoreType = Instance<typeof ClimateStoreModel>
export interface ClimateStore extends ClimateStoreType {}
type ClimateStoreSnapshotType = SnapshotOut<typeof ClimateStoreModel>
export interface ClimateStoreSnapshot extends ClimateStoreSnapshotType {}
