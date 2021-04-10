import Colors from 'app/common/Colors';
import InputForm from 'app/common/components/InputForm';
import { Spacer, StyledButton, StyledCheckbox } from 'app/common/styles';
import { useFormik } from 'formik';
import _ from 'lodash';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { useInjectSaga } from 'redux-injectors';
import styled from 'styled-components';
import useNotification from 'utils/hooks/NotificationHook/useNotification';
import { selectIsAuthenticated } from 'utils/SessionActions/SessionSelector';
import * as Yup from 'yup';
import { createUserAccount } from '../actions';
import createUserSaga from '../saga';
import { CreateUserResponse } from '../types';

const RegistrationForm = () => {
  useInjectSaga({
    key: 'sign-up',
    saga: createUserSaga,
  });
  const history = useHistory();

  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);
  const [callSuccess, callError] = useNotification();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      password_confirmation: '',
    },
    validateOnBlur: false,
    validateOnChange: false,
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string()
        .min(8, 'Please use at least 8 characters')
        .required('Required'),
      password_confirmation: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Required'),
    }),
    onSubmit: values => {
      console.log({
        submit: values,
        valid: formik.isValid,
        errors: formik.errors,
      });
    },
  });

  const onSuccess = (response: CreateUserResponse) => {
    if (response.success) {
      if (!!response.response.email) {
        callSuccess('Created account successfully.');
        history.push(`/sign-in/?email=${response.response.email}`);
      }
      if (isAuthenticated) {
        callSuccess('Created account successfully.');
        history.push('/');
      }
      formik.resetForm();
      formik.setSubmitting(false);
    }
    return null;
  };
  const onFailed = (errors?: string[]) => {
    formik.setSubmitting(false);
    return !!errors && callError(errors[0]);
  };

  const onClickSubmit = () => {
    formik.setErrors({});
    formik.setSubmitting(true);
    formik.validateForm().then(errors => {
      if (_.size(errors) === 0) {
        dispatch(createUserAccount(formik.values, onSuccess, onFailed));
      } else {
        console.log('Error', { errors });
        formik.setSubmitting(false);
      }
    });
  };

  return (
    <RegistrationContainer>
      <Header>Sign Up</Header>
      <Spacer height="0.1rem" />
      <SubHeader>Fill in the form to create an account</SubHeader>

      <Spacer height="2rem" />
      <InputForm
        id="email"
        name="email"
        placeholder="Email"
        type="email"
        onChange={formik.handleChange}
        value={formik.values.email}
      />

      <Spacer height="0.7rem" />
      <InputForm
        id="password"
        name="password"
        placeholder="Password"
        type="password"
        onChange={formik.handleChange}
        value={formik.values.password}
      />

      <Spacer height="0.7rem" />
      <InputForm
        id="password_confirmation"
        name="password_confirmation"
        placeholder="Confirm your password"
        type="password"
        onChange={formik.handleChange}
        value={formik.values.password_confirmation}
      />

      <Spacer height="1rem" />
      <StyledCheckbox checked={checked} onChange={() => setChecked(!checked)}>
        Ready to rock ?
      </StyledCheckbox>

      <Spacer height="2rem" />
      <StyledButton
        onClick={onClickSubmit}
        disabled={!checked}
        type="primary"
        loading={formik.isSubmitting}
        style={{ marginLeft: 'auto' }}
      >
        Sign Up
      </StyledButton>
    </RegistrationContainer>
  );
};

export default RegistrationForm;

export const Header = styled.div`
  font-size: 1.7rem;
  font-weight: 450;
  margin: 0;
  color: ${Colors.N800_BLACK};
  font-family: 'Cormorant Garamond', serif;
`;

export const SubHeader = styled.div`
  font-size: 0.8rem;
  font-weight: 300;
`;

export const RegistrationContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: 5rem;
  padding: 0.5rem;
`;
