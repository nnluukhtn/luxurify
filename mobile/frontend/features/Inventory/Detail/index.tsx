import React, { useContext, useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";
import QRCode from "react-native-qrcode-svg";
import { Modal } from "react-native-paper";
import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import { WatchData } from "../../../types";
import { useContract } from "../../../atoms/contract";
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { InventoryModal } from "./constants";
import { getComposedData } from "./utils";
import { SeaportContext } from "../../../SeaportContext";

interface Params {
  id?: string;
  owner_account?: string;
}

const Detail = ({}) => {
  // Values
  const route = useRoute();
  const connector = useWalletConnect();
  const navigation = useNavigation();
  const contract = useContract({ account: connector.accounts[0] });
  const seaport = useContext(SeaportContext);

  // States
  const [data, setData] = useState<WatchData | null>(null);
  const [activeModal, setActiveModa] = useState(InventoryModal.NONE);
  const [isLoading, setLoading] = useState(true);

  // Mapped values
  const params: Params = route?.params;

  // Event handler
  const handleQRModal = () => {
    setActiveModa(InventoryModal.QR_SCAN);
  };

  const handleCloseModal = () => {
    setActiveModa(InventoryModal.NONE);
  };

  // Side-Effects
  useEffect(() => {
    (async () => {
      setLoading(true);
      const watchData = await getComposedData({
        seaport,
        account: connector.accounts[0],
        toCheckAccount: params.owner_account || connector.accounts[0],
        token: params.id,
        contract,
      });
      setData(watchData);
      setLoading(false);
    })();
  }, [params.id]);

  useEffect(() => {
    if (data?.name) {
      navigation.setOptions({ title: data.name });
    }
  }, [data?.name]);

  // Main return
  if (!data || isLoading) {
    return (
      <LoadingView>
        <ActivityIndicator size="large" color="#11111" />
      </LoadingView>
    );
  }
  return (
    <>
      <View>
        <ScrollView
          stickyHeaderIndices={[0]}
          showsVerticalScrollIndicator={false}
        >
          <Toolbar
            style={{
              borderBottomColor: "rgb(240,240,243)",
              borderBottomWidth: "1px",
            }}
          >
            <Logo>Luxurify</Logo>
            <Icon onPress={handleQRModal}>
              <MaterialCommunityIcons name="qrcode" size={24} color="black" />
            </Icon>
          </Toolbar>

          <Image source={{ uri: data.image }} />
          <GoldBar>
            <Title style={{ color: "white", marginRight: 5 }}>{data.name || "-"}</Title>
            {data.isOwner && params.owner_account && (
              <FontAwesome name="check-circle" size={24} color="white" />
            )}

          </GoldBar>
          <PriceBar
            style={{ borderBottomWidth: 1, borderBottomColor: "lightgrey" }}
          >
            <Title>Price:</Title>
            <Price style={{ alignSelf: "center" }}>
              {data.priceFixed || "-"}
              {data.priceUnit === 0 ? (
                <>
                  <MaterialCommunityIcons
                    name="ethereum"
                    size={20}
                    color="black"
                  />
                  ETH
                </>
              ) : (
                " USD"
              )}
            </Price>
          </PriceBar>
          <ContentContainer>
            <Content>
              <Label>Model</Label>
              <Text>{data.model || "-"}</Text>
            </Content>

            <Content>
              <Label>Brand name</Label>
              <Text>{data.brand_name || "-"}</Text>
            </Content>

            <Content>
              <Label>Power reserve</Label>
              <Text>{data.power_reserve || "-"}</Text>
            </Content>

            <Content>
              <Label>Case Diameter</Label>
              <Text>{data.case_diameter || "-"}</Text>
            </Content>

            <Content>
              <Label>Water Resustabce ATM</Label>
              <Text>{data.water_resistance_atm || "-"}</Text>
            </Content>

            <Content>
              <Label>Movement name</Label>
              <Text>{data.movement_name || "-"}</Text>
            </Content>

            <Content>
              <Label>Bracelet Material Name</Label>
              <Text>{data.bracelet_material_name || "-"}</Text>
            </Content>

            <Content>
              <Label>Bracelet Color Name</Label>
              <Text>{data.bracelet_color_name || "-"}</Text>
            </Content>

            <Content>
              <Label>Dial Color Name</Label>
              <Text>{data.dial_color_name || "-"}</Text>
            </Content>

            <Content>
              <Label>Gender name</Label>
              <Text>{data.gender_name || "-"}</Text>
            </Content>

            <Content>
              <Label>Buckle name</Label>
              <Text>{data.buckle_name || "-"}</Text>
            </Content>

            <Content>
              <Label>Glass name</Label>
              <Text>{data.glass_name || "-"}</Text>
            </Content>

            <Content>
              <Label>Case Material name</Label>
              <Text>{data.case_material_name || "-"}</Text>
            </Content>
          </ContentContainer>
        </ScrollView>

        <Modal
          visible={activeModal === InventoryModal.QR_SCAN}
          onDismiss={handleCloseModal}
          contentContainerStyle={{
            height: 340,
            backgroundColor: "white",
            alignSelf: "center",
            padding: 20,
          }}
        >
          <Code
            size={300}
            value={JSON.stringify({
              token: data.token,
              owner_account: data.isOwner
                ? connector.accounts[0]
                : params.owner_account,
            })}
          />
        </Modal>
      </View>
    </>
  );
};

export default Detail;

const Image = styled.Image`
  width: 100%;
  height: 400px;
`;

const ScrollView = styled.ScrollView`
  display: flex;
  flex-direction: column;
`;

const View = styled.SafeAreaView`
  flex: 1;
  width: 100%;
  background-color: white;
`;

const Code = styled(QRCode)`
  width: 340px;
  height: 100%;
`;

const Icon = styled.TouchableOpacity`
  border: 2px solid black;
  border-radius: 3px;
`;

const LoadingView = styled(View)`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const ContentContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  padding: 15px;
`;

const Content = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 10px;
`;

const Text = styled.Text`
  flex: 4;
  font-size: 17px;
  padding-left: 10px;
  padding-bottom: 7px;
`;

const Label = styled(Text)`
  flex: 2;
  font-size: 18px;
  font-weight: 600;
  color: darkgrey;
  padding-bottom: 3px;
`;

const Title = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: darkgrey;
`;

const Price = styled.Text`
  margin-left: 5px;
  font-size: 18px;
  font-weight: 600;
  color: black;
`;

const GoldBar = styled.View`
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #dda522;
  padding: 0px 10px;
`;

const Toolbar = styled(GoldBar)`
  display: flex;
  justify-content: space-between;
  background-color: white;
  align-items: center;
  padding: 0px 10px;
`;

const PriceBar = styled(Toolbar)`
  padding: 0px 10px;
  justify-content: flex-start;
  align-items: center;
`;

const Logo = styled.Text`
  font-weight: 500;
  font-size: 20px;
`;
