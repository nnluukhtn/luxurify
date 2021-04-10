import {
  BrandPayload,
  RegisterBrandParams,
  WSBrand,
  WSBrandResponse,
} from './slice/types';

export const registerBrandAdapter = (
  brandPayload: BrandPayload,
): RegisterBrandParams => {
  return {
    brand: {
      name: brandPayload.name,
      category: brandPayload.category,
      certificate_file: brandPayload.registrationCert[0],
      bir_2303_file: brandPayload.bir2303Cert[0],
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
