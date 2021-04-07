import React from 'react';
import { Input } from 'antd';
import { PasswordProps } from 'antd/es/input';
import Colors from 'app/common/Colors';
import styled from 'styled-components';
import ErrorContainer from '../ErrorContainer';

interface ComponentProps {
  noBorder?: boolean;
  hasBorderRadius?: boolean;
  containerStyle?: React.CSSProperties;
  width?: number | string;
  error?: string;
}

export type Props = ComponentProps & PasswordProps;

const AntdInputPassword = Input.Password;

const StyledInputPassword = styled(
  ({ noBorder, containerStyle, error, ...props }: Props) => (
    <AntdInputPassword {...props} />
  ),
)`
  outline: none;
  border-radius: 5px !important;
  font-family: inherit;

  &.ant-input,
  & .ant-input {
    color: ${Colors.N900_BLACK};
    &:hover {
      outline: ${Colors.N400_GREY};
      border-color: ${Colors.N400_GREY} !important;
      &.mod-error {
        border-color: ${Colors.R400_RED} !important;
      }
    }
    &:focus {
      outline: none;
      border-color: ${Colors.B400_BLUE} !important;
      box-shadow: none;
      &.mod-error {
        border-color: ${Colors.R400_RED} !important;
      }
    }
    &::placeholder {
      color: ${Colors.N300_GREY};
    }
    ${(props: ComponentProps) =>
      props.noBorder &&
      `
        border-width: 0;
        &:hover {
          border-right-width: 0 !important;
        }
        &:focus {
          border-right-width: 0 !important;
        }
      `}
  }

  &.ant-input-affix-wrapper:hover,
  &.ant-input-affix-wrapper:focus {
    & > .ant-input:not(.ant-input-disabled) {
      ${(props: ComponentProps) =>
        props.noBorder &&
        `
          border-width: 0;
          border-right-width: 0 !important;
        `}
    }
  }
  & .ant-input-group-addon {
    border-radius: 0;
  }
  &.mod-borderradius {
    &.ant-input,
    & .ant-input {
      border-radius: 5px;
    }
  }
  &.mod-error {
    &.ant-input,
    & .ant-input {
      border-color: ${Colors.R400_RED} !important;
    }
  }
  &.mod-monospace {
    &.ant-input,
    & .ant-input {
      font-family: monospace;
    }

    &.ant-input[type='text'],
    & .ant-input[type='text'] {
      font-family: inherit;
    }
  }
`;

const InputPassword = ({ hasBorderRadius, ...props }: Props) => {
  const hasError = !!props.error;
  const monospace = !!props.value;
  return (
    <div
      style={{
        width: props.width ? props.width : '100%',
        ...props.containerStyle,
      }}
    >
      <StyledInputPassword
        {...props}
        className={`${props.className || ''} ${hasError ? 'mod-error' : ''} ${
          hasBorderRadius ? 'mod-borderradius' : ''
        } ${monospace ? 'mod-monospace' : ''}`}
        style={{
          ...props.style,
          width: props.width ? props.width : '100%',
        }}
      />
      {hasError && <ErrorContainer>{props.error}</ErrorContainer>}
    </div>
  );
};

InputPassword.defaultProps = {
  hasBorderRadius: true,
};

export default InputPassword;
