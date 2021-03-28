import { Col, Row } from 'antd';
import Colors from 'app/common/Colors';
import InputForm from 'app/common/components/InputForm';
import { Spacer, StyledButton } from 'app/common/styles';
import { makeSelectLocation } from 'app/selectors';
import { useFormik } from 'formik';
import { ApiResponse } from 'global/services/api/types';
import _ from 'lodash';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import useNotification from 'utils/hooks/NotificationHook/useNotification';
// import { useNavigation } from 'utils/hooks/RouterHook';
import * as Yup from 'yup';
import { signIn } from '../actions';
import { Button } from 'antd';

interface Props {
  email?: string;
  isAdmin?: boolean;
  action?: (...args: any) => void;
}
const SignInForm = ({ email, isAdmin, action = signIn }: Props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useSelector(makeSelectLocation());
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
      if (location?.query?.redirect) history.push(location.query.redirect);
      formik.resetForm();
    }
    formik.setSubmitting(false);
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
        dispatch(action(formik.values, onSuccess, onFailed));
        formik.setSubmitting(false);
      } else {
        callError('Please check your info again.');
      }
    });
  };

  return (
    <SignInContainer>
      <Header>{isAdmin ? 'Admin ' : ''}Sign In</Header>
      <Spacer height="0.1rem" />
      <SubHeader>
        Sign in to {isAdmin ? 'manage' : 'use'} Luxurify's service
      </SubHeader>

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
      <Row style={{ width: '100%' }}>
        <Col span={6}></Col>
        <Col span={9} style={{ textAlign: 'right' }}>
          {!isAdmin && (
            <StyledButton
              onClick={() => history.push('/sign-up')}
              type="default"
              style={{ marginLeft: 'auto' }}
            >
              Sign Up
            </StyledButton>
          )}
        </Col>
        <Col span={9} style={{ textAlign: 'right' }}>
          <StyledButton
            onClick={onClickSubmit}
            disabled={!!_.size(formik.errors)}
            type="primary"
            loading={formik.isSubmitting}
          >
            Sign In
          </StyledButton>
        </Col>
      </Row>
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          marginTop: 64,
        }}
      >
        <Button
          type="link"
          onClick={() => history.push(isAdmin ? '/sign-in' : '/admin/sign-in')}
          style={{ fontSize: 12 }}
        >
          Sign in as {isAdmin ? 'User' : 'Admin'}
        </Button>
      </div>
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
