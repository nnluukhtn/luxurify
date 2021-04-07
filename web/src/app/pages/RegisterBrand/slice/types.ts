import { ApiResponse } from 'global/services/api/types';

/* --- STATE --- */
export interface RegisterBrandState {
  readonly brands?: WSBrand[];
  readonly isLoading: boolean;
}

export interface RegisterBrandResponse extends ApiResponse {
  response: {
    id: number;
    company_name: string;
  };
}

export type FileType = any;

export interface BrandPayload {
  name: string;
  category: string;
  bir2303Cert: FileType[];
  registrationCert: FileType[];
}

export interface RegisterBrandParams {
  brand: {
    name: string;
    category: string;
    bir_2303_certification: FileType[];
    certification_of_registration: FileType[];
  };
}

export interface WSBrandRemote {
  id: string;
  name: string;
  total: string;
}

export interface WSBrand extends Pick<WSBrandRemote, 'name'> {
  id: number;
  total: number;
}
export interface RegisterBrandPayload {
  params: BrandPayload;
  callback?: (response: RegisterBrandResponse) => void;
}

export interface WSBrandResponse extends ApiResponse {
  response: {
    success: boolean;
    data: WSBrandRemote[];
  };
}
