
import prisma from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const query: { name: string } = await readBody(event)
  return prisma.store.update({
    where: { id: event.context.params?.id },
    data: { name: query.name }
  })
})
