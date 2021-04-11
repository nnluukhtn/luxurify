import { OpenSeaPort } from 'opensea-js';
import React from 'react';

const initialValue: OpenSeaPort | null = null;

export const seaportContext = React.createContext<OpenSeaPort | null>(
  initialValue,
);
