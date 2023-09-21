interface CampusValuesProps {
  [key: string]: { value: string; label: string }[]
}

export const collageValues = [
  { value: 'UFMG', label: 'Universidade Federal de Minas Gerais' },
  { value: 'PUCMG', label: 'Pontifícia Universidade Católica de Minas Gerais' }
]

export const campusValues: CampusValuesProps = {
  UFMG: [{ value: 'PA', label: 'Pampulha' }],
  PUCMG: [
    { value: 'CE', label: 'Coração Eucarístico' },
    { value: 'BA', label: 'Barreiro' },
    { value: 'PL', label: 'Praça da Liberdade' },
    { value: 'SG', label: 'São Gabriel' }
  ]
}
