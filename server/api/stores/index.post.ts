import prisma from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const query: { name: string } = await readBody(event)
  return prisma.store.create({ data: { name: query.name } })
})
