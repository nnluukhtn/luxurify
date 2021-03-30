import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { registerBrandSaga } from './saga';
import { RegisterBrandState } from './types';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import RegisterBrandForms from './components/RegisterBrandForms';
import { PageContainer } from 'app/common/components';
import { Container } from 'app/common/styles';

export const initialState: RegisterBrandState = {};

const slice = createSlice({
  name: 'registerBrand',
  initialState,
  reducers: {
    someAction(state, action: PayloadAction<any>) {},
  },
});

export const { actions: registerBrandActions } = slice;

export const useRegisterBrandSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: registerBrandSaga });
  return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useRegisterBrandSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */

export function RegisterBrand() {
  useInjectSaga({
    key: slice.name,
    saga: registerBrandSaga,
  });
  return (
    <>
      <Helmet>
        <title>Register Brand</title>
        <meta name="description" content="Luxurify - Register Brand" />
      </Helmet>

      <Container>
        <PageContainer
          fluid
          innerStyle={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          <RegisterBrandForms />
        </PageContainer>
      </Container>
    </>
  );
}
