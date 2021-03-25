import { SessionState } from './../utils/SessionActions/types.d';
import { RegisterBrandState } from 'app/pages/RegisterBrand/types';
import { RouterState } from 'connected-react-router';
// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
*/
export interface RootState {
  router: RouterState;
  session: SessionState;
  registerBrand?: RegisterBrandState;
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
}
