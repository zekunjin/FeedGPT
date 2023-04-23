import prisma from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const query: {
    input: string
    conversationId?: string
    authorRole?: 'user' | 'system'
  } = await readBody(event)

  let conversationId = query.conversationId

  if (!query.conversationId) {
    const { id } = await prisma.conversation.create({
      data: { title: 'New chat' }
    })
    conversationId = id
  }

  if (!conversationId) { throw new Error() }

  return prisma.message.create({
    data: { content: query.input, conversationId, authorRole: query.authorRole ?? 'user' }
  })
})
