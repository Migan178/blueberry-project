export interface BlueBerryConfig {
  bot: {
    token: string
    krbots_token?: string
  }
  mysql: {
    user: string
    host: string
    password: string
    database: string
    port?: number
  }
}
