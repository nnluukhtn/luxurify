import { StyleSheet } from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { BarCodeScannedCallback, BarCodeScanner } from "expo-barcode-scanner";
import { ExternalQRPayload } from "../../../types";

interface Params {
  callback?: BarCodeScannedCallback;
}

const Scanner = () => {
  // Values
  const route = useRoute();
  const navigation = useNavigation();

  // States
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  // Values mapped from states
  const params: Params = route.params;

  // Event handlers
  const handleBarCodeScanned: BarCodeScannedCallback = (payload) => {
    setScanned(true);
    if (params?.callback) return params.callback(payload);
    else {
      const data = (JSON.parse(payload.data) as unknown) as ExternalQRPayload;
      if (data?.token === undefined) {
        return alert(JSON.stringify(data));
      }
      navigation.navigate("Inventory", {
        screen: "Inventory.Detail",
        params: { id: data.token, owner_account: data.owner_account },
      });
    }
  };

  // Side-Effect
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    const handler = () => {
      setScanned(false);
    };
    navigation.addListener("focus", handler);
    return () => {
      navigation.removeListener("focus", handler);
    };
  }, []);

  // Main return

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={StyleSheet.absoluteFillObject}>
      <Frame name="scan-outline" size={194} />
      <BarCodeScanner
        barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
    </View>
  );
};

export default Scanner;

/**
 * Styles
 */

const Frame = styled(Ionicons)`
  z-index: 1;
  opacity: 0.5;
  color: darkgrey;
`;

const Button = styled.Button``;

const View = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Text = styled.Text``;
