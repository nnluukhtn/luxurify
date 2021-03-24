import 'package:awesome_application/application/store/states.dart';

ApplicationRootState rootSelector(ApplicationRootState state) {
  return state;
}

String rtcUrlSelector(ApplicationRootState state) {
  return state.rtcUrl;
} 