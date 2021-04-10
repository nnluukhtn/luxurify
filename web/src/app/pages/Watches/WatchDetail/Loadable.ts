/**
 *
 * Asynchronously loads the component for WatchDetail
 *
 */

import { lazyLoad } from 'utils/loadable';

export const WatchDetail = lazyLoad(
  () => import('./index'),
  module => module.WatchDetail,
);
