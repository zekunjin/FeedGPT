
import prisma from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const query: { title: string } = await readBody(event)
  return prisma.conversation.update({
    where: { id: event.context.params?.id },
    data: { title: query.title }
  })
})
