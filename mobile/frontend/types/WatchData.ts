import Watch from "./Watch";
import WatchMeta from "./WatchMeta";
import OrderResponse from "./OrderResponse";

type WatchData = Watch &
  Partial<WatchMeta> &
  OrderResponse & {
    isOwner: boolean;
  };

export default WatchData;
