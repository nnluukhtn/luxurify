import React from 'react';
import { Button } from 'antd';
import { RcFile } from 'antd/lib/upload';
import Styled from './styles';
import NormalItem from './NormalItem';
import ImageItem from './ImageItem';
import VideoItem from './VideoItem';
import { Attachment, AttachmentFile } from './types';
import useNotification from 'utils/hooks/NotificationHook/useNotification';
import { FormLabel } from 'app/common/styles';
import { UploadOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const ButtonContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonText = styled.div``;

interface ComponentProps {
  fileList?: RcFile[];
  videoList?: AttachmentFile[];
  accept?: string;
  allowMultiple?: boolean;
  btntitle?: string;
  label?: string;
  placeholder?: string;
  videoLimit?: number;
  onFileChange: (type: string, files: AttachmentFile[]) => void;
  onFileUpload: (isUploading: boolean) => void;
  limitAmount?: number;
}

const AttachmentUpload = (props: ComponentProps) => {
  const {
    fileList,
    videoList,
    accept,
    allowMultiple,
    btntitle,
    label,
    placeholder,
    videoLimit = 100000000,
    onFileChange,
    onFileUpload,
    limitAmount,
  } = props;
  const [, callError] = useNotification();
  const isDisabled = !!limitAmount && (fileList || []).length >= limitAmount;
  const getBase64 = (file, cb) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      cb(reader.result);
    };
    reader.onerror = er => {
      callError('There is an error when reading selected file.');
    };
  };

  const onBeforeUpload = (file: AttachmentFile) => {
    if (!!limitAmount && (fileList || []).length >= limitAmount) return false;
    if (file.type.includes('image')) {
      getBase64(file, result => {
        file['thumbUrl'] = result;
        onFileChange('file', [...(fileList || []), file as RcFile]);
      });
    } else if (file.type.includes('video')) {
      if (file.size > videoLimit) {
        callError('Attachment can not be greater than 100 megabytes per file');
      } else {
        onFileChange('video', [...(videoList || []), file]);
      }
    } else {
      onFileChange('file', [...(fileList || []), file as RcFile]);
    }
    return false;
  };

  const handleOnRemove = (toBeRemovedFile: any) => {
    if (toBeRemovedFile.type.includes('video')) {
      const newVideoList = (videoList || []).filter(
        file =>
          (file['uid'] && file.uid !== toBeRemovedFile.uid) ||
          (file as Attachment).id !== toBeRemovedFile.id,
      );
      onFileChange('video', newVideoList);
    } else {
      const newFileList = (fileList || []).filter(
        file =>
          file.uid !== toBeRemovedFile.uid ||
          (file as any).id !== toBeRemovedFile.id,
      );
      onFileChange('file', newFileList);
    }
  };

  const handleSuccessUpload = (resId: number, uploadedFile: any) => {
    const newVideoList = (videoList || []).map(video => {
      if (video['uid'] && video.uid === uploadedFile.uid) {
        (video as any).id = resId;
        return video;
      }
      return video;
    });

    onFileChange('video', newVideoList);
  };

  return (
    <Styled.Container>
      <Styled.StyledUpload
        multiple={allowMultiple}
        showUploadList={false}
        action=""
        type="select"
        // fileList={uploadFiles}
        beforeUpload={onBeforeUpload}
        accept={accept}
        className="upload-list-inline"
        disabled={isDisabled}
      >
        <FormLabel>{label}</FormLabel>
        <Button type="link" style={{ padding: 0 }} disabled={isDisabled}>
          {btntitle ? (
            btntitle
          ) : (
            <ButtonContent>
              <UploadOutlined
                style={{
                  display: 'inline-block',
                  marginRight: '0.5rem',
                  marginBottom: '0.1rem',
                  fontSize: 16,
                }}
              />
              <ButtonText>Upload file</ButtonText>
            </ButtonContent>
          )}
        </Button>
      </Styled.StyledUpload>
      {(fileList === undefined || fileList?.length === 0) &&
      (videoList === undefined || videoList?.length === 0) ? (
        <Styled.Description>
          {placeholder || 'Add attachments, photos or files.'}
        </Styled.Description>
      ) : null}
      <Styled.AttachmentList>
        {videoList?.length
          ? videoList.map(file => (
              <VideoItem
                key={`file-${file.uid || (file as Attachment).id}`}
                inputFile={file}
                onRemove={handleOnRemove}
                onUploadSuccess={handleSuccessUpload}
                onFileUpload={onFileUpload}
              />
            ))
          : null}
        {fileList?.length
          ? fileList.map(file => {
              if (!file.type.includes('image')) {
                return (
                  <NormalItem
                    key={`file-${file.uid || (file as any).id}`}
                    file={file}
                    onRemove={handleOnRemove}
                  />
                );
              }
              return null;
            })
          : null}
        {fileList?.length
          ? fileList.map(file => {
              if (file.type.includes('image')) {
                return (
                  <ImageItem
                    key={`image-${file.uid || (file as any).id}`}
                    file={file}
                    onRemove={handleOnRemove}
                  />
                );
              } else {
                return null;
              }
            })
          : null}
      </Styled.AttachmentList>
    </Styled.Container>
  );
};

AttachmentUpload.defaultProps = {
  accept: 'image/*,.pdf',
};

export default AttachmentUpload;
