import { Networks } from '../../../../constants';
import { IERC20 } from './types';

export const TOKENS_BY_NETWORK: {
  [key: number]: IERC20[];
} = {
  [Networks.Rinkeby]: [
    {
      address: '0xbB433BE62d68560Ffb72a181B45c02192DEb01B9',
      symbol: 'LXY',
      name: 'Luxirify',
      decimals: 0,
    },
  ],
  // [Networks.Localhost]: [
  //   {
  //     address: '0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa',
  //     symbol: 'DAI',
  //     name: 'Dai',
  //     decimals: 18,
  //   },
  //   {
  //     address: '0xF9bA5210F91D0474bd1e1DcDAeC4C58E359AaD85',
  //     symbol: 'MKR',
  //     name: 'Maker',
  //     decimals: 18,
  //   },
  // ],
};
