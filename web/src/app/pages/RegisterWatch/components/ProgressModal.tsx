import { Progress, Typography } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React from 'react';
import { PropagateLoader } from 'react-spinners';

const overide = `
  display: block;
  right: -90px;
`;

interface Props {
  actionName: string;
  percent: number;
  loading: boolean;
  visible: boolean;
  onClose: () => void;
  getContent?: () => React.ReactNode;
  closable?: boolean;
}

const ProgressModal = ({
  actionName,
  visible,
  loading,
  percent,
  onClose,
  getContent,
  closable = true,
}: Props) => {
  return (
    <Modal
      visible={visible}
      centered
      title={null}
      footer={null}
      closable={closable}
      bodyStyle={{
        height: 300,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
      }}
      onCancel={onClose}
    >
      <Typography.Title level={4} style={{ fontSize: '1.3rem' }}>
        {actionName}
      </Typography.Title>
      {getContent && <Typography.Text>{getContent()}</Typography.Text>}
      <div style={{ position: 'relative', width: 200 }}>
        {loading ? (
          <PropagateLoader size={15} color="#ffb82f" css={overide} />
        ) : (
          <p>Please close this pop up.</p>
        )}
        <br />
      </div>
      <div style={{ width: 450 }}>
        <Progress
          showInfo
          strokeColor={{ '0%': '#e63b00', '70%': '#ffb82f', '100%': '#B1FF91' }}
          percent={percent}
          width={450}
        />
      </div>
    </Modal>
  );
};

export default ProgressModal;
