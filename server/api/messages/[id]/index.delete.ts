
import prisma from '~/server/utils/prisma'

export default defineEventHandler((event) => {
  return prisma.message.delete({ where: { id: event.context.params?.id } })
})
