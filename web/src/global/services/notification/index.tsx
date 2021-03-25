import React from 'react';
import { notification } from 'antd';
import { NotificationType } from './constants';
import Colors from 'app/common/Colors';
import styled from 'styled-components';

const Icon = styled.span`
  font-size: 22px;
`;

// To get the styles working, we have to put import notificationCss to your GlobalStyle
export const notificationCss = `
  .ant-notification-notice {
    padding-left: 12px;
  }
  .ant-notification-notice-with-icon .ant-notification-notice-message,
  .ant-notification-notice-message {
    display: block;
    font-size: 14px;
    color: ${Colors.N900_BLACK};
    line-height: 20px;
  }
  .ant-notification-notice-with-icon {
    & .ant-notification-notice-message {
      margin-left: 42px;
    }
    & .ant-notification-notice-description {
      margin-left: 42px;
    }
  }
  .ant-notification-notice-content {
    padding-right: 12px;
  }
`;

const notificationIcon = (type: NotificationType, color: string) => {
  switch (type) {
    case 'success': {
      return <Icon className="fas fa-check-circle" style={{ color }} />;
    }
    case 'error': {
      return <Icon className="fas fa-exclamation-circle" style={{ color }} />;
    }
    default: {
      return null;
    }
  }
};

const post = (
  type: NotificationType,
  title: string,
  message: string | null = '',
) => {
  let color = Colors.B400_BLUE;
  let duration = 4.5;
  switch (type) {
    case 'success': {
      color = Colors.G400_GREEN;
      break;
    }
    case 'error': {
      color = Colors.R400_RED;
      duration = 0;
      break;
    }
    default: {
      color = Colors.B300_BLUE;
      break;
    }
  }
  notification.open({
    description: message,
    message: title,
    duration,
    icon: notificationIcon(type, color),
    style: {
      borderLeft: color,
      borderLeftWidth: 8,
      borderLeftStyle: 'solid',
    },
  });
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  post,
};

export { NotificationType } from './constants';
