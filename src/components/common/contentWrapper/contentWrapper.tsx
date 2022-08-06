import React from "react";
import {
  ContentWrapperStyled
} from './styled'

export const ContentWrapper: React.FC<{children: React.ReactNode}> = ({children}) => {
  return (
    <ContentWrapperStyled>
      {children}
    </ContentWrapperStyled>
  );
}
