import { History } from 'history';
import { SessionState } from './../utils/SessionActions/types.d';
import { RegisterBrandState } from 'app/pages/RegisterBrand/slice/types';
import { RouterState } from 'connected-react-router';
import { AdminBrandsState } from 'app/pages/Admin/Brands/slice/types';
import { AdminState } from 'app/pages/Admin/types';
import { RegisterWatchState } from 'app/pages/RegisterWatch/slice/types';
// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
*/
export interface RootState {
  router: RouterState<History>;
  session: SessionState;
  registerBrand?: RegisterBrandState;
  registerWatch?: RegisterWatchState;
  adminBrands?: AdminBrandsState;
  admin?: AdminState;
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
}
