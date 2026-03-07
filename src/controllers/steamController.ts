import { getItemPriceService } from "../services/steamService.js";

export const getItemPriceController = async (
  itemName: string,
): Promise<string> => {
  try {
    const itemData = await getItemPriceService({ itemName });

    if (!itemData.volume) {
      throw new Error("Invalid response");
    }

    const formatMsg = [
      `Item: ${itemName}`,
      `Price: ${itemData.median_price}`,
      `Volume: ${itemData.volume}`,
    ]
      .filter(Boolean)
      .join("\n");

    return formatMsg;
  } catch (error) {
    throw error;
  }
};
