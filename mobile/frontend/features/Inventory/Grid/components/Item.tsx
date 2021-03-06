import React from "react";
import { Ionicons, Feather } from "@expo/vector-icons";
import styled from "styled-components/native";
import { Watch, WatchMeta } from "../../../../types";
import { OrderResponse } from "../utils";

interface Props {
  data: Watch & Partial<WatchMeta> & OrderResponse;
  onPress: () => void;
}

const Item: React.FC<Props> = ({ data, ...rest }) => {
  // Main return
  return (
    <Container onPress={rest.onPress}>
      <Group
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {data.movement_name === "Automatic" ? (
          <Feather name="watch" size={32} color="black" />
        ) : (
          <Ionicons name="watch-outline" size={32} color="black" />
        )}
      </Group>
      <RowBreak />
      <Group
        style={{
          flex: 5,
          paddingLeft: 10,
          paddingTop: 10,
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <Label>{data.name}</Label>
        <Text>{`${data.referenceNumber || ""}`}</Text>
        <OrderWrapper>
          <OrderCount style={!!data.count ? { color: "green" } : {}}>
            {data.count}
          </OrderCount>
          <OrderText style={!!data.count ? { color: "green" } : {}}>
            Watting orders
          </OrderText>
        </OrderWrapper>
      </Group>
    </Container>
  );
};

export default Item;

const Text = styled.Text`
  font-size: 12px;
  font-weight: 500;
  color: darkgrey;
`;

const Label = styled(Text)`
  font-size: 17px;
  font-weight: 700;
  color: black;
`;

const RowBreak = styled.View`
  width: 2px;
  height: 100%;
  background-color: black;
`;

const Container = styled.TouchableOpacity`
  height: 100px;
  width: 100%;
  position: relative;
  flex-direction: row;
  justify-content: flex-end;
  border: 2px solid black;
  align-items: flex-start;
  border-radius: 10px;
  display: flex;
`;

const Group = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
`;

const OrderCount = styled(Label)`
  color: darkgrey;
  margin-right: 4px;
`;
const OrderText = styled(OrderCount)`
  color: darkgrey;
`;

const OrderWrapper = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-top: 10px;
`;
