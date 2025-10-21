export type CreateTradeOfferPayload = {
  tradeUrl: string;
  assetIds: string[];
  message?: string;
};

export type ConfirmTradeOfferPayload = {
  tradeOfferId: string;
};

export type MaData = {
  shared_secret: string;
  identity_secret: string;
};

export type ItemPriceData = {
  success: boolean;
  lowest_price: string;
  volume: string;
  median_price: string;
};
