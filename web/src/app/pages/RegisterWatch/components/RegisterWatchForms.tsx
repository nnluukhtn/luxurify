import React, { useCallback, useEffect, useMemo } from 'react';
import InputForm from 'app/common/components/InputForm';
import {
  FormContainer,
  Header,
  Spacer,
  StyledButton,
  SubHeader,
} from 'app/common/styles';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import { Col, Row, Select } from 'antd';
import { useRegisterWatchSlice } from '../slice';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import useNotification from 'utils/hooks/NotificationHook/useNotification';
import { RegisterWatchParams } from '../slice/types';
import _ from 'lodash';
import { useFnDebounce } from 'utils/hooks/DebounceHooks';
import {
  makeSelectWSWatch,
  makeSelectWSWatchLoading,
} from '../slice/selectors';
import { useRegisterBrandSlice } from 'app/pages/RegisterBrand/slice';
import { makeSelectWSBrandOptions } from 'app/pages/RegisterBrand/slice/selectors';
import AttachmentUpload from 'app/common/components/AttachmentUpload';
import ErrorContainer from 'app/common/components/ErrorContainer';
import { AttachmentFile } from 'app/common/components/AttachmentUpload/types';

interface Props {
  onSubmit: (values: any) => void;
}

const RegisterWatchForms = ({ onSubmit }: Props) => {
  const { actions } = useRegisterWatchSlice();
  const { actions: registerBrandActions } = useRegisterBrandSlice();
  const dispatch = useDispatch();
  const [callSuccess, callError] = useNotification();
  const history = useHistory();
  const debounceFn = useFnDebounce();
  const formik = useFormik<RegisterWatchParams>({
    initialValues: {
      referenceNumber: '',
      brandName: '',
      watchName: '',
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
      bucketMaterialName: '',
      priceType: '',
      priceUnit: '',
      priceFixed: 0,
      image: [],
      innerImage: [],
    },
    validateOnBlur: true,
    validateOnChange: false,
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      referenceNumber: Yup.string().required('Required'),
      brandName: Yup.string().required('Required'),
      watchName: Yup.string().required('Required'),
      model: Yup.string().required('Required'),
      powerReserve: Yup.number().required('Required').min(0.1, 'Required'),
      caseDiameter: Yup.number().required('Required').min(0.1, 'Required'),
      waterResistanceAtm: Yup.string().required('Required'),
      movementName: Yup.string().required('Required'),
      braceletColorName: Yup.string().required('Required'),
      dialColorName: Yup.string().required('Required'),
      genderName: Yup.string().required('Required'),
      buckleName: Yup.string().required('Required'),
      glassName: Yup.string().required('Required'),
      caseMaterialName: Yup.string().required('Required'),
      braceletMaterialName: Yup.string().required('Required'),
      bucketMaterialName: Yup.string().required('Required'),
      priceType: Yup.string().required('Required'),
      priceUnit: Yup.string().required('Required'),
      priceFixed: Yup.number().required('Required').min(0.1, 'Required'),
      image: Yup.array().length(1, 'Required'),
      innerImage: Yup.array().length(1, 'Required'),
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
  const brandOptions = useSelector(makeSelectWSBrandOptions);

  // functions
  const getWSWatchData = useCallback(() => {
    if (!!memoRefNum && !watchData) {
      const callback = response => {
        if (response.success && response.response.data?.[0]) {
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
        1000,
        actions.fetchWSWatchData({
          referenceNumber: memoRefNum,
          callback,
        }),
      );
    } else {
      if (watchData?.referenceNumber === memoRefNum) {
        formik.setValues({ ...formik.values, ...watchData });
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

  const handleUpdateValue = (name: string, value: string) => {
    formik.setFieldValue(name, value);
  };

  const onClickSubmit = () => {
    formik.setErrors({});
    formik.setSubmitting(true);
    formik.validateForm().then(errors => {
      if (_.size(errors) === 0) {
        onSubmit(formik.values);
      } else {
        callError('Please check your info again.');
        formik.setSubmitting(false);
        console.log({ errors });
      }
      formik.setSubmitting(false);
    });
  };

  const handleOnFileUpload = (isUploading: boolean) => {
    formik.setSubmitting(isUploading);
  };

  const handleAttachmentChange = (fieldName: string) => (
    type: string,
    files: AttachmentFile[],
  ) => {
    if (type === 'file') {
      formik.setFieldValue(fieldName, files);
    }
  };

  useEffect(() => {
    if (!brandOptions) dispatch(registerBrandActions.fetchWSBrands({}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, registerBrandActions]);

  useEffect(() => {
    if (watchData) formik.setValues({ ...formik.values, ...watchData });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchData]);

  return (
    <>
      <RegisterWatchFormContainer>
        <Header>Register A Watch</Header>
        <SubHeader>Fill in the form to register your watch</SubHeader>
        <Spacer height="2.5rem" />
        <InputForm
          id="referenceNumber"
          name="referenceNumber"
          placeholder="Reference Number"
          label="Reference Number"
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
            disabled={!memoRefNum}
            loading={isLoading}
            onClick={() => getWSWatchData()}
            style={{ marginLeft: 'auto' }}
          >
            Get watch info
          </StyledButton>
        </Row>
        <Spacer height="2.5rem" />
        <InputForm
          type="autocomplete"
          options={brandOptions}
          defaultOptions={brandOptions}
          value={formik.values.brandName}
          onChange={value => handleUpdateValue('brandName', value)}
          placeholder="Brand Name"
          label="Brand Name"
          searchCondition={(keyword, option) =>
            option.value.toLowerCase().indexOf(keyword.toLowerCase()) >= 0
          }
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
          id="watchName"
          name="watchName"
          placeholder="Watch Name"
          label="Watch Name"
          onChange={formik.handleChange}
          value={formik.values.watchName}
          error={formik.errors.watchName}
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
          type="number"
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
          id="bucketMaterialName"
          name="bucketMaterialName"
          placeholder="Bucket Material Name"
          label="Bucket Material Name"
          onChange={formik.handleChange}
          value={formik.values.bucketMaterialName}
          error={formik.errors.bucketMaterialName}
        />
        <Spacer height="0.7rem" />
        <InputForm
          id="priceType"
          name="priceType"
          placeholder="Price Type"
          label="Price Type"
          handleOnSelect={(value, _option) =>
            handleUpdateValue('priceType', value)
          }
          value={formik.values.priceType}
          error={formik.errors.priceType}
          type="select"
        >
          <Select.Option value="fixed">fixed</Select.Option>
          <Select.Option value="dynamic">dynamic</Select.Option>
        </InputForm>
        <Spacer height="0.7rem" />
        <InputForm
          id="priceUnit"
          name="priceUnit"
          placeholder="Price Unit"
          label="Price Unit"
          handleOnSelect={(value, _option) =>
            handleUpdateValue('priceUnit', value)
          }
          value={formik.values.priceUnit}
          error={formik.errors.priceUnit}
          type="select"
        >
          <Select.Option value="BTC">BTC</Select.Option>
          <Select.Option value="ETH">ETH</Select.Option>
          <Select.Option value="BNB">BNB</Select.Option>
        </InputForm>
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
        <Spacer height="0.7rem" />
        <FormContainer>
          <AttachmentUpload
            fileList={formik.values.image || []}
            onFileChange={handleAttachmentChange('image')}
            onFileUpload={handleOnFileUpload}
            label="Image"
            accept={'image/*'}
            placeholder="Add an image file"
            allowMultiple={false}
            limitAmount={1}
          />
          {!!formik.errors.image && (
            <ErrorContainer>{formik.errors.image}</ErrorContainer>
          )}
        </FormContainer>
        <Spacer height="0.7rem" />
        <FormContainer>
          <AttachmentUpload
            fileList={formik.values.innerImage || []}
            onFileChange={handleAttachmentChange('innerImage')}
            onFileUpload={handleOnFileUpload}
            label="Inner Image"
            accept={'image/*'}
            placeholder="Add an image file"
            allowMultiple={false}
            limitAmount={1}
          />
          {!!formik.errors.innerImage && (
            <ErrorContainer>{formik.errors.innerImage}</ErrorContainer>
          )}
        </FormContainer>

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
    </>
  );
};

export default RegisterWatchForms;

export const RegisterWatchFormContainer = styled.div`
  margin: 5rem auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
