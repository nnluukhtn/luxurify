import InputForm from 'app/common/components/InputForm';
import {
  FormContainer,
  Header,
  Spacer,
  StyledButton,
  SubHeader,
} from 'app/common/styles';
import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import {
  BrandPayload,
  RegisterBrandParams,
  RegisterBrandResponse,
} from '../slice/types';
import * as Yup from 'yup';
import AttachmentUpload from 'app/common/components/AttachmentUpload';
import { AttachmentFile } from 'app/common/components/AttachmentUpload/types';
import { Col, Row } from 'antd';
import { useHistory } from 'react-router';
import _ from 'lodash';
import useNotification from 'utils/hooks/NotificationHook/useNotification';
import { useDispatch, useSelector } from 'react-redux';
import ErrorContainer from 'app/common/components/ErrorContainer';
import { useRegisterBrandSlice } from '../slice';
import { makeSelectWSBrandOptions } from '../slice/selectors';
import { registerBrandAdapter } from '../adapter';

const RegisterBrandForms = () => {
  const { actions } = useRegisterBrandSlice();
  const dispatch = useDispatch();
  const [callSuccess, callError] = useNotification();
  const history = useHistory();
  const brandOptions = useSelector(makeSelectWSBrandOptions);

  const formik = useFormik<BrandPayload>({
    initialValues: {
      name: '',
      category: '',
      bir2303Cert: [],
      registrationCert: [],
    },
    validateOnBlur: true,
    validateOnChange: false,
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      name: Yup.string().required('Required'),
      category: Yup.string().required('Required'),
      bir2303Cert: Yup.array()
        .of(
          Yup.mixed().test('Required', value => {
            return !!value.type && !!value.uid;
          }),
        )
        .min(1, 'Required'),
      registrationCert: Yup.array()
        .of(
          Yup.mixed().test('Required', value => {
            return !!value.type && !!value.uid;
          }),
        )
        .min(1, 'Required'),
    }),
    onSubmit: values => {
      console.log({
        submit: values,
        valid: formik.isValid,
        errors: formik.errors,
      });
    },
  });

  const handleUpdateValue = (name: string, value: string) =>
    formik.setFieldValue(name, value);

  const onClickSubmit = () => {
    formik.setErrors({});
    formik.setSubmitting(true);
    formik.validateForm().then(errors => {
      if (_.size(errors) === 0) {
        const callback = (response: RegisterBrandResponse) => {
          if (response.success) {
            callSuccess('Successfully registered a brand');
            formik.resetForm();
            history.goBack();
          } else {
            callError(
              'There is an error while trying to register brand, ' +
                response?.error?.message,
            );
          }
          formik.setSubmitting(false);
        };
        const brandPayload: RegisterBrandParams = registerBrandAdapter(
          formik.values,
        );
        dispatch(actions.registerBrand({ params: brandPayload, callback }));
      } else {
        callError('Please check your info again.');
        formik.setSubmitting(false);
        console.log({ errors });
      }
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
    dispatch(actions.fetchWSBrands({}));
  }, [actions, dispatch]);

  return (
    <RegisterBrandFormContainer>
      <Header>Register A Brand</Header>
      <SubHeader>Fill in the form to register your brand</SubHeader>
      <Spacer height="2.5rem" />
      <InputForm
        type="autocomplete"
        options={brandOptions}
        handleOnSelect={value => handleUpdateValue('name', value)}
        placeholder="Brand Name"
        searchCondition={(keyword, option) =>
          option.value.toLowerCase().indexOf(keyword.toLowerCase()) >= 0
        }
        error={formik.errors.name}
      />
      <Spacer height="0.7rem" />
      <InputForm
        id="category"
        name="category"
        placeholder="Brand Category"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          handleUpdateValue(
            'category',
            event?.target?.value?.toLowerCase() || '',
          )
        }
        value={formik.values.category}
        error={formik.errors.name}
      />

      <Spacer height="2rem" />
      <FormContainer>
        <AttachmentUpload
          fileList={formik.values.bir2303Cert || []}
          onFileChange={handleAttachmentChange('bir2303Cert')}
          onFileUpload={handleOnFileUpload}
          label="Bir 2303 Certification"
          accept={'image/*,.pdf'}
          placeholder="Add pdf or image file"
          allowMultiple={false}
          limitAmount={1}
        />
        {!!formik.errors.bir2303Cert && (
          <ErrorContainer>{formik.errors.bir2303Cert}</ErrorContainer>
        )}
      </FormContainer>
      <Spacer height="1.5rem" />
      <FormContainer>
        <AttachmentUpload
          fileList={formik.values.registrationCert || []}
          onFileChange={handleAttachmentChange('registrationCert')}
          onFileUpload={handleOnFileUpload}
          label="Certification of Registration"
          accept={'image/*,.pdf'}
          placeholder="Add pdf or image file"
          allowMultiple={false}
          limitAmount={1}
        />
        {!!formik.errors.registrationCert && (
          <ErrorContainer>{formik.errors.registrationCert}</ErrorContainer>
        )}
      </FormContainer>
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
    </RegisterBrandFormContainer>
  );
};

export default RegisterBrandForms;

export const RegisterBrandFormContainer = styled.div`
  margin: 3rem auto 5rem auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
