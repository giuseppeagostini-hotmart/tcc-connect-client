import type { LLMChain } from 'langchain/chains'
import type { OpenAI, OpenAICallOptions } from 'langchain/llms/openai'

interface LlmOpenIaProps {
  chain: LLMChain<string, OpenAI<OpenAICallOptions>>
  interests: string[]
}

interface GetProfessorByIa {
  chain: LLMChain<string, OpenAI<OpenAICallOptions>>
  tags: string[]
  title: string
  professorList: string
}

export const getLlmOpenIa = async ({ chain, interests }: LlmOpenIaProps) => {
  const res = await chain.run(
    `Gere um json com as regras acima. Area de interesse: ${JSON.stringify(interests)}`
  )

  return { res }
}

export const getProfessorByIAClient = async ({
  chain,
  professorList,
  tags,
  title
}: GetProfessorByIa) => {
  const resp = await chain.call({
    professorList: JSON.stringify(professorList),
    text: `[no prose][Output only JSON] Gere sem explicacoes um json com as regras acima. Palavras-chave do TCC:  ${JSON.stringify(
      tags
    )}, Titulo do TCC: ${title}`
  })

  return { resp }
}
