import Colors from 'app/common/Colors';
import InputForm from 'app/common/components/InputForm';
import { Spacer, StyledButton } from 'app/common/styles';
import { useFormik } from 'formik';
import { ApiResponse } from 'global/services/api/types';
import _ from 'lodash';
import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import useNotification from 'utils/hooks/NotificationHook/useNotification';
import { useInjectSaga } from 'utils/redux-injectors';
// import { useNavigation } from 'utils/hooks/RouterHook';
import * as Yup from 'yup';
import { signIn } from '../actions';
import signInSaga from '../saga';

interface Props {
  email?: string;
}
const SignInForm = ({ email }: Props) => {
  useInjectSaga({
    key: 'sign-in',
    saga: signInSaga,
  });
  const dispatch = useDispatch();
  const [callSuccess, callError] = useNotification();
  // const navigate = useNavigation();
  const formik = useFormik({
    initialValues: {
      email: email || '',
      password: '',
    },
    validateOnBlur: true,
    validateOnChange: false,
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().min(8, 'Invalid Password').required('Required'),
    }),
    onSubmit: values => {
      console.log({
        submit: values,
        valid: formik.isValid,
        errors: formik.errors,
      });
    },
  });

  const onSuccess = (response: ApiResponse) => {
    if (response.success) {
      callSuccess('Successfully signed in.');
      formik.resetForm();
    }
    return null;
  };

  const onFailed = (errors?: string[]) => {
    return !!errors && callError(errors[0]);
  };

  const onClickSubmit = () => {
    formik.setErrors({});
    formik.setSubmitting(true);
    formik.validateForm().then(errors => {
      if (_.size(errors) === 0) {
        dispatch(signIn(formik.values, onSuccess, onFailed));
      } else {
        console.log('Error', { errors });
      }
      formik.setSubmitting(false);
    });
  };

  return (
    <SignInContainer>
      <Header>Sign In</Header>
      <Spacer height="0.1rem" />
      <SubHeader>Sign in to use Luxurify's service</SubHeader>

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

      <Spacer height="2rem" />
      <StyledButton
        onClick={onClickSubmit}
        disabled={!!_.size(formik.errors)}
        type="primary"
        loading={formik.isSubmitting}
        style={{ marginLeft: 'auto' }}
      >
        Sign In
      </StyledButton>
    </SignInContainer>
  );
};

export default SignInForm;

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

export const SignInContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: 5rem;
  padding: 0.5rem;
`;
