import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components/native";
import { Text, SafeAreaView } from "react-native";
import { ConnectorContext } from "../../ConnectorContext";
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import Luxurify from "../../../contracts/Luxurify.json";
import { useContract } from "../../atoms/contract";
import { getWatchListByAccount } from "../Inventory/Grid/utils";

const HomeScreen: React.FC = ({}) => {
  const connector = useWalletConnect();
  const web3 = useContext(ConnectorContext);
  const [smth, setSmth] = useState(null as any);
  const contract = useContract({ account: connector.accounts[0] });

  // Event handler

  const callWatches = async () => {
    const watches = await getWatchListByAccount({
      contract,
      account: connector.accounts[0],
    });

    setSmth(watches);
  };

  const call = async () => {
    const nonce = await web3.eth.getTransactionCount(
      connector.accounts[0],
      "pending"
    );

    const contractData = contract.methods
      // .watches(connector.accounts[0])
      .claimNewWatch(33, "Rolex Datejust 116189PAVEL", "116189PAVEL")
      .encodeABI();

    const response = await connector
      .sendTransaction({
        from: connector.accounts[0],
        to: Luxurify.contract_address,
        nonce: web3.utils.toHex(nonce),
        value: "0x00",
        data: contractData,
      })
      .catch((err) => {
        setSmth(err);
      });

    setSmth(response);

    await web3.eth.getTransactionReceipt(response, (err, tx) => {
      if (tx) {
        setSmth(tx);
        console.log(tx);
      } else if (err) {
        setSmth(err);
      }
    });
  };

  // Main return
  return (
    <SafeAreaView>
      <CenteredGroup>
        {/* <Text>{JSON.stringify(contract) || JSON.stringify(connector.uri)}</Text> */}
        {/* <Text>"{JSON.stringify(contract)}"</Text> */}
        <Text>{JSON.stringify(smth) || 0}</Text>
        <ButtonContainer onPress={call}>
          <ButtonText>Click</ButtonText>
        </ButtonContainer>
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

const ButtonContainer = styled.TouchableOpacity`
  width: 90%;
  height: 50px;
  padding: 12px;
  border-radius: 5px;
  background-color: black;
  border-radius: 5px;
  align-self: center;
`;

const ButtonText = styled.Text`
  font-size: 20px;
  font-weight: 500;
  text-align: center;
  color: white;
`;
