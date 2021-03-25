import { ApiResponse } from 'global/services/api/types';
import notification, { NotificationType } from 'global/services/notification';

const useNotification = (): [
  (msg: string) => void,
  (msg: string | ApiResponse) => void,
] => {
  const errors = (msg: string | ApiResponse) => {
    if (typeof msg === 'string') {
      notification.post(NotificationType.Error, msg);
    } else {
      const res = msg as ApiResponse;
      const messages =
        res.error && res.error['messages'] && res.error['messages'].join('\n');
      if (messages) {
        notification.post(NotificationType.Error, messages);
      }
    }
  };
  const success = (msg: string) => {
    notification.post(NotificationType.Success, msg);
  };
  return [success, errors];
};
export default useNotification;
