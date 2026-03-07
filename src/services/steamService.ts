import { steamApi } from "../lib/steamApi.js";
import { ItemPriceResponse, GetItemPricePayload } from "../types/steam.js";

export const getItemPriceService = async ({
  itemName,
}: GetItemPricePayload) => {
  const { data } = await steamApi.get<ItemPriceResponse>(
    `/priceoverview/?appid=730&currency=1&market_hash_name=${itemName}`,
  );
  return data;
};
