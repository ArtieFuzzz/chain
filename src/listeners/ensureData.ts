import { ApplyOptions } from '@sapphire/decorators'
import { Events, Listener, ListenerOptions } from '@sapphire/framework'
import type { Message } from 'discord.js'

const cache: string[] = []

@ApplyOptions<ListenerOptions>({
  event: Events.MessageCreate
})
export class UserEvent extends Listener {
  public async run(message: Message): Promise<true> {
    if (cache.includes(message.author.id)) return true

    const data = await this.container.prisma.user.findUnique({ where: { id: message.author.id } })

    if (!data) {
      await this.container.prisma.user.create({ data: { id: message.author.id } })
    }

    cache.push(message.author.id)

    return true
  }
}
