import type { ReactNode } from 'react'

import { Tag } from 'antd'
import type { ColumnsType } from 'antd/es/table'

interface DataType {
  key: React.Key
  name: string
  campus: string
  isProfessorAvaliable: ReactNode
  interests: string[]
  nameValue?: string
}

const useGetColumns = () => {
  const columns: ColumnsType<DataType> = [
    {
      title: 'Nome',
      dataIndex: 'name'
    },
    {
      title: 'Campus',
      dataIndex: 'campus',
      responsive: ['md']
    },
    {
      title: 'Área de interesse',
      dataIndex: 'interests',
      render: (_, { interests }) => (
        <>
          {interests.map((tag: string) => {
            return (
              <Tag color='geekblue' key={tag}>
                {tag.toUpperCase()}
              </Tag>
            )
          })}
        </>
      )
    },
    {
      title: 'Disponibilidade',
      dataIndex: 'isProfessorAvaliable',
      responsive: ['md']
    }
  ]

  return columns
}

export default useGetColumns
