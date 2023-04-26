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
      const data = await $fetch('/api/messages', { method: 'post', body: { input, conversationId, authorRole: AuthorRole.USER } })

      if (conversationId) { 
        this.conversations[conversationId].push({ content: input, authorRole: AuthorRole.USER })
      }

      if (!conversationId) {
        await this.getConversationMessages(data.conversationId)
      }

      this.setConversationMessage(input, data.conversationId, storeId)
      
      return data
    },

    async regenerateResponse(conversationId: string, storeId?: string) {
      const c = this.conversations[conversationId]
      if (!c) { return }
      const s = c.filter(({ authorRole }) => isUserAuthorRole(authorRole)).at(-1)
      if (!s) { return }
      this.setConversationMessage(s.content, conversationId, storeId)
    },

    async getConversationMessages(conversationId: string) {
      this.conversations[conversationId] = (await $fetch(`/api/conversations/${conversationId}/messages`)).map(({ content, authorRole }) => ({
        content,
        authorRole: authorRole as AuthorRole
      }))
      return
    },

    async setConversationMessage(input: string, conversationId: string, storeId?: string) {
      let prompt: any = []
    
      if (storeId) {
        const sentences = await $fetch(`/api/stores/${storeId}/sentences`)
    
        const vectors: number[][] = (() => {
          try {
            return sentences.map(({ vectors }: any) => JSON.parse(vectors))
          } catch {
            return []
          }
        })()

        const [{ embedding: src }]= (await createEmbeddings(input)).data
    
        prompt = calcTopEmbeddingsIndex(src, vectors, 3).map((index) => sentences[index])
      }

      const systems = prompt.map(({ content }: any) => ({ role: AuthorRole.ASSISTANT, content }))
      const users = this.conversations[conversationId].filter(({ authorRole }) => isUserAuthorRole(authorRole)).map(({ content }) => ({ role: AuthorRole.USER, content }))

      const { choices } = await chatCompletions([...systems, ...users])

      const [choice] = choices

      $fetch('/api/messages', { method: 'post', body: { input: choice.message.content, conversationId, authorRole: AuthorRole.SYSTEM } })
      this.conversations[conversationId].push({ content: choice.message.content, authorRole:  AuthorRole.SYSTEM })
    }
  }
})