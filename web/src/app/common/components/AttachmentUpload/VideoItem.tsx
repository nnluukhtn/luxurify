import { RcFile } from 'antd/lib/upload';
import axios from 'axios';
import api from 'global/services/api';
import React, { useEffect, useState } from 'react';
import NormalItem from './NormalItem';
import Styled from './styles';
import { AttachmentFile, Status } from './types';

interface Props {
  inputFile: AttachmentFile;
  onRemove: (file: AttachmentFile) => void;
  onUploadSuccess: (resId: number, uploadedFile: any) => void;
  onFileUpload: (isUploading: boolean) => void;
}

const VideoItem = (props: Props) => {
  const {
    inputFile,
    onRemove,
    onUploadSuccess,
    onFileUpload,
    ...restProps
  } = props;

  const [status, setStatus] = useState<Status>(
    inputFile?.['status'] || 'not_started',
  );
  const [progress, setProgress] = useState(0);
  const [request] = useState(axios.CancelToken.source());

  const [uploadId, setUploadId] = useState<number | null>(null);

  const uploadFile = async (file: RcFile) => {
    setStatus('in_progress');
    onFileUpload(true);

    const params = {
      filename: file.name,
    };

    try {
      const getUrlResp: any = await api({
        method: 'post',
        route: '/safety/video_attachments',
        data: params,
      });

      if (getUrlResp?.id && getUrlResp?.upload_url) {
        const { id, upload_url } = getUrlResp;
        setUploadId(id);
        const uploadResp = await axios({
          method: 'put',
          url: upload_url,
          headers: {},
          data: file,
          onUploadProgress: (progressEvent: ProgressEvent) => {
            const { loaded, total } = progressEvent;
            const percentage = Math.floor((loaded / total) * 100);
            setProgress(percentage);
          },
          cancelToken: request.token,
        });

        if (uploadResp.status === 200) {
          setStatus('success');
          onFileUpload(false);
        }
      }
    } catch (error) {
      if (axios.isCancel(error)) {
        onFileUpload(false);
      } else {
        setStatus('failed');
        onFileUpload(false);
      }
    }
  };

  const handleOnRemove = (toBeRemovedFile: AttachmentFile) => {
    request.cancel(`Cancel uploading file ${toBeRemovedFile.uid}`);
    onRemove(toBeRemovedFile);
  };

  useEffect(() => {
    if (status === 'not_started') {
      uploadFile(inputFile as RcFile);
    }
    if (status === 'success' && uploadId) {
      onUploadSuccess(uploadId, inputFile);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputFile, status]);

  return (
    <Styled.VideoItemContainer {...restProps}>
      <NormalItem file={inputFile} onRemove={handleOnRemove} status={status} />
      {status === 'in_progress' && (
        <Styled.UploadProgressBarContainer>
          <Styled.ProgressBar width={progress} />
        </Styled.UploadProgressBarContainer>
      )}
      {status === 'failed' && (
        <span style={{ color: 'red', marginLeft: '18px' }}>
          Failed to upload.
        </span>
      )}
    </Styled.VideoItemContainer>
  );
};

export default VideoItem;
