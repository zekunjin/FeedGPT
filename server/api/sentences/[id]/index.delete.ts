import prisma from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  return prisma.sentence.delete({ where: { id: event.context.params?.id } })
})
