import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components/native";
import { Text, SafeAreaView } from "react-native";
import { ConnectorContext } from "../../ConnectorContext";
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import Luxurify from "../../../contracts/Luxurify.json";

const HomeScreen: React.FC = ({}) => {
  const connector = useWalletConnect();
  const web3 = useContext(ConnectorContext);
  const [smth, setSmth] = useState(null as any);
  const [contract, setContract] = useState<any>(null);

  // Event handler
  const connectContract = () => {
    return new web3.eth.Contract(
      Luxurify.abi as any,
      Luxurify.contract_address,
      {
        from: connector.accounts[0],
      }
    );
  };

  useEffect(() => {
    setContract(connectContract());
  }, [connector.accounts]);

  const callSmth = async () => {
    const response = contract.methods.name().send();

    setSmth(response);
  };

  const call = async () => {
    const nonce = await web3.eth.getTransactionCount(
      connector.accounts[0],
      "pending"
    );

    const contractData = contract.methods
      // .name()
      .claimNewWatch(33, "Rolex Datejust 116189PAVEL", "116189PAVEL")
      .encodeABI();

    const response = await connector
      .signTransaction({
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
