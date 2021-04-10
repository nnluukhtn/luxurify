import React from 'react';
import QRCode from 'qrcode.react';
import styled, { createGlobalStyle } from 'styled-components';
import Colors from 'app/common/Colors';
import { Spacer } from 'app/common/styles';
import { Logo } from 'app/common/assets';

const GlobalStyle = createGlobalStyle`
  @media print {
    html, body {
      height: initial !important;
      overflow: initial !important;
      -webkit-print-color-adjust: exact;
    }
  }

  @page {
    size: auto;
    margin: 20mm;
  }
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const Label = styled.div`
  font-weight: 500;
  font-size: 32pt;
  color: ${Colors.N900_BLACK};
  text-align: center;
`;

const Sub = styled.div`
  font-weight: 400;
  font-size: 18pt;
  text-align: center;
`;

const Text = styled.p<{ size?: number }>`
  font-weight: 400;
  font-size: ${({ size }) => (size ? `${size}pt` : '24pt')};
  text-align: center;
`;

const QRContainer = styled.div`
  margin-top: 18px;
`;

interface Props {
  watchId: number;
  uri: string;
  watchName: string;
  watchImage?: string;
}

class QRCodePrint extends React.Component<Props> {
  public render() {
    const { watchId, uri, watchName, watchImage } = this.props;
    return (
      <>
        <div>
          <PageContainer>
            <img
              src={Logo}
              alt="logo"
              width="20%"
              style={{ marginBottom: 24 }}
            />
            <Label>Luxurify Watch QRCode</Label>
            <Text size={14}>Scan with our Luxurify Mobile App</Text>
            <Spacer height="12pt" />
            <Sub>
              Watch Name:
              <br />
              {watchName}
            </Sub>
            {watchImage && <img src={watchImage} alt="watch" width="50%" />}
            <QRContainer>
              <QRCode
                className="watch_QRCode"
                renderAs="canvas"
                id={watchId}
                value={JSON.stringify({ token: watchId, uri })}
                size={400}
                level={'L'}
                includeMargin={true}
              />
            </QRContainer>
          </PageContainer>
        </div>
        <GlobalStyle />
      </>
    );
  }
}

export default QRCodePrint;
