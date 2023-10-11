import { useMutation } from '@src/common/hooks/useMutation'
import { getLlmOpenIa } from '@src/services/openIA/openIAClient'
import { LLMChain } from 'langchain/chains'
import { PromptTemplate } from 'langchain/prompts'

import useLLM from '../useLLM/useLLM'

const useGetTccInfoIA = () => {
  const llm = useLLM(import.meta.env.VITE_OPEN_IA_KEY)

  return useMutation(() => {
    const prompt = PromptTemplate.fromTemplate(
      'What is a good name for a company that makes {product}?'
    )

    const chain = new LLMChain({ llm, prompt })

    return getLlmOpenIa({ chain })
  })
}

export default useGetTccInfoIA
