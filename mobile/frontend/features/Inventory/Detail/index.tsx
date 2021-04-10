import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import styled from "styled-components/native";
import { Watch, WatchMeta } from "../../../types";
import { getComposedData } from "./utils";
import { useContract } from "../../../atoms/contract";
import { useWalletConnect } from "@walletconnect/react-native-dapp";

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

  // Mapped values
  const params: Params = route?.params;
  console.log({ params });
  if (!params?.id) {
    return <View>{navigation.goBack()}</View>;
  }

  // Side-Effects
  useEffect(() => {
    (async () => {
      const watchData = await getComposedData({ token: params.id, contract });
      setData(watchData);
    })();
  }, [params.id]);

  useEffect(() => {
    if (data?.name) {
      navigation.setOptions({ title: data.name });
    }
  }, [data?.name]);

  // Main return
  if (!data) {
    return (
      <View>
        <Text>Loading..</Text>
      </View>
    );
  }

  return (
    <View>
      <ScrollView>
        <Image source={{ uri: data.image }} />
        <GoldBar>
          <Label style={{ color: "white" }}>{data.name || "-"}</Label>
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
            <Label>Bracelet Color Name</Label>
            <Text>{data.bracelet_color_name || "-"}</Text>
          </Content>

          <Content>
            <Label>Bracelet Material Name</Label>
            <Text>{data.bracelet_material_name || "-"}</Text>
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

          <Content>
            <Label>Bracelet Material Name</Label>
          </Content>
        </ContentContainer>
      </ScrollView>
    </View>
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

const View = styled.View`
  flex: 1;
  background-color: white;
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
  background-color: #dda522;
`;
