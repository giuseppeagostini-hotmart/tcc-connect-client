import { useMemo } from 'react'

import { OpenAI } from 'langchain/llms/openai'

const useLLM = (key: string) =>
  useMemo(() => {
    return new OpenAI({
      temperature: 0.6,
      openAIApiKey: key,
      modelName: 'gpt-3.5-turbo'
    })
  }, [key])

export default useLLM
