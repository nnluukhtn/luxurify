import React from "react";
import { Asset } from "expo-asset";
import AppLoading from "expo-app-loading";
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
  const [isReady, setReady] = React.useState(false);
  let [fontsLoaded] = useFonts({
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_900Black,
  });

  const loadAssests = async () => {
    const imageAssets = cacheImages([require("../assets/image/app-icon.png")]);

    await Promise.all([...imageAssets]);
  };

  const connector = useWalletConnect();

  const connectWallet = React.useCallback(() => {
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
    <ConnectorContext.Provider value={connector}>
      <NavigationContainer>
        <View style={[StyleSheet.absoluteFill]}>
          {!connector.connected && <Login onPress={connectWallet} />}
          {connector.connected && <Main />}
        </View>
      </NavigationContainer>
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
