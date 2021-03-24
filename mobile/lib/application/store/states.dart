import 'package:web3dart/web3dart.dart';

class ApplicationRootState {
  String rtcUrl;
  String contractAddress;
  String publicAddress;
  EthPrivateKey credentials;

  ApplicationRootState({
    this.rtcUrl,
    this.contractAddress,
    this.publicAddress,
    this.credentials,
  });

  ApplicationRootState.fromAppState(ApplicationRootState another) {
    rtcUrl = another.rtcUrl;
    contractAddress = another.contractAddress;
    publicAddress = another.publicAddress;
    credentials = another.credentials;
  }
}
