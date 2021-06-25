import { ClimateStoreModel, ClimateStore } from "./climate-store"

test("can be created", () => {
  const instance: ClimateStore = ClimateStoreModel.create({})

  expect(instance).toBeTruthy()
})
