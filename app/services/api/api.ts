import { OPEN_WEATHER_API_KEY } from "app/config/env"
import { ApisauceInstance, create, ApiResponse } from "apisauce"

import { getGeneralApiProblem } from "./api-problem"
import { ApiConfig, DEFAULT_API_CONFIG } from "./api-config"
import * as Types from "./api.types"

export class Api {
  apisauce: ApisauceInstance

  config: ApiConfig

  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
  }

  setup() {
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
      },
    })
  }

  async getClimate(coords: {
    latitude: number
    longitude: number
  }): Promise<Types.GetLocationClimate> {
    const response: ApiResponse<any> = await this.apisauce.get(
      `weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=${OPEN_WEATHER_API_KEY}&units=metric`,
    )

    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    try {
      const newClimate = { ...response.data }
      return { kind: "ok", data: newClimate }
    } catch {
      return { kind: "bad-data" }
    }
  }
}
