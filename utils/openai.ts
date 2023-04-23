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

export const chatCompletions = async (messages: ChatCompletionMessage[]) => {
  const data: ChatCompletionResponse = await $fetch('/v1/chat/completions', {
    baseURL: OPENAI_BASE_URL,
    method: 'post',
    headers: { Authorization: "Bearer " + process.env.OPENAI_API_KEY },
    body: {
      model: 'gpt-3.5-turbo',
      messages
    }
  })

  return data
}
