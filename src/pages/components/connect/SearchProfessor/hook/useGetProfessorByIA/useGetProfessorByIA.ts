import { useMutation } from '@src/common/hooks/useMutation'
import { getProfessorByIAClient } from '@src/services/openIA/openIAClient'
import { LLMChain } from 'langchain/chains'
import { ChatPromptTemplate } from 'langchain/prompts'

import useLLMProfessor from '../../../TccInfo/hooks/useLLM/useLLMProfessor'

type GetProfessorByIaProps = {
  professorList: string
  tags: string[]
}

const useGetProfessorByIA = () => {
  const llm = useLLMProfessor(import.meta.env.VITE_OPEN_IA_KEY)

  return useMutation(({ professorList, tags }: GetProfessorByIaProps) => {
    const prompt = ChatPromptTemplate.fromMessages([
      [
        'system',
        `[no prose][Output only JSON] Desempenhe o papel de um especialista em 'Orientação de TCC' e crie um JSON contendo apenas o ID do professor, com o objetivo de recomendar os professores mais adequados com base nas palavras-chave (interesses) fornecidas pelo aluno (usuário). Essa recomendação será efetuada ao relacionar as palavras-chave do aluno com as áreas de interesse dos professores em nossa base de dados. As correspondências não precisam ser exatas, mas devem indicar uma relação. Por exemplo, se um professor tem uma área de interesse em 'Frontend' e o aluno utiliza a palavra-chave 'desenvolvimento web', isso constitui uma relação e o professor deve ser considerado. É importante ressaltar que o exemplo mencionado é apenas um caso ilustrativo; termos que possuem relação entre si devem ser levados em consideração.
        Campos do JSON: id do professor recomendado (id).
        Caso nao tenha professores para recomendar, retornar um array vazio ([])
        Utilize a seguinte base de dados de professores: {professorList}`
      ],
      ['human', '{text}']
    ])

    const chain = new LLMChain({ llm, prompt })

    return getProfessorByIAClient({ chain, professorList, tags })
  })
}

export default useGetProfessorByIA
