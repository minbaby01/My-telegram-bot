import { steamApi } from "../lib/steamApi";
import { ItemPriceData, GetItemPricePayload } from "../types/steam";

export const getItemPriceService = async ({
  itemName,
}: GetItemPricePayload) => {
  const { data } = await steamApi.get<ItemPriceData>(
    `/priceoverview/?appid=730&currency=1&market_hash_name=${itemName}`,
  );
  return data;
};
