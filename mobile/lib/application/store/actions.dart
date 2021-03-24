import 'package:web3dart/web3dart.dart';


class UpdateRtcUrl {
  final String payload;
  UpdateRtcUrl(this.payload);
}

class UpdateContractAddress {
  final String payload;
  UpdateContractAddress(this.payload);
}


class UpdatePublicAddress {
  final String payload;
  UpdatePublicAddress(this.payload);
}

class UpdateCredentials {
  final EthPrivateKey payload;
  UpdateCredentials(this.payload);
}
