
# Luxurify

[Luxurify](https://luxurify.netlify.app/): Decentralized luxury watch database with provenance, cost and ownership verification

## Video Demo

- https://youtu.be/YVOM-uXeu7o

## Luxurify Ecosystem

The Luxurify ecosystem is a platform featuring luxury watch registration, verification, marketplace and an escrow service. The provenance of your watch is inscribed in blockchain.

### Build for Brand
- Register your brand with certificates
- Claim watches and start selling.
- Protection against fakes.
- Promotion of the official service network.
- Transparent ownership transfers.
- Dynamic pricing via WatchSignals.

### Build for Owner
- Protection against fakes and stolen property.
- Transparent ownership transfers.
- Growth in resale value.
- Ethernal provenance record.
- Dynamic pricing via WatchSignals.
- Convenient marketplace.

### Build for Collector
- Convenient marketplace.
- Fast, Secure, Trusted place to buy Authentic Luxury Watches.

## Luxurify System Design

![Luxurify System Design](https://luxurify-public.s3-ap-southeast-1.amazonaws.com/Luxurify+Diagram.png)

### Web App (Rinkeby)

- Our ReactJs app can be access at https://luxurify.netlify.app/

### Mobile App (Rinkeby)

- We use ReactNative to develop the mobile app. APK file is at https://luxurify.netlify.app/

### Backend

- We use Ruby on Rails to develop the backend APIs and integrate with WatchSignals APIs. Many thanks to WatchSignals team for providing support and helping us with generating API KEY when fetching data.

### WatchSignals Adapter

- We also integrate with real data from WatchSignals to get watch data by reference number. Endpoint is at https://luxurify.herokuapp.com/watch_signals/watch/reference_number/:reference_number

### OpenSea Integration

- All NFTs and Auctions can be found at https://testnets.opensea.io/assets/luxurify-5e3h1nrawv

### Infura

- We use Infura to provide instant access over HTTPS and WebSockets to the Ethereum and IPFS networks

### Pinatra

- We also use Pinatra to upload and manage files on IPFS

## TODO List

- Escrow auction to support 3rd service verify the watch before approve the buy/sell watch order.
- More types of auction suggest: English, Dutch, etc.
- Insurance information and service integration.
- Expand to other luxury goods.
