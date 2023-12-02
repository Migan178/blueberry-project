import { Listener } from 'discommand'
import { type Client, Events, ActivityType } from 'discord.js'
import { Koreanbots } from '@migan/koreanbots'
import chalk from 'chalk'

export default class ClientReady extends Listener {
  public constructor() {
    super(Events.ClientReady)
  }

  public execute(client: Client<true>) {
    function changeStatus() {
      client.user.setActivity({
        name: '/help | /도움말',
        type: ActivityType.Listening,
      })
    }
    changeStatus()
    setInterval(changeStatus, 10000)

    if (!client.config.bot.krbots_token) {
      client.logger.log(
        `KoreanBots Token is ${chalk.red(
          'undefined',
        )}. Not define of KoreanBots variable.`,
      )
    } else {
      const koreanBots = new Koreanbots({
        api: {
          token: client.config.bot.krbots_token,
        },
        clientId: client.user.id,
      })
      function update() {
        koreanBots.myBot
          .update({
            servers: client.guilds.cache.size,
          })
          .then(response => client.logger.log(response.message))
      }

      update()
      setInterval(update, 600000)
    }

    client.logger.log(`${chalk.cyan('Bot name')}: ${client.user.username}`)
  }
}
