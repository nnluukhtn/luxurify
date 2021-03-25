import { InputProps } from 'antd';
import { FormContainer, FormLabel, StyledInput } from 'app/common/styles';
import React from 'react';
import InputPassword from '../InputPassword';

interface ComponentProps {
  name: string;
  label?: string;
  placeholder?: string;
}

type Props = ComponentProps & InputProps;

const InputForm = ({ name, label, placeholder, ...props }: Props) => {
  return (
    <>
      <FormContainer>
        {label && <FormLabel>{label}</FormLabel>}
        {props.type === 'password' ? (
          <InputPassword {...props} placeholder={placeholder} />
        ) : (
          <StyledInput {...props} placeholder={placeholder || 'Please enter'} />
        )}
      </FormContainer>
    </>
  );
};

export default InputForm;
