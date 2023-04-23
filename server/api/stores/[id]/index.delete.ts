
import prisma from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const store = await prisma.store.delete({ where: { id: event.context.params?.id } })
  return store
})
