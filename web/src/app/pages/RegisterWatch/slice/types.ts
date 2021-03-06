import { RcFile } from 'antd/lib/upload';
import { ApiResponse } from 'global/services/api/types';

/* --- STATE --- */
export interface RegisterWatchState {
  readonly wsWatchData?: WSWatchData;
  readonly isLoading: boolean;
}

export interface WSWatchData {
  byId: {
    [id: string]: WSWatch;
  };
}

export interface WSWatchRemote {
  staticid: string;
  watchname: string;
  watchimage: string;
  referencenumber: string;
  watchmodel: string;
  brandid: string;
  movementid: string;
  genderid: string;
  powerreserve: string;
  casediameter: string;
  casematerialid: string;
  waterresistanceatm: number;
  bezelmaterialid: string;
  glassid: string;
  dialcolorid: string;
  braceletmaterialid: string;
  braceletcolorid: string;
  buckleid: string;
  bucklematerialid: string;
  inner_image: string;
  movementname: string;
  braceletcolorname: string;
  dialcolorname: string;
  gendername: string;
  bucklename: string;
  glassname: string;
  brandname: string;
  casematerialname: string;
  braceletmaterialname: string;
  bucketmaterialname: string;
  minprice: string;
  maxprice: string;
  offers: string;
  currency: string;
  count_models: string;
  min_minprice: string;
  max_maxprice: string;
  count_dynamic: string;
  avg_price: string;
}

export interface WSWatch {
  model: string;
  watchName: string;
  referenceNumber: string;
  powerReserve: string;
  caseDiameter: number;
  waterResistanceAtm: number;
  movementName: string;
  braceletColorName: string;
  dialColorName: string;
  genderName: string;
  buckleName: string;
  glassName: string;
  brandName: string;
  caseMaterialName: string;
  braceletMaterialName: string;
  bucketMaterialName: string;
  priceType?: string;
  priceUnit?: string;
  priceFixed?: number;
  priceDynamic?: number;
}

export interface RegisterWatchParams {
  model: string;
  referenceNumber: string;
  brandName: string;
  watchName: string;
  powerReserve: string;
  caseDiameter: number;
  waterResistanceAtm: number;
  movementName: string;
  braceletColorName: string;
  dialColorName: string;
  genderName: string;
  buckleName: string;
  glassName: string;
  caseMaterialName: string;
  braceletMaterialName: string;
  bucketMaterialName: string;
  priceType: string;
  priceUnit: string;
  priceFixed: number;
  priceDynamic: number;
  image: RcFile[];
  innerImage: RcFile[];
}

export interface RegisterWatchPayload {
  watch: {
    reference_number: string;
    name: string;
    model: string;
    power_reserve: string;
    case_diameter: string;
    water_resistance_atm: number;
    movement_name: string;
    bracelet_color_name: string;
    dial_color_name: string;
    gender_name: string;
    buckle_name: string;
    glass_name: string;
    brand_name: string;
    case_material_name: string;
    bracelet_material_name: string;
    bucket_material_name: string;
    price_type: string;
    price_unit: string;
    price_fixed: number;
    image: RcFile;
    inner_image: RcFile;
  };
}

export interface RegisterWatchResponse extends ApiResponse {
  response: {
    token_uri: string;
  };
}

export interface FetchWSWatchDataResponse extends ApiResponse {
  response: {
    success: boolean;
    data: WSWatchRemote[];
  };
}

export interface FetchWSBrandsPayload {
  referenceNumber: string;
  callback?: (response: FetchWSWatchDataResponse) => void;
}
