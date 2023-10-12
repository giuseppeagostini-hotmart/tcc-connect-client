import type { LLMChain } from 'langchain/chains'
import type { OpenAI, OpenAICallOptions } from 'langchain/llms/openai'

interface LlmOpenIaProps {
  chain: LLMChain<string, OpenAI<OpenAICallOptions>>
  interests: string[]
}

export const getLlmOpenIa = async ({ chain, interests }: LlmOpenIaProps) => {
  const res = await chain.run(
    `Gere um json com as regras acima. Area de interesse: ${JSON.stringify(interests)}`
  )

  return { res }
}
