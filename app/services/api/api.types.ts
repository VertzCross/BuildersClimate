/* eslint-disable camelcase */
import { GeneralApiProblem } from "./api-problem"

export interface Climate {
  id: number
  name: string
  coord: { lat: number; lon: number }
  weather: [
    {
      id: number
      main: string
      description: string
      icon: string
    },
  ]
  main: {
    feels_like: number
    humidity: number
    pressure: number
    temp: number
    temp_max: number
    temp_min: number
  }
  base: string
  clouds: { all: number }
  wind: { deg: number; gust: number; speed: number }
}

export type GetLocationClimate = { kind: string; data: Climate } | GeneralApiProblem
