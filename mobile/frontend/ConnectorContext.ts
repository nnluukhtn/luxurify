import React from "react";
import WalletConnect from "@walletconnect/client";

const initialValue: WalletConnect | null = null;

export const ConnectorContext = React.createContext(initialValue);
