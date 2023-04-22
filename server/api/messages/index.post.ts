
import prisma from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const query: {
    input: string
    conversationId?: number
    authorRole?: 'user' | 'system'
  } = await readBody(event)

  let conversationId = query.conversationId as number

  if (!query.conversationId) {
    const { id } = await prisma.conversation.create({
      data: { title: 'New chat', storeId: 0 }
    })
    conversationId = id
  }

  return prisma.message.create({
    data: { content: query.input, conversationId, authorRole: query.authorRole ?? 'user' }
  })
})
