import {
  RegisterWatchParams,
  RegisterWatchPayload,
  WSWatch,
  WSWatchRemote,
} from './slice/types';

export const registerWatchAdapter = (
  watchParams: RegisterWatchParams,
): RegisterWatchPayload => ({
  watch: {
    reference_number: watchParams.referenceNumber,
    model: watchParams.model,
    power_reserve: watchParams.powerReserve,
    case_diameter: watchParams.caseDiameter?.toString(),
    water_resistance_atm: watchParams.waterResistanceAtm,
    movement_name: watchParams.movementName,
    bracelet_color_name: watchParams.braceletColorName,
    dial_color_name: watchParams.dialColorName,
    gender_name: watchParams.genderName,
    buckle_name: watchParams.buckleName,
    glass_name: watchParams.glassName,
    brand_name: watchParams.brandName,
    case_material_name: watchParams.caseMaterialName,
    bracelet_material_name: watchParams.braceletMaterialName,
    bucket_material_name: watchParams.bucketMaterialName,
    price_type: watchParams.priceType,
    price_unit: watchParams.priceUnit,
    price_fixed: watchParams.priceFixed,
    image: watchParams.image,
    inner_image: watchParams.innerImage,
    name: watchParams.watchName,
  },
});

export const wsWatchDataAdapter = (data: WSWatchRemote): WSWatch => ({
  referenceNumber: data.referencenumber,
  model: data.watchmodel,
  powerReserve: data.powerreserve,
  caseDiameter: Number(data.casediameter),
  waterResistanceAtm: data.waterresistanceatm,
  movementName: data.movementname,
  braceletColorName: data.braceletcolorname,
  dialColorName: data.dialcolorname,
  genderName: data.gendername,
  buckleName: data.bucklename,
  glassName: data.glassname,
  brandName: data.brandname,
  caseMaterialName: data.casematerialname,
  braceletMaterialName: data.braceletmaterialname,
  bucketMaterialName: data.bucketmaterialname,
  watchName: data.watchname,
});
