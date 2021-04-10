import React from "react";
import { OpenSeaPort } from "opensea-js";

const initialValue: OpenSeaPort | null = null;

export const SeaportContext = React.createContext(initialValue);
