import { useWalletConnect } from "@walletconnect/react-native-dapp";
import React, { useContext } from "react";
import { View } from "react-native";
import { ConnectorContext } from "../../ConnectorContext";

interface Props {}

const Logout: React.FC<Props> = ({}) => {
  const connector = useWalletConnect();

  React.useEffect(() => {
    connector.killSession();
  });

  // Main return
  return <View></View>;
};

export default Logout;
