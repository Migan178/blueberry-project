import { DiscommandClient } from 'discommand'
import { GatewayIntentBits } from 'discord.js'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { BlueBerryConfig } from './type.js'
import { Logger } from '@migan-studio/logger'
import config from '../config.json'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default class BlueBerryClient extends DiscommandClient {
  public get config() {
    return config
  }
  public readonly logger = new Logger({
    name: 'Blueberry',
  })
  public constructor() {
    super(
      {
        intents: [
          GatewayIntentBits.Guilds,
          GatewayIntentBits.GuildMessages,
          GatewayIntentBits.MessageContent,
        ],
      },
      {
        directory: {
          command: join(__dirname, 'commands'),
          listener: join(__dirname, 'listeners'),
        },
      },
    )
  }
}

declare module 'discord.js' {
  interface Client {
    get config(): BlueBerryConfig
    logger: Logger
  }
}
