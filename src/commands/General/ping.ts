import { ApplyOptions } from '@sapphire/decorators'
import { isMessageInstance } from '@sapphire/discord.js-utilities'
import { ChatInputCommand, Command, RegisterBehavior } from '@sapphire/framework'
import type { Message } from 'discord.js'

@ApplyOptions<Command.Options>({
  description: 'Returns bot latency',
})
export class Ping extends Command {
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
    const msg = await interaction.reply({ content: 'Pong!', fetchReply: true, ephemeral: true })

    if (isMessageInstance(msg)) {
      const ping = Math.round(this.container.client.ws.ping)
      const apiPing = msg.createdTimestamp - interaction.createdTimestamp
  
      const content = `Pong!\nBot Latency: ${ping}ms\nAPI Latency: ${apiPing}ms`

      return await interaction.editReply(content)
    }

    return interaction.reply('Failed to ping...')
  }
}
