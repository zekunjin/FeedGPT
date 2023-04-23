import prisma from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const query: {
    content: string
    vector: string
  } = await readBody(event)

  return prisma.sentence.create({ data: { content: query.content, vector: query.vector, storeId: event.context.params?.id } })
})
