import { campusValues } from '@src/pages/components/modalContent/constants'

interface FindLabelProps {
  campus: string
  collage: string
}

export const useGetCampusLabel = () => {
  const findLabel = ({ campus, collage }: FindLabelProps) => {
    const campusList = campusValues[collage]
    const selectedCampus = campusList.find((c) => c.value === campus)

    return selectedCampus ? selectedCampus.label : ''
  }

  return findLabel
}
