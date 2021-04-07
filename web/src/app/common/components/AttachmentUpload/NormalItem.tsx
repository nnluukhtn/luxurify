import { Tooltip } from 'antd';
import React from 'react';
import humanFileSize from 'utils/human-file-size';
import Styled from './styles';
import { Attachment, AttachmentFile, Status } from './types';
import { FilePdfOutlined, DeleteOutlined } from '@ant-design/icons';

export const getFileIcon = (fileType: string): string => {
  if (fileType.includes('video')) {
    return 'fa-file-video';
  }
  return 'fa-file-alt';
};

const getFileName = (name: string) =>
  name.length >= 50 ? `${name.substr(0, 20)} ... ${name.substr(-10)}` : name;

interface Props {
  file: AttachmentFile;
  onRemove: (file: AttachmentFile) => void;
  status?: Status;
}

const NormalItem = ({ file, onRemove, status, ...props }: Props) => {
  const handleOnRemove = (file: AttachmentFile) => e => {
    e.stopPropagation();
    onRemove(file);
  };

  return (
    <Tooltip {...props} title={file.name} placement="leftBottom">
      <Styled.FileContainer>
        {/* <Styled.Icon className={`fas ${getFileIcon(file.type)}`} marginR /> */}
        <FilePdfOutlined style={{ marginRight: '0.5rem', fontSize: 24 }} />
        <Styled.FileName status={status}>
          {(file as Attachment).url ? (
            <a
              href={(file as Attachment).url}
              download={file.name}
              target="_blank"
              rel="noreferrer"
            >
              {getFileName(file.name)}
            </a>
          ) : (
            getFileName(file.name)
          )}
        </Styled.FileName>
        <Styled.FileSize status={status}>
          {' - '}
          {file.size && humanFileSize(file.size, true)}
        </Styled.FileSize>
        <DeleteOutlined
          style={{ marginLeft: '0.5rem', fontSize: 16 }}
          className="file__remove"
          onClick={handleOnRemove(file)}
        />
      </Styled.FileContainer>
    </Tooltip>
  );
};

export default NormalItem;
