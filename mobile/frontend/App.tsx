import Web3 from "web3";
import React from "react";
import { Asset } from "expo-asset";
import { RecoilRoot } from "recoil";
import AppLoading from "expo-app-loading";
import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, View, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  useWalletConnect,
  withWalletConnect,
} from "@walletconnect/react-native-dapp";
import {
  useFonts,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_900Black,
} from "@expo-google-fonts/inter";

import { expo } from "../app.json";
import { ConnectorContext } from "./ConnectorContext";
import Login from "./features/Login";
import Main from "./features/Main";
import { NavigationContainer } from "@react-navigation/native";

function cacheImages(images) {
  return images.map((image) => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

function App(): JSX.Element {
  // Values
  const [isReady, setReady] = React.useState(false);
  let [fontsLoaded] = useFonts({
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_900Black,
  });
  const connector = useWalletConnect();

  // Event Handlers
  const loadAssests = async () => {
    const imageAssets = cacheImages([require("../assets/image/app-icon.png")]);

    await Promise.all([...imageAssets]);
  };

  const web3 = React.useMemo(
    () =>
      new Web3(
        new Web3.providers.HttpProvider(
          `https://rinkeby.infura.io/v3/d7e93337406949719fe07bb309aeefea`
        )
      ),
    []
  );

  const connectWallet = React.useCallback(async () => {
    try {
      const response = connector.connect();
      return response;
    } catch (e) {
      console.log(e);
    }
  }, [connector]);

  React.useEffect(() => {
    if (connector.connected) {
      // setMessage(connector.accounts.join(","));
    }
  }, [connector]);

  if (!isReady || !fontsLoaded) {
    return (
      <AppLoading
        startAsync={loadAssests}
        onFinish={() => setReady(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <ConnectorContext.Provider value={web3}>
      <NavigationContainer>
        <RecoilRoot>
          <View style={[StyleSheet.absoluteFill]}>
            {!connector.connected && <Login onPress={connectWallet} />}
            {connector.connected && <Main />}
            <StatusBar />
          </View>
        </RecoilRoot>
      </NavigationContainer>
    </ConnectorContext.Provider>
  );
}

const { scheme } = expo;

export default withWalletConnect(App, {
  qrcodeModalOptions: {
    mobileLinks: ["metamask"],
  },
  bridge: "https://bridge.walletconnect.org",
  redirectUrl: Platform.OS === "web" ? window.location.origin : `${scheme}://`,
  storageOptions: {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    asyncStorage: AsyncStorage,
  },
  clientMeta: {
    description: "Luxurify verification system for supply chains",
    url: "https://luxurify.io",
    icons: [
      "https://storage.googleapis.com/opensea-static/opensea-profile/15.png",
    ],
    name: "Luxurify",
  },
});
