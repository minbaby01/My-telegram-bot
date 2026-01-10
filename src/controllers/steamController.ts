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

export const getItemPriceController = async (): Promise<string> => {
  try {
    const itemPrice = await getItemPriceService();
    if (!itemPrice.success) throw new Error("Steam error");

    const steamPrice = Number(itemPrice.lowest_price.replace("$", ""));

    const formatData = [
      `Steam price: ${steamPrice} $`,
      `Volume: ${itemPrice.volume}`,
      `Rate 0.75: ${(steamPrice * 0.75).toFixed(2)} $`,
      `Rate 0.7: ${(steamPrice * 0.7).toFixed(2)} $`,
      `Rate 0.68: ${(steamPrice * 0.68).toFixed(2)} $`,
      `Rate 0.65: ${(steamPrice * 0.65).toFixed(2)} $`,
    ].join("\n");

    return formatData;
  } catch (error) {
    throw error;
  }
};
