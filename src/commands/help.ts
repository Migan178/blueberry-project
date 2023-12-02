import { Command } from 'discommand'
import { type ChatInputCommandInteraction, codeBlock } from 'discord.js'

export default class Help extends Command {
  public constructor() {
    super({
      name: '도움말',
      description: '이 봇의 도움말이예요.',
    })
  }

  public async execute(interaction: ChatInputCommandInteraction) {
    const commands = interaction.client.commandHandler.modules
      .map(command => {
        return `- ${command.name}`
      })
      .join('\n')

    await interaction.reply({
      embeds: [
        {
          title: `${interaction.client.user.username}의 도움말`,
          description: codeBlock('md', commands),
        },
      ],
    })
  }
}
