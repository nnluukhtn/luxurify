import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import styled from "styled-components/native";
import { Watch, WatchMeta } from "../../../types";
import { getComposedData } from "./utils";
import { useContract } from "../../../atoms/contract";
import { useWalletConnect } from "@walletconnect/react-native-dapp";

interface Params {
  id?: string;
}

const Detail: React.FC = ({}) => {
  // Values
  const route = useRoute();
  const connector = useWalletConnect();
  const navigation = useNavigation();
  const contract = useContract({ account: connector.accounts[0] });

  // States
  const [data, setData] = useState<(Watch & Partial<WatchMeta>) | null>(null);

  // Mapped values
  const params: Params = route?.params;
  if (!params?.id) {
    return <View>{navigation.goBack()}</View>;
  }

  // Side-Effects
  useEffect(() => {
    (async () => {
      const watchData = await getComposedData({ token: params.id, contract });
      setData(watchData);
    })();
  }, [params.id]);

  useEffect(() => {
    if (data?.name) {
      navigation.setOptions({ title: data.name, headerShown: true });
    }
  }, [data?.name]);

  // Main return
  if (!data) {
    return (
      <View>
        <Text>Loading..</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>{JSON.stringify(data)}</Text>
    </View>
  );
};

export default Detail;

const View = styled.View`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

const Text = styled.Text``;
