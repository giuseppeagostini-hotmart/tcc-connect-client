import { useEffect, useRef, useState } from 'react'

import { PlusOutlined } from '@ant-design/icons'
import type { InputRef } from 'antd'
import { Space, Input, Tag, Tooltip, theme } from 'antd'

const SIZE = 8
const MAX_LENGHT = 15

interface TagsProps {
  tags: string[]
  setTags: React.Dispatch<React.SetStateAction<string[]>>
}

const Tags = ({ tags = [], setTags }: TagsProps) => {
  const { token } = theme.useToken()
  const [inputVisible, setInputVisible] = useState(false)
  const [inputValue, setInputValue] = useState<string>('')
  const [editInputIndex, setEditInputIndex] = useState(-1)
  const [editInputValue, setEditInputValue] = useState('')
  const inputRef = useRef<InputRef>(null)
  const editInputRef = useRef<InputRef>(null)

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus()
    }
  }, [inputVisible])

  useEffect(() => {
    editInputRef.current?.focus()
  }, [editInputValue])

  const handleClose = (removedTag: string) => {
    const newTags = tags.filter((tag) => tag !== removedTag)
    setTags(newTags)
  }

  const showInput = () => {
    setInputVisible(true)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleInputConfirm = () => {
    if (inputValue && tags.indexOf(inputValue) === -1) {
      setTags([...tags, inputValue])
    }
    setInputVisible(false)
    setInputValue('')
  }

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditInputValue(e.target.value)
  }

  const handleEditInputConfirm = () => {
    const newTags = [...tags]
    newTags[editInputIndex] = editInputValue
    setTags(newTags)
    setEditInputIndex(-1)
    setEditInputValue('')
  }

  const tagInputStyle: React.CSSProperties = {
    width: 64,
    height: 22,
    marginInlineEnd: 8,
    verticalAlign: 'top'
  }

  const tagPlusStyle: React.CSSProperties = {
    height: 22,
    background: token.colorBgContainer,
    borderStyle: 'dashed'
  }

  return (
    <Space size={[0, SIZE]} wrap>
      <Space size={[0, SIZE]} wrap>
        {tags.map((tag, index) => {
          if (editInputIndex === index) {
            return (
              <Input
                ref={editInputRef}
                key={tag}
                size='middle'
                style={tagInputStyle}
                value={editInputValue}
                onChange={handleEditInputChange}
                onBlur={handleEditInputConfirm}
                onPressEnter={handleEditInputConfirm}
              />
            )
          }
          const isLongTag = tag.length > MAX_LENGHT
          const tagElem = (
            <Tag key={tag} closable style={{ userSelect: 'none' }} onClose={() => handleClose(tag)}>
              <span
                onDoubleClick={(e) => {
                  if (index !== 0) {
                    setEditInputIndex(index)
                    setEditInputValue(tag)
                    e.preventDefault()
                  }
                }}>
                {isLongTag ? `${tag.slice(0, MAX_LENGHT)}...` : tag}
              </span>
            </Tag>
          )

          return isLongTag ? (
            <Tooltip title={tag} key={tag}>
              {tagElem}
            </Tooltip>
          ) : (
            tagElem
          )
        })}
        {inputVisible ? (
          <Input
            ref={inputRef}
            type='text'
            size='middle'
            style={tagInputStyle}
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputConfirm}
            onPressEnter={handleInputConfirm}
          />
        ) : (
          <Tag style={tagPlusStyle} onClick={showInput}>
            <PlusOutlined /> New Tag
          </Tag>
        )}
      </Space>
    </Space>
  )
}

export default Tags
