import React from "react";
import styled from "styled-components/native";

interface Props {
  title: string;
  background: string;
  onPress: () => void;
  desc: string;
}

const Item: React.FC<Props> = ({ title, background, desc, ...rest }) => {
  // Main return
  return <Container onPress={rest.onPress}></Container>;
};

export default Item;

const Container = styled.TouchableOpacity`
  height: 140px;
  background-color: red;
  border-radius: 10px;
  padding: 10px;
`;

