import { Instance, SnapshotOut, types } from "mobx-state-tree"

import { ClimateStoreModel } from "app/models/climate-store"

export const RootStoreModel = types
  .model("RootStore")
  .props({ ClimateStore: types.optional(ClimateStoreModel, {}) })

export interface RootStore extends Instance<typeof RootStoreModel> {}

export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
