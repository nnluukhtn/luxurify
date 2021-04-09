import { InputProps, Select, SelectProps } from 'antd';
import {
  FormContainer,
  FormLabel,
  Spacer,
  StyledInput,
} from 'app/common/styles';
import React from 'react';
import styled from 'styled-components';
import ErrorContainer from '../ErrorContainer';
import InputPassword from '../InputPassword';
import AutoComplete, { Option, Options } from './AutoComplete';

interface ComponentProps {
  name?: string;
  onChange?: (...args: any) => void;
  handleOnSelect?: (...args: any) => void;
  id?: string;
  label?: string;
  error?: any;
  placeholder?: string;
  type?:
    | 'default'
    | 'password'
    | 'email'
    | 'autocomplete'
    | 'number'
    | 'select';
  options?: Options;
  searchCondition?: (keyword: string, option: Option) => boolean;
  defaultOptions?: Options;
  children?: React.ReactNode;
}

type Props = ComponentProps & InputProps & SelectProps<any>;

function InputForm({
  name,
  id,
  label: inputLabel,
  error,
  placeholder,
  type = 'default',
  options,
  onChange = () => {},
  handleOnSelect = () => {},
  searchCondition = () => false,
  defaultOptions,
  children,
  ...props
}: Props) {
  const renderInput = () => {
    switch (type) {
      case 'password':
        return (
          <InputPassword
            {...props}
            id={id}
            placeholder={placeholder}
            type={type}
            onChange={onChange}
          />
        );
      //
      case 'autocomplete':
        return (
          <AutoComplete
            {...props}
            placeholder={placeholder || 'Please enter'}
            options={options || []}
            defaultOptions={defaultOptions}
            onChange={handleOnSelect}
            searchCondition={searchCondition}
          />
        );
      //
      case 'select':
        return (
          <StyledSelect
            {...props}
            showSearch
            placeholder={placeholder || 'Please select'}
            options={options || undefined}
            onChange={handleOnSelect}
            onSelect={handleOnSelect}
          >
            {children}
          </StyledSelect>
        );
      //
      default:
        return (
          <StyledInput
            {...(props as any)}
            id={id}
            placeholder={placeholder || 'Please enter'}
            type={type}
            onChange={onChange}
          />
        );
    }
  };
  return (
    <>
      <FormContainer>
        {inputLabel && <FormLabel>{inputLabel}</FormLabel>}
        {renderInput()}
        {!!error && (
          <>
            <Spacer height=".3rem" />
            <ErrorContainer>{error}</ErrorContainer>
          </>
        )}
      </FormContainer>
    </>
  );
}

export default InputForm;

export const StyledSelect = styled(Select)`
  width: 280px;
  .ant-select-selector {
    border-radius: 5px !important;
  }
`;
