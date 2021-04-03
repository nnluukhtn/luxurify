import React, { useContext } from "react";
import styled from "styled-components/native";
import { Text, SafeAreaView } from "react-native";
import { ConnectorContext } from "../../ConnectorContext";

const HomeScreen: React.FC = ({}) => {
  const connector = useContext(ConnectorContext);

  // Main return
  return (
    <SafeAreaView>
      <CenteredGroup>
        <Text>{JSON.stringify(connector.rpcUrl)}</Text>
      </CenteredGroup>
    </SafeAreaView>
  );
};

export default HomeScreen;

const CenteredGroup = styled.View`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
