import {
  Input as AntInput,
  Button as AntBtn,
  Checkbox as AntCheckbox,
} from 'antd';
import styled from 'styled-components';
import Colors from './Colors';

export const Container = styled.div`
  height: 100vh;
  width: 100vw;
`;

export const FormLabel = styled.div`
  font-weight: 400;
  white-space: nowrap;
  word-wrap: normal;
  margin-bottom: 0.3rem;
  text-transform: capitalize;
`;

export const FormContainer = styled.div`
  width: 250px;
  margin-bottom: 0.3rem;
`;

export const StyledInput = styled(AntInput)`
  &.ant-input {
    border-radius: 5px !important;
  }
`;

export const Spacer = styled.div<{
  height?: number | string;
  width?: number | string;
}>`
  margin: 0;
  padding: 0;
  height: ${({ height }) =>
    typeof height === 'number'
      ? `${height}px`
      : typeof height === 'string'
      ? height
      : '100%'};
  width: ${({ width }) =>
    typeof width === 'number'
      ? `${width}px`
      : typeof width === 'string'
      ? width
      : '100%'};
`;

export const StyledButton = styled(AntBtn)`
  &.ant-btn {
    width: fit-content;
    border-radius: 5px;
  }
`;

export const StyledCheckbox = styled(AntCheckbox)`
  font-family: inherit;
  font-size: 0.8rem;
  font-weight: 300;
`;

export const Header = styled.div`
  font-size: 1.6rem;
  font-weight: 450;
  margin: 0;
  color: ${Colors.N800_BLACK};
`;

export const SubHeader = styled.div`
  font-size: 0.8rem;
  font-weight: 300;
`;
