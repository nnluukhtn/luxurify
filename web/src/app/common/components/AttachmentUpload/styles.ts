import { Upload, Row as AntRow } from 'antd';
import Colors from 'app/common/Colors';
import styled from 'styled-components';
import { Status } from './types';

const Styled = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    word-break: keep-all;
  `,
  StyledUpload: styled(Upload)``,

  AttachmentList: styled(AntRow)`
    margin: 8px 0;
  `,

  ThumbnailContainer: styled.span`
    display: inline-block;
    margin-top: 8px;
    margin-bottom: 16px;
    width: 48px;
    height: 48px;
    position: relative;
    animation: fadeIn 0.6s;
    &:not(:last-child) {
      margin-right: 8px;
    }
    &:hover {
      .remove-icon {
        display: flex;
        justify-content: center;
        align-items: center;
        animation: fadeIn 0.4s;
      }
    }
  `,

  FileContainer: styled.div`
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: auto;
    animation: fadeIn 0.6s;
    white-space: nowrap;
    color: ${Colors.N900_BLACK};
    padding: 5px 7px;
    transition: all 0.5s;
    cursor: pointer;
    .file__remove {
      opacity: 0;
    }
    &:hover {
      border: 1px solid ${Colors.N400_GREY};
      border-radius: 5px;
      .file-remove-icon {
        display: inline-block;
        margin-left: 16px;
        animation: fadeIn 0.4s;
      }
      .file__remove {
        opacity: 1;
      }
    }
  `,

  VideoItemContainer: styled.div``,

  AttachThumbnail: styled.img`
    display: inline-block;
    width: 48px;
    height: 48px;
    margin-right: 10px;
    border: 1px solid ${Colors.N300_GREY};
    border-radius: 5px;
  `,

  RemoveIcon: styled.span`
    border-radius: 100%;
    font-size: 12px;
    line-height: 16.42px;
    color: ${Colors.N0_WHITE};
    background-color: ${Colors.N500_GREY};
    width: 16.42px;
    height: 16.42px;
    display: none;
    text-align: center;
    padding: auto;
    cursor: pointer;
    &.remove-icon {
      position: absolute;
      top: -6px;
      right: -6px;
    }
  `,

  Description: styled.div`
    color: ${Colors.N300_GREY};
  `,

  Icon: styled.span<{
    marginL?: boolean;
    marginR?: boolean;
  }>`
    margin: 0 8px;
    font-size: 16px;
    color: ${Colors.B300_BLUE};
    ${props => (props.marginL ? 'margin-left: 8px;' : '')}
    ${props => (props.marginR ? 'margin-right: 8px;' : '')}
  `,

  UploadProgressBarContainer: styled.div`
    width: 200px;
    height: 8px;
    background-color: ${Colors.N100_GREY};
    margin-left: 28px;
    margin-top: 4px;
  `,

  ProgressBar: styled.div<{ width?: number }>`
    width: ${props => props.width || 0}%;
    height: 100%;
    background-color: ${Colors.B300_BLUE};
    transition: width 0.5s ease-in-out;
  `,
  FileName: styled.span<{ status?: Status }>`
    color: ${props =>
      props.status && props.status !== 'success'
        ? Colors.N300_GREY
        : Colors.N900_BLACK};
  `,
  FileSize: styled.span<{ status?: Status }>`
    color: ${props =>
      props.status && props.status !== 'success'
        ? Colors.N300_GREY
        : Colors.N900_BLACK};
    display: inline-block;
    margin-left: 8px;
  `,
};

export default Styled;
