/* --- STATE --- */
export interface WatchDetailState {}

export interface Attribute {
  trait_type: string;
  value: string;
}

export interface WatchDetailData {
  name: string;
  description: string;
  image: string;
  attributes: Attribute[];
}
