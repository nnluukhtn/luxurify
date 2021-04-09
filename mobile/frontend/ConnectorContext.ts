import React from "react";
import Web3 from "web3";

const initialValue: Web3 | null = null;

export const ConnectorContext = React.createContext(initialValue);
