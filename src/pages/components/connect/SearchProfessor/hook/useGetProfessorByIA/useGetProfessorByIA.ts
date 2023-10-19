import { useMutation } from '@src/common/hooks/useMutation'
import { getProfessorByIAClient } from '@src/services/openIA/openIAClient'
import { LLMChain } from 'langchain/chains'
import { ChatPromptTemplate } from 'langchain/prompts'

import useLLMProfessor from '../../../TccInfo/hooks/useLLM/useLLMProfessor'

type GetProfessorByIaProps = {
  professorList: string
  tags: string[]
  title: string
}

const useGetProfessorByIA = () => {
  const llm = useLLMProfessor(import.meta.env.VITE_OPEN_IA_KEY)

  return useMutation(({ professorList, tags, title }: GetProfessorByIaProps) => {
    const prompt = ChatPromptTemplate.fromMessages([
      [
        'system',
        `[no prose][Output only JSON] Atue como um especialista em "Orientação de TCC" e gere um JSON (somente com o id do professor) recomendando os professores mais adequados com base nas informações do título e palavras-chave (interesses) fornecidas pelo aluno (usuário). Essa recomendação deve ser feita cruzando os dados do título e palavras-chave do aluno com as áreas de interesse dos professores na nossa base de dados. Os dados não precisam ser exatamente iguais, mas devem estar relacionados. Por exemplo, se um professor tem uma área de interesse em "Frontend" e o usuário tem uma palavra-chave de "desenvolvimento web", eles estão relacionados e esse professor deve ser considerado. Lembrando que isso foi somente um exemplo, leve isso para outros casos também.
        Campos do JSON: id do professor recomendado (id).
        Caso nao tenha professores para recomendar, retornar um array vazio ([])
        Utilize a seguinte base de dados de professores: {professorList}`
      ],
      ['human', '{text}']
    ])

    const chain = new LLMChain({ llm, prompt })

    return getProfessorByIAClient({ chain, professorList, tags, title })
  })
}

export default useGetProfessorByIA
