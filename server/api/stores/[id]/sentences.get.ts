
import prisma from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  return prisma.sentence.findMany({
    where: { storeId: event.context.params?.id }
  })
})
