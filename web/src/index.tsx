/**
 * index.tsx
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import history from './utils/history';

// Use consistent styling
import 'sanitize.css/sanitize.css';

// Import root app
import { App } from 'app';

import { HelmetProvider } from 'react-helmet-async';

import { configureAppStore } from 'store/configureStore';

import reportWebVitals from 'reportWebVitals';

// Initialize languages
import './locales/i18n';
import { Web3ReactProvider } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';
import { Web3Provider } from '@ethersproject/providers';
import { Networks } from './constants';
import { OpenSeaPort, Network } from 'opensea-js';
import { seaportContext } from 'contexts/SeaportContext';

const initialState = {};
const store = configureAppStore(initialState, history);
const MOUNT_NODE = document.getElementById('root') as HTMLElement;

export const injectedConnector = new InjectedConnector({
  supportedChainIds: [
    Networks.MainNet, // Mainet
    Networks.Ropsten, // Ropsten
    Networks.Rinkeby, // Rinkeby
    Networks.Goerli, // Goerli
    Networks.Kovan, // Kovan
    Networks.Localhost,
  ],
});

const seaport = new OpenSeaPort((window as any).web3.currentProvider, {
  networkName: Network.Rinkeby,
});

console.log({ seaport }, (window as any).web3.currentProvider);

const getLibrary = (provider?: any): Web3Provider => {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
};

ReactDOM.render(
  <Provider store={store}>
    <HelmetProvider>
      <Web3ReactProvider getLibrary={getLibrary}>
        <seaportContext.Provider value={seaport}>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </seaportContext.Provider>
      </Web3ReactProvider>
    </HelmetProvider>
  </Provider>,
  MOUNT_NODE,
);

// Hot reloadable translation json files
if (module.hot) {
  module.hot.accept(['./locales/i18n'], () => {
    // No need to render the App again because i18next works with the hooks
  });
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
