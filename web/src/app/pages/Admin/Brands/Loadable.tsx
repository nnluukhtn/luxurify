/**
 * Asynchronously loads the component for HomePage
 */

import { lazyLoad } from 'utils/loadable';

export const Brands = lazyLoad(
  () => import('./index'),
  module => module.Brands,
);
