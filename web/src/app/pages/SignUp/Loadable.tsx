/**
 * Asynchronously loads the component for HomePage
 */

import { lazyLoad } from 'utils/loadable';

export const SignUp = lazyLoad(
  () => import('./index'),
  module => module.SignUp,
);
