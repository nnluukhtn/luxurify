import 'package:awesome_application/application/store/states.dart';
import 'package:awesome_application/application/store/actions.dart';

ApplicationRootState reducer(ApplicationRootState prevState, dynamic action) {
  ApplicationRootState newState = ApplicationRootState.fromAppState(prevState);

  if (action is UpdateRtcUrl) {
    newState.rtcUrl = action.payload;
  } else if (action is UpdateContractAddress) {
    newState.contractAddress = action.payload;
  } else if (action is UpdatePublicAddress) {
    newState.publicAddress = action.payload;
  } else if (action is UpdateCredentials) {
    newState.credentials = action.payload;
  }
  return newState;
}
