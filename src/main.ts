import Client from '#lib/Client'
import { LogLevel } from '@sapphire/framework'

const client = new Client({
  intents: ['GUILDS', 'GUILD_MESSAGES'],
  logger: {
    level: process.env.NODE_ENV === 'production' ? LogLevel.Info : LogLevel.Debug
  },
  hmr: {
    enabled: process.env.NODE_ENV === 'development'
  },
  shards: 'auto'
})

void client.start()
