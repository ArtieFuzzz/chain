import type { PrismaClient } from '@prisma/client'
import type { Env } from './env/types'

declare global {
  namespace NodeJS {
    interface ProcessEnv extends Env { }
  }
}

declare module '@sapphire/framework' {
  interface Preconditions {
    OwnerOnly: never
  }
}

declare module 'discord.js' {
  interface Client {
    prisma: PrismaClient
  }
}

declare module '@sapphire/pieces' {
  interface Container {
    prisma: PrismaClient
  }
}
