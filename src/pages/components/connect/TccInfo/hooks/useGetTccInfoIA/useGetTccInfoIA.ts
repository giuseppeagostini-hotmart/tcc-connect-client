import { useMutation } from '@src/common/hooks/useMutation'
import { getLlmOpenIa } from '@src/services/openIA/openIAClient'
import { LLMChain } from 'langchain/chains'
import { OpenAI } from 'langchain/llms/openai'
import { PromptTemplate } from 'langchain/prompts'

const useGetTccInfoIA = () => {
  return useMutation(() => {
    const model = new OpenAI({
      temperature: 0,
      openAIApiKey: 'sk-sPjRwslWtLkJtpvpk3qAT3BlbkFJ5iDBESWKSNihxye8tkbzss'
    })

    const prompt = PromptTemplate.fromTemplate(
      'What is a good name for a company that makes {product}?'
    )

    const chain = new LLMChain({ llm: model, prompt })

    return getLlmOpenIa({ chain })
  })
}

export default useGetTccInfoIA
