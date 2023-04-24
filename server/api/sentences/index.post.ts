import prisma from '~/server/utils/prisma'

interface QueryBody {
  content: string
  vector: string
  storeId: string
}

export default defineEventHandler(async (event) => {
  const query: QueryBody | QueryBody[] = await readBody(event)

  if (Array.isArray(query)) {
    return Promise.all(query.map(data => prisma.sentence.create({ data }))) 
  }

  return prisma.sentence.create({ data: query })
})
