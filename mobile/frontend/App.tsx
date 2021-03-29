import React from "react";
// import { HARDHAT_PORT, HARDHAT_PRIVATE_KEY } from '@env';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  useWalletConnect,
  withWalletConnect,
} from "@walletconnect/react-native-dapp";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { expo } from "../app.json";
import { ConnectorContext } from "./ConnectorContext";

const styles = StyleSheet.create({
  center: { alignItems: "center", justifyContent: "center" },
  // eslint-disable-next-line react-native/no-color-literals
  white: { backgroundColor: "white" },
});

// const shouldDeployContract = async (web3, abi, data, from: string) => {
//   const deployment = new web3.eth.Contract(abi).deploy({ data });
//   const gas = await deployment.estimateGas();
//   const {
//     options: { address: contractAddress },
//   } = await deployment.send({ from, gas });
//   return new web3.eth.Contract(abi, contractAddress);
// };

function App(): JSX.Element {
  const connector = useWalletConnect();
  const [message, setMessage] = React.useState<string>("Loading...");

  // const web3 = React.useMemo(
  //   () => new Web3(new Web3.providers.HttpProvider(`http://${localhost}:${HARDHAT_PORT}`)),
  //   [HARDHAT_PORT]
  // );
  // React.useEffect(() => {
  //   (async () => {
  //     const { address } = await web3.eth.accounts.privateKeyToAccount(HARDHAT_PRIVATE_KEY);
  //     const contract = await shouldDeployContract(
  //       web3,
  //       Hello.abi,
  //       Hello.bytecode,
  //       address
  //     );
  //     setMessage(await contract.methods.sayHello('React Native').call());
  //   })();
  // }, [web3, shouldDeployContract, setMessage, HARDHAT_PRIVATE_KEY]);

  const connectWallet = React.useCallback(() => {
    return connector.connect();
  }, [connector]);

  React.useEffect(() => {
    if (connector.connected) {
      setMessage(connector.accounts.join(","));
    }
  }, [connector]);

  return (
    <ConnectorContext.Provider value={connector}>
      <View style={[StyleSheet.absoluteFill, styles.center, styles.white]}>
        <Text testID="tid-message">{message}</Text>
        {!connector.connected && (
          <TouchableOpacity onPress={connectWallet}>
            <Text>Connect a Wallet</Text>
          </TouchableOpacity>
        )}
        {!!connector.connected && (
          <>
            {/* <TouchableOpacity onPress={signTransaction}>
            <Text>Sign a Transaction</Text>
          </TouchableOpacity> */}
            <TouchableOpacity onPress={connectWallet}>
              <Text>Connect a Wallet</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </ConnectorContext.Provider>
  );
}

const { scheme } = expo;

export default withWalletConnect(App, {
  redirectUrl: Platform.OS === "web" ? window.location.origin : `${scheme}://`,
  storageOptions: {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    asyncStorage: AsyncStorage,
  },
});
