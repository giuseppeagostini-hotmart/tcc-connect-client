import { useMemo } from 'react'

import { OpenAI } from 'langchain/llms/openai'

const useLLMProfessor = (key: string) =>
  useMemo(() => {
    return new OpenAI({
      temperature: 0.2,
      openAIApiKey: key,
      modelName: 'gpt-3.5-turbo'
    })
  }, [key])

export default useLLMProfessor
