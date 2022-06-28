import { envParseInteger } from '#lib/env'
import { ApplyOptions } from '@sapphire/decorators'
import { ChatInputCommand, Command, RegisterBehavior } from '@sapphire/framework'
import type { Message } from 'discord.js'

@ApplyOptions<Command.Options>({
  description: 'Power-up!',
})
export class Upgrade extends Command {
  public override registerApplicationCommands(registry: ChatInputCommand.Registry): void {
    registry.registerChatInputCommand(
      (builder) =>
        builder
          .setName(this.name)
          .setDescription(this.description),
      {
        behaviorWhenNotIdentical: RegisterBehavior.Overwrite,
      }
    )
  }
  
  public override async chatInputRun(interaction: Command.ChatInputInteraction): Promise<Message | unknown> {
    const id = interaction.user.id
    const userData = await this.container.prisma.user.findUnique({ where: { id } })
    const bits = userData!.bits - envParseInteger('UPGRADE_COST')

    if (bits < 0) {
      return await interaction.reply('You need more bits to upgrade.')
    }

    const { level } = await this.container.prisma.user.update({
      where: {
        id
      },
      data: {
        bits,
        level: {
          increment: 1
        }
      }
    })

    return await interaction.reply(`You have leveled up to LVL ${level}!`)
  }
}
