import React from "react";
import {
  PageTitleStyled
} from './styled'

export const PageTitle: React.FC<{children: React.ReactNode}> = ({children}) => {
  return (
    <PageTitleStyled>
      {children}
    </PageTitleStyled>
  )
}
