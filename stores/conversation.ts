export interface ConversationStoreState {
  conversations: Record<string, string[]>
}

export const useConversataionStore = defineStore('conversation', {
  state: (): ConversationStoreState => ({
    conversations: {}
  }),
    
  actions: {
    async send(input: string, conversationId?: string) {
      const data = await $fetch('/api/messages', { method: 'post', body: { input, conversationId, authorRole: 'user' } })
      this.getConversationMessages(data.conversationId)
      return data
    },

    async getConversationMessages(conversationId: string) {
      this.conversations[conversationId] = (await $fetch(`/api/conversations/${conversationId}/messages`)).map(({ content }) => content)
    }
  }
})