import React from "react";
import styled from "styled-components/native";
import { FlatGrid } from "react-native-super-grid";
import { useNavigation } from "@react-navigation/native";
import { Item } from "./components";

interface Props {}

const Grid: React.FC<Props> = ({}) => {
  const navigation = useNavigation();

  
  // Event handler
  const goDetailGen = (id: number) => () => {
    navigation.navigate("Inventory.Detail", {
      id,
    });
  };

  // Main return
  return (
    <FlatGrid
      itemDimension={130}
      data={TEST_DATA}
      spacing={10}
      renderItem={({ item }) => (
        <Item
          onPress={goDetailGen(item)}
          title="title"
          desc="desc"
          background="smth"
        />
      )}
    />
  );
};

export default Grid;

const ScrollView = styled.ScrollView`
  display: flex;
  flex-direction: row;
  padding: 10px;
  width: 100%;
`;

const TEST_DATA = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
