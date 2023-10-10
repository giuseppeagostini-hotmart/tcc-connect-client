import type { LLMChain } from 'langchain/chains'
import type { OpenAI, OpenAICallOptions } from 'langchain/llms/openai'

interface LlmOpenIaProps {
  chain: LLMChain<string, OpenAI<OpenAICallOptions>>
}

export const getLlmOpenIa = async ({ chain }: LlmOpenIaProps) => {
  const res = await chain.run('colorful socks')

  return { res }
}
