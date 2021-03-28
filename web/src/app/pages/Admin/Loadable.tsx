/**
 * Asynchronously loads the component for HomePage
 */

import { lazyLoad } from 'utils/loadable';

export const Admin = lazyLoad(
  () => import('./index'),
  module => module.Admin,
);
