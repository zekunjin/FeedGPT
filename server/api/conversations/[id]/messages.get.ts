
import prisma from '~/server/utils/prisma'

export default defineEventHandler((event) => {
  return prisma.message.findMany({
    where: { conversationId: event.context.params?.id }
  })
})
