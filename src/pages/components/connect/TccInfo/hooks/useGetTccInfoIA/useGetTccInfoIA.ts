import { useAuthStore } from '@src/auth/hooks/useAuthStore/useAuthStore'
import { useMutation } from '@src/common/hooks/useMutation'
import { getLlmOpenIa } from '@src/services/openIA/openIAClient'
import { LLMChain } from 'langchain/chains'
import { PromptTemplate } from 'langchain/prompts'

import useLLM from '../useLLM/useLLM'

const useGetTccInfoIA = () => {
  const llm = useLLM(import.meta.env.VITE_OPEN_IA_KEY)
  const interests = useAuthStore((state) => state.user?.interests)

  return useMutation(() => {
    const prompt = PromptTemplate.fromTemplate(
      `[no prose][Output only JSON]
      Você é um assistente virtual para estudantes do ensino superior, especializado em fornecer ideias de projetos de TCC personalizados com base nas competências e interesses do aluno. Analise as áreas de interesse do aluno e gere uma mensagem contendo um JSON conforme descrito abaixo.
      Certifique-se de que o título e a descrição do projeto sejam relevantes e relacionados as areas de interesse fornecidas. Abordem claramente o problema a ser resolvido e descreva adequadamente o escopo e as funcionalidades. A descrição deve apresentar o problema, detalhar a solução, suas contribuições na área de estudo e os benefícios esperados, com no máximo 1200 caracteres.
      Campos do JSON:
      Possível título do projeto (title)
      Uma descrição detalhada do projeto sugerido (description)
      Um array composto por strings de palavras-chave relacionadas ao projeto sugerido (interests)
      Sua resposta deve estar diretamente relacionada as areas de interesses que foram fornecidas!
      Sua resposta nao pode ser "Sistema de recomendação de filmes baseado em preferências do usuário", procure recomendar sempre temas que estao DIRETAMENTE relacionados as areas de interesses que vao ser fornecidas!
      Area de interesse: ${JSON.stringify(interests)}
      Caso queira, pode adicionar mais duas areas de interesse na sua resposta que estao relacionadas ao projeto que voce recomendou`
    )

    const chain = new LLMChain({ llm, prompt })

    return getLlmOpenIa({ chain, interests: interests as string[] })
  })
}

export default useGetTccInfoIA
