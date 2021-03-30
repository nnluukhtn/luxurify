import { Button, Divider, List } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import Colors from 'app/common/Colors';
import { PageContainer } from 'app/common/components';
import { Container, Header, Spacer } from 'app/common/styles';
import { ApiResponse } from 'global/services/api/types';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import useNotification from 'utils/hooks/NotificationHook/useNotification';
import {
  makeSelectBrandsById,
  makeSelectBrandsIds,
  makeSelectBrandsLoading,
} from './selectors';
import { useBrandSlice } from './slice';
import { AdminBrandsState } from './types';

export function Brands() {
  const { actions } = useBrandSlice();
  const brandById: AdminBrandsState['byId'] = useSelector(makeSelectBrandsById);
  const brands: number[] = useSelector(makeSelectBrandsIds);
  const isLoading = useSelector(makeSelectBrandsLoading);
  const dispatch = useDispatch();
  const history = useHistory();
  const [callSuccess, callError] = useNotification();
  const [selectedId, setID] = useState<number>(0);
  const selectedBrand = brandById?.[selectedId] || {};

  const onShowModal = (brandId: number) => {
    setID(brandId);
  };

  const callback = (response: ApiResponse, action: string) => {
    if (response.success) {
      callSuccess(`Successfully ${action} brand request.`);
      dispatch(actions.fetchPendingBrands({}));
    } else {
      callError(
        response.error?.messages?.[0] || `Error while trying to ${action}.`,
      );
    }
    setID(0);
  };

  const onApprove = (brandId: number) => {
    dispatch(actions.approveBrand({ brandId, callback }));
  };

  const onReject = (brandId: number) => {
    dispatch(actions.rejectBrand({ brandId, callback }));
  };

  useEffect(() => {
    dispatch(actions.fetchPendingBrands({}));
  }, [actions, dispatch]);

  return (
    <>
      <Helmet>
        <title>Admin Sign In</title>
        <meta name="description" content="Luxurify - Admin Sign In" />
      </Helmet>

      <Container style={{ overflow: 'hidden' }}>
        <PageContainer
          fluid
          style={{
            overflow: 'auto',
            height: '90vh',
            margin: '0 auto',
          }}
          innerStyle={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Action onClick={() => history.push('/')}>Back to Home</Action>
          <Header style={{ width: 'fit-content' }}>
            Pending Request Brands
          </Header>

          <Divider />

          <Spacer height="2.5rem" />

          <StyledList
            className="brand-list"
            loading={isLoading}
            itemLayout="horizontal"
            style={{ width: '60%' }}
            dataSource={brands}
            size="small"
            renderItem={brandId => {
              const brand = brandById?.[brandId as number]?.brand || {};
              return (
                <List.Item
                  actions={[
                    <Action onClick={() => onApprove(brandId as number)}>
                      approve
                    </Action>,
                    <Action danger onClick={() => onReject(brandId as number)}>
                      reject
                    </Action>,
                  ]}
                  style={{ cursor: 'pointer' }}
                >
                  <ItemContent onClick={() => onShowModal(brandId as number)}>
                    <List.Item.Meta
                      title={<Title>{`${brand?.id} - ${brand?.name}`}</Title>}
                      description={brand?.category}
                    />
                    <Status status={brand?.status}>
                      {brand?.status || 'N/A'}
                    </Status>
                  </ItemContent>
                </List.Item>
              );
            }}
          />
        </PageContainer>

        <Modal
          visible={selectedId > 0}
          title="BRAND DETAIL"
          onCancel={() => setID(0)}
          footer={
            <>
              <Button type="primary" onClick={() => onApprove(selectedId)}>
                Approve
              </Button>
              <Button
                type="primary"
                danger
                onClick={() => onReject(selectedId)}
              >
                Reject
              </Button>
            </>
          }
        >
          <p>
            ID: <strong>{selectedBrand?.brand?.id}</strong>
          </p>
          <p>
            Name: <strong>{selectedBrand?.brand?.name}</strong>
          </p>
          <p>
            Category: <strong>{selectedBrand?.brand?.category}</strong>
          </p>
          <p>
            Register by:{' '}
            <strong>
              {selectedBrand?.user?.id} - {selectedBrand?.user?.email}
            </strong>
          </p>
          <p>
            <a
              href={selectedBrand?.brand?.bir_2303_certification_url}
              target="blank"
              rel="noreferrer"
            >
              Bir 2303 Certification
            </a>
          </p>
          <p>
            <a
              href={selectedBrand?.brand?.certificate_of_registration_url}
              target="blank"
              rel="noreferrer"
            >
              Certification of Registration
            </a>
          </p>
        </Modal>
      </Container>
    </>
  );
}

export const Content = styled.div`
  max-width: 960px;
  margin: 0 auto;
`;

export const ItemContent = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

export const StyledList = styled(List)`
  .brand-list {
    min-height: 350px;
  }
`;

export const Title = styled.span`
  font-weight: 600;
`;

export const FileLinks = styled.div`
  width: 260px;
  font-size: 10px !important;
`;

export const Status = styled.div<{ status?: string }>`
  color: ${({ status }) =>
    !!status
      ? status === 'pending'
        ? Colors.O500_ORANGE
        : status === 'approved'
        ? Colors.R400_RED
        : status === 'rejected'
        ? Colors.N500_GREY
        : Colors.N900_BLACK
      : 'black'};
  font-weight: 600;
  text-transform: uppercase;
  margin-right: 4rem;
`;

export const Action = styled(Button).attrs({
  type: 'link',
  size: 'small',
})``;
