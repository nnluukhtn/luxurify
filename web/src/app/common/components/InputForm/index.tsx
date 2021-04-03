import { InputProps } from 'antd';
import { FormContainer, FormLabel, StyledInput } from 'app/common/styles';
import React from 'react';
import InputPassword from '../InputPassword';
import AutoComplete, { Option, Options } from './AutoComplete';

interface ComponentProps {
  name?: string;
  onChange: (...args: any) => void;
  id?: string;
  label?: string;
  placeholder?: string;
  type?: 'default' | 'password' | 'email' | 'autocomplete';
  options?: Options;
  searchCondition?: (keyword: string, option: Option) => boolean;
}

type Props = ComponentProps & InputProps;

function InputForm({
  name,
  id,
  label: inputLabel,
  placeholder,
  type = 'default',
  options,
  onChange,
  searchCondition = () => false,
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
            onChange={onChange}
            searchCondition={searchCondition}
          />
        );
      //
      default:
        return (
          <StyledInput
            {...props}
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
      </FormContainer>
    </>
  );
}

export default InputForm;
