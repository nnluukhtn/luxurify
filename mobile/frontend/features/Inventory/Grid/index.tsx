import React, { useEffect, useState } from "react";
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
  const route = useRoute();
  const navigation = useNavigation();
  const connector = useWalletConnect();
  const contract = useContract({ account: connector.accounts[0] });
  const [watchList, setWatchlist] = useRecoilState(watchListState);

  useEffect(() => {
    navigation.setOptions({ title: "Your inventory" });

    (async () => {
      const watches = await getWatchListByAccount({
        contract,
        account: connector.accounts[0],
      });
      setWatchlist(watches);
    })();
  }, []);

  // Event handler
  const goDetailGen = (id: number) => () => {
    navigation.navigate("Inventory.Detail", {
      id,
    });
  };

  // Main return
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
