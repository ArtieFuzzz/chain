import { ApplyOptions } from '@sapphire/decorators'
import { ChatInputCommand, Command, RegisterBehavior } from '@sapphire/framework'
import type { Message } from 'discord.js'

@ApplyOptions<Command.Options>({
  description: 'How many bits do you have in your pocket?',
})
export class Wallet extends Command {
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
    const userData = await this.container.prisma.user.findUnique({ where: { id: interaction.user.id } })
    
    return await interaction.reply(`You currently have \`${userData!.bits}\` bits`)
  }
}
