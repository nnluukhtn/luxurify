import Colors from 'app/common/Colors';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  border-bottom: 1px solid ${Colors.N100_GREY};
  display: flex;
  justify-content: center;
  min-height: 64px;
`;

interface InnerContainerProps {
  fluid?: boolean;
}

const InnerContainer = styled.div`
  ${(props: InnerContainerProps) =>
    props.fluid
      ? `
    flex: 1;
    padding: 16px 40px 0 40px;
  `
      : `
    flex: 0 1 1344px;
    padding: 16px 32px 0 32px;
  `}
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 500;
  color: ${Colors.N900_BLACK};
  height: 32px;
  margin-right: 40px;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const LeftContainer = styled.div`
  display: flex;
  align-items: center;
`;

const RightContainer = styled.div`
  display: flex;
  align-items: center;
`;

const BackContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 4px;
`;

const BackIcon = styled.span`
  color: ${Colors.N400_GREY};
  font-size: 0.8em;
  margin-right: 8px;
`;

const BreadcrumbText = styled.div`
  font-size: 12px;
  color: ${Colors.N400_GREY};
  margin-right: 8px;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    color: ${Colors.N900_BLACK};
    text-decoration: underline;
  }
`;

interface Props {
  title: React.ReactNode;
  rightChildren?: React.ReactNode;
  leftChildren?: React.ReactNode;
  bottomChildren?: React.ReactNode;
  prevRoutes?: Array<{
    label: string;
    route: string;
  }>;
  onClickRoute?: (route: string) => void;
  fluid?: boolean;
}

/* tslint:disable:jsx-no-lambda */
const PageHeader: React.FC<Props> = ({
  title,
  leftChildren,
  rightChildren,
  bottomChildren,
  prevRoutes,
  onClickRoute,
  fluid,
}) => {
  const onClick = (route: string) => () => {
    if (onClickRoute) {
      onClickRoute(route);
    }
  };

  return (
    <Container>
      <InnerContainer fluid={fluid}>
        {!!prevRoutes && prevRoutes.length === 1 && (
          <BackContainer>
            <BackIcon
              className="far fa-chevron-left"
              onClick={onClick(prevRoutes[0].route)}
            />
            <BreadcrumbText
              onClick={onClick(prevRoutes[0].route)}
            >{`Back to ${prevRoutes[0].label}`}</BreadcrumbText>
          </BackContainer>
        )}
        {!!prevRoutes && prevRoutes.length > 1 && (
          <BackContainer>
            <BreadcrumbText onClick={onClick(prevRoutes[0].route)}>
              {prevRoutes[0].label}
            </BreadcrumbText>
            {prevRoutes.map((route, index) => {
              if (index === 0) {
                return null;
              }
              return (
                <React.Fragment key={`${route.route}`}>
                  <BackIcon className="far fa-chevron-right" />
                  <BreadcrumbText onClick={onClick(route.route)}>
                    {route.label}
                  </BreadcrumbText>
                </React.Fragment>
              );
            })}
          </BackContainer>
        )}
        <TitleContainer>
          <LeftContainer>
            {!!title && <Title>{title}</Title>}
            {leftChildren}
          </LeftContainer>
          <RightContainer>{rightChildren}</RightContainer>
        </TitleContainer>
        {bottomChildren}
      </InnerContainer>
    </Container>
  );
};

export default PageHeader;
