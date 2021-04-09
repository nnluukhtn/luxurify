import React, { useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import styled from "styled-components/native";
import { useRecoilValue } from "recoil";
import { watchListState } from "../Grid/atoms";

interface Props {}

const Detail: React.FC<Props> = ({}) => {
  const navigation = useNavigation();
  const route = useRoute();
  const data = useRecoilValue(watchListState);

  // Main return
  return (
    <View>
      <Text>{JSON.stringify(data[(route.params as any).id])}</Text>
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
