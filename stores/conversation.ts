import { AuthorRole } from '~~/utils/enums'

export interface ConversationStoreState {
  conversations: Record<string, {
    content: string
    authorRole: AuthorRole
  }[]>
}

export const useConversataionStore = defineStore('conversation', {
  state: (): ConversationStoreState => ({
    conversations: {}
  }),
    
  actions: {
    async send(input: string, conversationId?: string, storeId?: string) {
      let prompt: any[] = [] 
      const data = await $fetch('/api/messages', { method: 'post', body: { input, conversationId, authorRole: AuthorRole.USER } })

      if (conversationId) { 
        this.conversations[conversationId].push({ content: input, authorRole: AuthorRole.USER })
      }

      if (!conversationId) {
        await this.getConversationMessages(data.conversationId)
      }

      if (storeId) {
        const sentences = await $fetch(`/api/stores/${storeId}/sentences`)

        const vectors: number[][] = (() => {
          try { return sentences.map(({ vectors }) => JSON.parse(vectors)) } catch { return [] }
        })()

        const [{ embedding: src }]= (await createEmbeddings(input)).data

        prompt = calcTopEmbeddingsIndex(src, vectors).map((index) => sentences[index])
      }

      const { choices } = await chatCompletions([...prompt, ...this.conversations[data.conversationId].filter(({ authorRole }) => isUserAuthorRole(authorRole))].map(({ content }) => ({
        role: 'user',
        content
      })))

      const [choice] = choices

      $fetch('/api/messages', { method: 'post', body: { input: choice.message.content, conversationId: data.conversationId, authorRole: AuthorRole.SYSTEM } })
      this.conversations[data.conversationId].push({ content: choice.message.content, authorRole:  AuthorRole.SYSTEM })
      
      return data
    },

    async getConversationMessages(conversationId: string) {
      this.conversations[conversationId] = (await $fetch(`/api/conversations/${conversationId}/messages`)).map(({ content, authorRole }) => ({
        content,
        authorRole: authorRole as AuthorRole
      }))
      return
    }
  }
})