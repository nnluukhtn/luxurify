import React from "react";
import styled from "styled-components/native";
///

interface Props {
  onPress: () => Promise<any>;
}

const Login: React.FC<Props> = ({ onPress }) => {
  // Main return
  return (
    <Container>
      <Group>
        <Image
          source={require("../../../assets/image/app-icon.png")}
          style={{
            width: 60,
            height: 60,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.27,
            shadowRadius: 4.65,
          }}
        />
        <Header>LUXURIFY</Header>
        <Text>Mobile</Text>
      </Group>

      <CenteredGroup>
        <ButtonContainer onPress={onPress}>
          <ButtonText>Let's go</ButtonText>
        </ButtonContainer>
      </CenteredGroup>
    </Container>
  );
};

export default Login;

const Container = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 190px 20px 50px 20px;
  height: 100%;
  width: 100%;
`;

const Group = styled.View`
  width: 100%;
  display: flex;
`;

const ButtonContainer = styled.TouchableOpacity`
  width: 90%;
  height: 50px;
  padding: 12px;
  border-radius: 5px;
  margin-vertical: 40px;
  background-color: black;
  border-radius: 5px;
  alignSelf: center;
`;
const ButtonText = styled.Text`
  font-size: 20px;
  font-weight: 500;
  text-align: center;
  color: white;
`;

const CenteredGroup = styled(Group)`
  justify-content: center;
`;

const Text = styled.Text`
  letter-spacing: 2px;
  font-size: 15px;
`;

const Header = styled.Text`
  margin-top: 20px;
  letter-spacing: 2px;
  font-family: Inter_400Regular;
  font-weight: 500;
  font-size: 40px;
`;

const Image = styled.Image`
  border-radius: 5px;
`;
