
import prisma from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const conversation = await prisma.conversation.delete({ where: { id: event.context.params?.id } })
  await prisma.message.deleteMany({ where: { conversationId: conversation.id } }) 
  return conversation
})
