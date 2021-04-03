import {
  BrandPayload,
  RegisterBrandParams,
  WSBrand,
  WSBrandResponse,
} from './types';

export const registerBrandAdapter = (
  brandPayload: BrandPayload,
): RegisterBrandParams => {
  return {
    brand: {
      name: brandPayload.name,
      category: brandPayload.category,
      bir_2303_certification: brandPayload.bir2303Cert,
      certification_of_registration: brandPayload.registrationCert,
    },
  };
};

export const wSBrandAdapter = (
  data: WSBrandResponse['response']['data'],
): WSBrand[] => {
  return data?.map(({ id, name, total }) => ({
    id: +id,
    name: name,
    total: +total,
  }));
};
