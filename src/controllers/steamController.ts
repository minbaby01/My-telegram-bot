import pLimit from "p-limit";
import {
  getActiveTradesService,
  markAsSentService,
} from "../services/empireService";
import {
  // cleanUp,
  // confirmTradeOfferService,
  // createTradeOfferService,
  getItemPriceService,
  // loginSteamService,
} from "../services/steamService";

// export const createAndConfirmTradeOfferController = async () => {
//   try {
//     const data = await getActiveTradesService();
//     const deposits: DepositCustom[] = data.deposits;
//     if (!deposits.length) throw new Error("No active deposits");

//     const offerToSend = deposits.find((d) => d.status === 3);
//     if (!offerToSend) throw new Error("No offer to send");
//     if (!offerToSend?.item) throw new Error("Can not find asset_id");

//     await loginSteamService();

//     const tradeOfferId = await createTradeOfferService({
//       tradeUrl: offerToSend.metadata.trade_url as any,
//       assetIds: [offerToSend.item.asset_id],
//     });

//     const confirmTradeOffer = await confirmTradeOfferService({
//       tradeOfferId: tradeOfferId,
//     });
//     if (!confirmTradeOffer) throw new Error("Confirm failed");

//     await cleanUp();
//     await markAsSentService({ depositId: offerToSend.id.toString() });
//     return confirmTradeOffer;
//   } catch (error) {
//     throw error;
//   }
// };

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
