import React, { useCallback, useEffect, useMemo } from 'react';
import InputForm from 'app/common/components/InputForm';
import { Header, Spacer, StyledButton, SubHeader } from 'app/common/styles';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import { Col, Row } from 'antd';
import { useRegisterWatchSlice } from '../slice';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import useNotification from 'utils/hooks/NotificationHook/useNotification';
import {
  RegisterWatchParams,
  RegisterWatchPayload,
  RegisterWatchResponse,
} from '../slice/types';
import _ from 'lodash';
import { useFnDebounce } from 'utils/hooks/DebounceHooks';
import { registerWatchAdapter } from '../adapter';
import {
  makeSelectWSWatch,
  makeSelectWSWatchLoading,
} from '../slice/selectors';

const RegisterWatchForms = () => {
  const { actions } = useRegisterWatchSlice();
  const dispatch = useDispatch();
  const [callSuccess, callError] = useNotification();
  const history = useHistory();
  const debounceFn = useFnDebounce();
  const formik = useFormik<RegisterWatchParams>({
    initialValues: {
      referenceNumber: '',
      brandName: '',
      model: '',
      powerReserve: '',
      caseDiameter: 0,
      waterResistanceAtm: '',
      movementName: '',
      braceletColorName: '',
      dialColorName: '',
      genderName: '',
      buckleName: '',
      glassName: '',
      caseMaterialName: '',
      braceletMaterialName: '',
      priceType: '',
      priceUnit: '',
      priceFixed: 0,
    },
    validateOnBlur: true,
    validateOnChange: false,
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      referenceNumber: Yup.string().required('Required'),
      brandName: Yup.string().required('Required'),
      model: Yup.string().required('Required'),
    }),
    onSubmit: values => {
      console.log({
        submit: values,
        valid: formik.isValid,
        errors: formik.errors,
      });
    },
  });

  const memoRefNum = useMemo(() => formik.values.referenceNumber, [
    formik.values.referenceNumber,
  ]);
  const watchData = useSelector(makeSelectWSWatch(memoRefNum));
  const isLoading = useSelector(makeSelectWSWatchLoading);

  // functions
  const getWSWatchData = useCallback(() => {
    if (!!memoRefNum && !watchData) {
      const callback = response => {
        if (response.success) {
          callSuccess(
            'Successfully get watch data for reference number: ' + memoRefNum,
          );
        } else {
          callError(
            'Failed to get watch data for reference number: ' + memoRefNum,
          );
        }
      };

      debounceFn(
        dispatch,
        2000,
        actions.fetchWSWatchData({
          referenceNumber: memoRefNum,
          callback,
        }),
      );
    } else {
      if (watchData?.referenceNumber === memoRefNum) {
        formik.setValues(watchData);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    memoRefNum,
    watchData,
    debounceFn,
    dispatch,
    actions,
    callSuccess,
    callError,
  ]);

  const handleUpdateValue = (name: string, value: string) =>
    formik.setFieldValue(name, value);

  const onClickSubmit = () => {
    formik.setErrors({});
    formik.setSubmitting(true);
    formik.validateForm().then(errors => {
      if (_.size(errors) === 0) {
        const callback = (response: RegisterWatchResponse) => {
          if (response.success) {
            callSuccess('Successfully registered a watch');
            formik.resetForm();
            history.goBack();
          } else {
            callError(
              'There is an error while trying to register watch, ' +
                response?.error?.message,
            );
          }
          formik.setSubmitting(false);
        };
        const watchPayload: RegisterWatchPayload = registerWatchAdapter(
          formik.values,
        );
        dispatch(actions.registerWatch({ params: watchPayload, callback }));
      } else {
        callError('Please check your info again.');
        formik.setSubmitting(false);
        console.log({ errors });
      }
    });
  };

  // useEffect(() => {
  //   getWSWatchData();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [memoRefNum]);

  useEffect(() => {
    if (watchData) formik.setValues(watchData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchData]);

  return (
    <RegisterWatchFormContainer>
      <Header>Register A Watch</Header>
      <SubHeader>Fill in the form to register your watch</SubHeader>
      <Spacer height="2.5rem" />
      <InputForm
        id="referenceNumber"
        name="referenceNumber"
        placeholder="Reference Number"
        disabled={isLoading}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          handleUpdateValue(
            'referenceNumber',
            event?.target?.value?.toUpperCase() || '',
          )
        }
      />
      <Spacer height=".3rem" />
      <Row style={{ width: '100%' }}>
        <StyledButton
          disabled={!memoRefNum || isLoading}
          onClick={() => getWSWatchData()}
          style={{ marginLeft: 'auto' }}
        >
          Get watch info
        </StyledButton>
      </Row>
      <Spacer height="2.5rem" />
      <InputForm
        id="brandName"
        name="brandName"
        placeholder="Brand Name"
        label="Brand Name"
        onChange={formik.handleChange}
        value={formik.values.brandName}
        error={formik.errors.brandName}
      />
      <Spacer height="0.7rem" />
      <InputForm
        id="model"
        name="model"
        placeholder="Model"
        label="Model Name"
        onChange={formik.handleChange}
        value={formik.values.model}
        error={formik.errors.model}
      />
      <Spacer height="0.7rem" />
      <InputForm
        id="caseDiameter"
        name="caseDiameter"
        placeholder="Case Diameter (mm)"
        label="Case Diameter (mm)"
        onChange={formik.handleChange}
        value={formik.values.caseDiameter}
        error={formik.errors.caseDiameter}
        type="number"
      />
      <Spacer height="0.7rem" />
      <InputForm
        id="movementName"
        name="movementName"
        placeholder="Movement Name"
        label="Movement Name"
        onChange={formik.handleChange}
        value={formik.values.movementName}
        error={formik.errors.movementName}
      />
      <Spacer height="0.7rem" />
      <InputForm
        id="powerReserve"
        name="powerReserve"
        placeholder="Power Reserve"
        label="Power Reserve"
        onChange={formik.handleChange}
        value={formik.values.powerReserve}
        error={formik.errors.powerReserve}
      />
      <Spacer height="0.7rem" />
      <InputForm
        id="waterResistanceAtm"
        name="waterResistanceAtm"
        placeholder="Water Resistance ATM"
        label="Water Resistance ATM"
        onChange={formik.handleChange}
        value={formik.values.waterResistanceAtm}
        error={formik.errors.waterResistanceAtm}
      />
      <Spacer height="0.7rem" />
      <InputForm
        id="braceletColorName"
        name="braceletColorName"
        placeholder="Bracelet Color Name"
        label="Bracelet Color Name"
        onChange={formik.handleChange}
        value={formik.values.braceletColorName}
        error={formik.errors.braceletColorName}
      />
      <Spacer height="0.7rem" />
      <InputForm
        id="dialColorName"
        name="dialColorName"
        placeholder="Dial Color Name"
        label="Dial Color Name"
        onChange={formik.handleChange}
        value={formik.values.dialColorName}
        error={formik.errors.dialColorName}
      />
      <Spacer height="0.7rem" />
      <InputForm
        id="genderName"
        name="genderName"
        placeholder="Gender Name"
        label="Gender Name"
        onChange={formik.handleChange}
        value={formik.values.genderName}
        error={formik.errors.genderName}
      />
      <Spacer height="0.7rem" />
      <InputForm
        id="buckleName"
        name="buckleName"
        placeholder="BuckleName"
        label="BuckleName"
        onChange={formik.handleChange}
        value={formik.values.buckleName}
        error={formik.errors.buckleName}
      />
      <Spacer height="0.7rem" />
      <InputForm
        id="glassName"
        name="glassName"
        placeholder="Glass Name"
        label="Glass Name"
        onChange={formik.handleChange}
        value={formik.values.glassName}
        error={formik.errors.glassName}
      />
      <Spacer height="0.7rem" />
      <InputForm
        id="caseMaterialName"
        name="caseMaterialName"
        placeholder="Case Material Name"
        label="Case Material Name"
        onChange={formik.handleChange}
        value={formik.values.caseMaterialName}
        error={formik.errors.caseMaterialName}
      />
      <Spacer height="0.7rem" />
      <InputForm
        id="braceletMaterialName"
        name="braceletMaterialName"
        placeholder="Bracelet Material Name"
        label="Bracelet Material Name"
        onChange={formik.handleChange}
        value={formik.values.braceletMaterialName}
        error={formik.errors.braceletMaterialName}
      />
      <Spacer height="0.7rem" />
      <InputForm
        id="priceType"
        name="priceType"
        placeholder="Price Type"
        label="Price Type"
        onChange={formik.handleChange}
        value={formik.values.priceType}
        error={formik.errors.priceType}
      />
      <Spacer height="0.7rem" />
      <InputForm
        id="priceUnit"
        name="priceUnit"
        placeholder="Price Unit"
        label="Price Unit"
        onChange={formik.handleChange}
        value={formik.values.priceUnit}
        error={formik.errors.priceUnit}
      />
      <Spacer height="0.7rem" />
      <InputForm
        id="priceFixed"
        name="priceFixed"
        placeholder="Price Fixed"
        label="Price Fixed"
        onChange={formik.handleChange}
        value={formik.values.priceFixed}
        error={formik.errors.priceFixed}
        type="number"
      />

      <Spacer height="2rem" />

      <Row style={{ width: '100%', marginTop: '2rem' }} justify="end">
        <Col>
          <StyledButton danger onClick={() => history.goBack()} type="link">
            Cancel
          </StyledButton>
        </Col>
        <Col
          style={{
            marginLeft: '1rem',
          }}
        >
          <StyledButton
            onClick={onClickSubmit}
            type="primary"
            loading={formik.isSubmitting}
          >
            Submit
          </StyledButton>
        </Col>
      </Row>
    </RegisterWatchFormContainer>
  );
};

export default RegisterWatchForms;

export const RegisterWatchFormContainer = styled.div`
  margin: 5rem auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
