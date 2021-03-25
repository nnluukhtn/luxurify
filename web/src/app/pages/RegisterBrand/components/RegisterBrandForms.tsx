import InputForm from 'app/common/components/InputForm';
import { Header, Spacer, SubHeader } from 'app/common/styles';
import { useFormik } from 'formik';
import React from 'react';
import styled from 'styled-components';
import { BrandPayload } from '../types';
import * as Yup from 'yup';

const RegisterBrandForms = () => {
  const formik = useFormik<BrandPayload>({
    initialValues: {
      name: '',
      category: '',
      bir2303Cert: null,
      registrationCert: null,
    },
    validateOnBlur: true,
    validateOnChange: false,
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      name: Yup.string().required('Required'),
      category: Yup.string().required('Required'),
    }),
    onSubmit: values => {
      console.log({
        submit: values,
        valid: formik.isValid,
        errors: formik.errors,
      });
    },
  });

  return (
    <RegisterBrandFormContainer>
      <Header>Register A Brand</Header>
      <SubHeader>Fill in the form to register your brand</SubHeader>
      <Spacer height="2.5rem" />
      <InputForm
        id="name"
        name="name"
        placeholder="Brand Name"
        onChange={formik.handleChange}
        value={formik.values.name}
      />
      <Spacer height="0.7rem" />
      <InputForm
        id="category"
        name="category"
        placeholder="Brand Category"
        onChange={formik.handleChange}
        value={formik.values.category}
      />
      <Spacer height="0.7rem" />
      <InputForm
        id="bir2303Cert"
        name="bir2303Cert"
        placeholder="Bir 2303 Certification"
        onChange={formik.handleChange}
        value={formik.values.bir2303Cert}
      />
      <Spacer height="0.7rem" />
      <InputForm
        id="registrationCert"
        name="name"
        placeholder="Brand Name"
        onChange={formik.handleChange}
        value={formik.values.name}
      />
    </RegisterBrandFormContainer>
  );
};

export default RegisterBrandForms;

export const RegisterBrandFormContainer = styled.div`
  margin: 5rem auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
