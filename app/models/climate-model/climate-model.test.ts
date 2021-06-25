import { ClimateModel, Climate } from "./climate-model"

test("can be created", () => {
  const instance: Climate = ClimateModel.create({})

  expect(instance).toBeTruthy()
})
