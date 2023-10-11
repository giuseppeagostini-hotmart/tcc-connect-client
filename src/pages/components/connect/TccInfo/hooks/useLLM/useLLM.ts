import { useMemo } from 'react'

import { OpenAI } from 'langchain/llms/openai'

const useLLM = (key: string) =>
  useMemo(() => {
    return new OpenAI({
      temperature: 0,
      openAIApiKey: key
    })
  }, [key])

export default useLLM
