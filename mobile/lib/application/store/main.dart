import 'package:redux/redux.dart';
import 'package:awesome_application/application/store/states.dart';
import 'package:awesome_application/application/store/reducer.dart';

ApplicationRootState _initialState = ApplicationRootState(
    rtcUrl: "", contractAddress: "", publicAddress: "", credentials: null);

Store<ApplicationRootState> getStore() {
  return Store<ApplicationRootState>(reducer, initialState: _initialState);
}
