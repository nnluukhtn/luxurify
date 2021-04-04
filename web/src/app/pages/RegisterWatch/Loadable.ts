/**
 *
 * Asynchronously loads the component for RegisterWatch
 *
 */

import { lazyLoad } from 'utils/loadable';

export const RegisterWatch = lazyLoad(
  () => import('./index'),
  module => module.RegisterWatch,
);
