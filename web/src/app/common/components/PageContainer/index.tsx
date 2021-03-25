import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import styled from 'styled-components';

const Container = styled.div`
  flex: 1;
  height: 100%;
  width: 100%;
`;

const InnerContainer = styled.div`
  ${(props: Props) =>
    props.fluid
      ? `
    flex: 1;
    padding: 0 40px;
    min-width: 0;
  `
      : `
    flex: 0 1 1344px;
    padding: 0 32px;
    min-width: 0;
  `}
  display: flex;
  flex-direction: column;
`;

const ScrollContainer = styled.div`
  min-height: 100%;
  display: flex;
  justify-content: center;
`;

export interface Props {
  fluid?: boolean;
  style?: React.CSSProperties;
  innerStyle?: React.CSSProperties;
}

const PageContainer: React.FC<Props> = props => {
  return (
    <Container style={props.style}>
      <Scrollbars>
        <ScrollContainer>
          <InnerContainer fluid={props.fluid} style={props.innerStyle}>
            {props.children}
          </InnerContainer>
        </ScrollContainer>
      </Scrollbars>
    </Container>
  );
};

export default PageContainer;
