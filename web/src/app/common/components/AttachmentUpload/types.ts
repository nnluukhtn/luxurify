import { RcFile } from 'antd/lib/upload/interface';
import { ApiResponse } from 'global/services/api/types';

export interface PresignedUrlResponse extends ApiResponse {
  id: string;
  upload_url: string;
}

export type Status =
  | 'not_started'
  | 'in_progress'
  | 'success'
  | 'failed'
  | 'uploaded';

export type Attachment = {
  id?: string;
  url?: string;
  name: string;
  size: number;
  status?: Status;
  type: 'video' | 'file';
} & Partial<RcFile>;

export type AttachmentFile = Attachment | RcFile;
