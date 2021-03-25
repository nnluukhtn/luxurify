import { ApiResponse } from 'global/services/api/types';
/* --- STATE --- */
export interface RegisterBrandState {}

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
  bir2303Cert: FileType;
  registrationCert: FileType;
}

export interface RegisterBrandParams {
  brand: {
    name: string;
    category: string;
    bir_2303_certification: FileType;
    certification_of_registration: FileType;
  };
}
