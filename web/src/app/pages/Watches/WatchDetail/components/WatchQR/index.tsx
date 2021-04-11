import React from 'react';
import ReactToPrint from 'react-to-print';
import QRCodePrint from './QRCodePrint';
import { PrinterOutlined, QrcodeOutlined } from '@ant-design/icons';
import QRCode from 'qrcode.react';
import { Collapse } from 'antd';
import styled from 'styled-components';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

const WatchQR = ({ watchName, id, uri, image }) => {
  const qrRef = React.useRef<any | null>(null);
  const { account } = useWeb3React<Web3Provider>();

  return (
    <>
      <StyledCollapse
        defaultActiveKey={0}
        ghost
        expandIcon={props => (
          <QrcodeOutlined
            style={{ fontSize: 16 }}
            rotate={props.isActive ? 180 : 0}
          />
        )}
      >
        <Collapse.Panel header={<MediumLabel>QR Code</MediumLabel>} key="1">
          <ReactToPrint
            documentTitle={`Luxurify_watch_${watchName || ''}`}
            trigger={() => (
              <StyledQRCode
                className="watch_QRCode"
                renderAs="canvas"
                id={id}
                value={JSON.stringify({ token: id, owner_account: account })}
                size={220}
                level={'L'}
                includeMargin={true}
              />
            )}
            content={() => qrRef.current}
          />
          <PrintText style={{ paddingLeft: '1rem' }}>
            <PrinterOutlined
              style={{
                fontSize: 16,
                marginRight: '0.6rem',
              }}
            />
            Click on the code to print
          </PrintText>
        </Collapse.Panel>
      </StyledCollapse>
      <InvisibleContainer>
        <QRCodePrint
          ref={qrRef}
          watchName={watchName || ''}
          watchId={+id || 0}
          watchImage={image}
          uri={uri || ''}
        />
      </InvisibleContainer>
    </>
  );
};

export default WatchQR;

export const InvisibleContainer = styled.div`
  display: none;
`;

export const StyledQRCode = styled(QRCode)`
  margin-bottom: 1rem;
  cursor: pointer;
  &:hover {
    box-shadow: 2px 2px 16px 4px rgba(0, 0, 0, 0.32);
  }
`;

export const PrintText = styled.div`
  display: flex;
  align-items: center;
`;

export const StyledCollapse = styled(Collapse)`
  &.ant-collapse
    > .ant-collapse-item
    > .ant-collapse-header
    .ant-collapse-arrow {
    left: 1px !important;
  }
  .ant-collapse-header {
    padding-left: 1.7rem !important;
  }
`;

const MediumLabel = styled.span`
  font-size: 1.1rem;
  font-weight: 600;
`;
