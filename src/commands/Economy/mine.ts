import { ApplyOptions } from '@sapphire/decorators'
import { ChatInputCommand, Command, RegisterBehavior } from '@sapphire/framework'
import { Time } from '@sapphire/time-utilities'
import type { Message } from 'discord.js'

const TIME = Time.Minute * 2

@ApplyOptions<Command.Options>({
  description: 'Mine for some bits!',
})
export class Mine extends Command {
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
    const currentDate = new Date()

    if (!userData?.nextMine) {
      await this.container.prisma.user.update({
        where: {
          id
        },
        data: {
          bits: {
            increment: 50
          },
          nextMine: new Date(currentDate.getTime() + TIME)
        }
      })

      return await interaction.reply('Mined 50 bits! (2 Minute cooldown)')
    }

    if (currentDate < userData.nextMine) {
      return await interaction.reply('Cannot mine right now...')
    }

    await this.container.prisma.user.update({
      where: {
        id
      },
      data: {
        bits: {
          increment: 50
        },
        nextMine: new Date(currentDate.getTime() + TIME)
      }
    })

    return await interaction.reply('Mined 50 bits! (2 Minute cooldown)')
  }
}
