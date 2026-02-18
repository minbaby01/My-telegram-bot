import pLimit from "p-limit";
import { getItemPriceService } from "../services/steamService.js";

export const getItemPriceController = async (
  itemNameList: string[],
): Promise<string> => {
  try {
    const limit = pLimit(2);

    const itemPriceList = await Promise.all(
      itemNameList.map((itemName) =>
        limit(async () => {
          const itemPrice = await getItemPriceService({ itemName });
          return { ...itemPrice, itemName: itemName };
        }),
      ),
    );

    const validItemResponse = itemPriceList.filter((item) => item.volume);

    const formatMsg = validItemResponse
      .map((item) => {
        const i = [
          `Item: ${item.itemName}`,
          `Price: ${item.median_price}`,
          `Volume: ${item.volume}`,
        ];

        return i.filter(Boolean).join("\n");
      })
      .join("\n\n");

    return formatMsg;
  } catch (error) {
    throw error;
  }
};
