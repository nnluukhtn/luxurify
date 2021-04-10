import React, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import { FlatGrid } from "react-native-super-grid";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { useContract } from "../../../atoms/contract";
import { getWatchListByAccount } from "./utils";
import Watch from "../../../types/Watch";
import { Item } from "./components";
import { useRecoilState } from "recoil";
import { watchListState } from "./atoms";

interface Props {}

const Grid: React.FC<Props> = ({}) => {
  const navigation = useNavigation();
  const connector = useWalletConnect();
  const contract = useContract({ account: connector.accounts[0] });
  const [watchList, setWatchlist] = useRecoilState(watchListState);
  const [isLoading, setLoading] = useState(false);

  const loadWatchList = async () => {
    setLoading(true);
    const watches = await getWatchListByAccount({
      contract,
      account: connector.accounts[0],
    });
    setWatchlist(watches);
    setLoading(false);
  };

  useEffect(() => {
    navigation.setOptions({ title: "Your inventory" });

    navigation.addListener("focus", loadWatchList);

    return () => {
      navigation.removeListener("focus", loadWatchList);
    };
  }, []);

  // Event handler
  const goDetailGen = (id: number) => () => {
    navigation.navigate("Inventory.Detail", {
      id,
    });
  };

  // Main return

  if (isLoading) {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <FlatGrid
      itemDimension={260}
      data={watchList}
      style={{ backgroundColor: "white" }}
      spacing={10}
      renderItem={({ item, index }) => (
        <Item data={item} onPress={goDetailGen(index)} />
      )}
    />
  );
};

export default Grid;

const View = styled.View`
  flex: 1;
  width: 100%;
  height: 100%;
  display: flex;
  background-color: white;
  justify-content: center;
  align-items: center;
`;
