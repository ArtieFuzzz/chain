import { envParseArray } from '#lib/env'
import { Precondition } from '@sapphire/framework'
import type { Message } from 'discord.js'

const OWNERS = envParseArray('OWNERS')

export class UserPrecondition extends Precondition {
  public async run(message: Message) {
    return OWNERS.includes(message.author.id) ? this.ok() : this.error({ message: 'This command can only be used by the owner.' })
  }
}