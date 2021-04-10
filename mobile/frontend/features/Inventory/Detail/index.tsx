import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import QRCode from "react-native-qrcode-svg";
import { Modal } from "react-native-paper";
import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import { Watch, WatchMeta } from "../../../types";
import { useContract } from "../../../atoms/contract";
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { InventoryModal } from "./constants";
import { getComposedData } from "./utils";

interface Params {
  id?: string;
}

const Detail = ({}) => {
  // Values
  const route = useRoute();
  const connector = useWalletConnect();
  const navigation = useNavigation();
  const contract = useContract({ account: connector.accounts[0] });

  // States
  const [data, setData] = useState<(Watch & Partial<WatchMeta>) | null>(null);
  const [activeModal, setActiveModa] = useState(InventoryModal.NONE);
  const [isLoading, setLoading] = useState(true);

  // Mapped values
  const params: Params = route?.params;
  if (!params?.id) {
    return <View>{navigation.goBack()}</View>;
  }

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
      const watchData = await getComposedData({ token: params.id, contract });
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
            <Label style={{ color: "white"}}>
              {data.name || "-"}
            </Label>
          </GoldBar>
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
            width: "90%",
            height: 340,
            backgroundColor: "white",
            alignSelf: "center",
            padding: 20,
          }}
        >
          <Code size={300} value="smth" />
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

const ModalView = styled.View`
  width: 400px;
  height: 400px;
  align-self: center;
`;

const Code = styled(QRCode)`
  width: 100%;
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

const GoldBar = styled.View`
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #dda522;
`;

const Toolbar = styled(GoldBar)`
  display: flex;
  justify-content: space-between;
  background-color: white;
  align-items: center;
  padding: 0px 20px;
`;

const Logo = styled.Text`
  font-weight: 500;
  font-size: 20;
`