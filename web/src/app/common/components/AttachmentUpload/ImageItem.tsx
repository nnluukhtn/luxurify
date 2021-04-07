import { Tooltip } from 'antd';
import Styled from './styles';
import React from 'react';
import { RcFile } from 'antd/lib/upload';

interface Props {
  file: RcFile;
  onRemove: (file: RcFile) => void;
}
const ImageItem = ({ file, onRemove, ...props }: Props) => {
  const handleOnRemove = (file: RcFile) => e => {
    e.stopPropagation();
    onRemove(file);
  };

  return (
    <Tooltip {...props} title={file.name} placement="bottom">
      <Styled.ThumbnailContainer>
        <Styled.RemoveIcon
          className="remove-icon fal fa-times"
          onClick={handleOnRemove(file)}
        />
        <Styled.AttachThumbnail src={(file as any).thumbUrl} alt={file.name} />
      </Styled.ThumbnailContainer>
    </Tooltip>
  );
};

export default ImageItem;
