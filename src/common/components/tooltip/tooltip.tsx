import React from 'react'

import { Tooltip } from 'antd'

interface TooltipProps {
  tooltipText: string
  children: React.ReactNode
}

const TooltipAntd = ({ tooltipText, children }: TooltipProps) => (
  <Tooltip title={tooltipText}>{children}</Tooltip>
)

export default TooltipAntd
