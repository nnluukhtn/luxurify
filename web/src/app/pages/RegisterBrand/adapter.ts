import { BrandPayload, RegisterBrandParams } from './types';

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
