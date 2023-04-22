
import prisma from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const query: {
    input: string
    conversationId?: number
  } = await readBody(event)

  let conversationId = query.conversationId || 0

  if (!query.conversationId) {
    const { id } = await prisma.conversation.create({
      data: { title: 'New chat', storeId: 0 }
    })
    conversationId = id
  }

  return prisma.message.create({
    data: { content: query.input, conversationId, authorRole: 'user' }
  })
})
