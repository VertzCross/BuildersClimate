// TESTS

describe("BUILDER CLIMATE E2E", () => {
  beforeEach(async () => {
    await device.reloadReactNative()
  })

  it("should have loading screen", async () => {
    await expect(element(by.id("LoadingScreen"))).toBeVisible()
    await expect(element(by.id("LoadingScreen"))).toBeNotVisible()
    await expect(element(by.id("WeatherScreen"))).toBeVisible()
  })

  it("should show weather screen with weather tag", async () => {
    await expect(element(by.id("WeatherScreen"))).toBeVisible()
    await expect(element(by.id("WeatherTag"))).toBeVisible()
    await element(by.id("WeatherTag")).tap()
    await waitFor(element(by.id("WeatherModal"))).toBeVisible()
    await expect(element(by.id("WeatherTag"))).toBeNotVisible()
    await element(by.id("WeatherModal")).scroll(500, "left")
    await expect(element(by.id("WeatherModal"))).toBeNotVisible()
    await expect(element(by.id("WeatherTag"))).toBeVisible()
  })
})
