
import prisma from '~/server/utils/prisma'

export default defineEventHandler((event) => {
  return prisma.conversation.findUnique({ where: { id: event.context.params?.id } })
})
