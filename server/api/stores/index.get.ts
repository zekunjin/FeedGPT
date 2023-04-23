
import prisma from '~/server/utils/prisma'

export default defineEventHandler(() => {
  return prisma.store.findMany()
})
