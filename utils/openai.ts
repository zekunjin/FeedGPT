export const OPENAI_BASE_URL = 'https://api.openai.com'

export interface ChatCompletionMessage {
  role: 'user' | 'system' | 'assistant'
  content: string
}

export interface ChatCompletionResponse {
  id: string
  object: string
  choices: {
    index: number
    finish_reason: string
    message: {
      role: 'user' | 'system' | 'assistant'
      content: string
    }
  }[]
  usage: {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
  }
}

export interface CreateEmbeddingsResponse {
  object: string
  data: {
    object: string
    embedding: number[]
    index: number
  }[]
  model: string
  usage: {
    prompt_tokens: number
    total_tokens: number
  }
}

export const chatCompletions = async (messages: ChatCompletionMessage[]) => {
  const apiKey = await storage.getItem(StorageKey.OPENAI_API_KEY)
  const data: ChatCompletionResponse = await $fetch('/v1/chat/completions', {
    baseURL: OPENAI_BASE_URL,
    method: 'post',
    headers: { Authorization: `Bearer ${apiKey}` },
    body: {
      model: 'gpt-3.5-turbo',
      messages
    }
  })

  return data
}


export const createEmbeddings = async (input: string | string[]) => {
  const apiKey = await storage.getItem(StorageKey.OPENAI_API_KEY)
  const data: CreateEmbeddingsResponse = await $fetch('/v1/embeddings', {
    baseURL: OPENAI_BASE_URL,
    method: 'post',
    headers: { Authorization: `Bearer ${apiKey}` },
    body: {
      model: 'text-embedding-ada-002',
      input
    }
  })

  return data
}