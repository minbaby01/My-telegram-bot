import {
  // client,
  //  community,
  //   manager,
  steamApi,
} from "../lib/steamApi";
// import SteamTotp from "steam-totp";
import {
  CreateTradeOfferPayload,
  ConfirmTradeOfferPayload,
  MaData,
  ItemPriceData,
} from "../types/steam";

// const MADATA = process.env.MADATA;
// if (!MADATA) throw new Error("Madata not found");
// const maData: MaData = JSON.parse(MADATA);

// export const loginSteamService = async (): Promise<void> => {
//   return new Promise((resolve, reject) => {
//     const loginDetails = {
//       accountName: process.env.STEAM_USERNAME!,
//       password: process.env.STEAM_PASSWORD!,
//       twoFactorCode: SteamTotp.generateAuthCode(maData.shared_secret),
//     };

//     const timeout = setTimeout(() => {
//       reject(new Error("Login timeout"));
//     }, 10000);

//     client.logOn(loginDetails);

//     client.once("loggedOn", () => {
//       console.log("Steam login successful");
//     });

//     client.once("webSession", (sessionid, cookies) => {
//       console.log("Got web session");

//       community.setCookies(cookies);
//       manager.setCookies(cookies, (err) => {
//         clearTimeout(timeout);
//         if (err) {
//           reject(err);
//         } else {
//           console.log("Trade manager ready");
//           resolve();
//         }
//       });
//     });

//     client.once("error", (err) => {
//       clearTimeout(timeout);
//       reject(err);
//     });
//   });
// };

// export const createTradeOfferService = async ({
//   tradeUrl,
//   assetIds,
//   message,
// }: CreateTradeOfferPayload): Promise<string> => {
//   return new Promise((resolve, reject) => {
//     try {
//       // Create offer
//       const offer = manager.createOffer(tradeUrl);

//       // Add items
//       const items = assetIds.map((assetId) => ({
//         appid: 730, // cs2
//         contextid: 2, // cs2 context
//         assetid: assetId,
//         amount: 1,
//       }));

//       // @ts-ignore
//       offer.addMyItems(items);

//       if (message) {
//         offer.setMessage(message);
//       }

//       // Send offer
//       offer.send((err, status) => {
//         if (err) {
//           reject(err);
//         } else {
//           console.log("Trade offer created:", offer.id);
//           resolve(offer.id!);
//         }
//       });
//     } catch (error) {
//       reject(error);
//     }
//   });
// };

// export const confirmTradeOfferService = async ({
//   tradeOfferId,
// }: ConfirmTradeOfferPayload): Promise<boolean> => {
//   return new Promise((resolve, reject) => {
//     const timeout = setTimeout(() => {
//       reject(new Error("Confirm timeout"));
//     }, 5000);

//     community.acceptConfirmationForObject(
//       maData.identity_secret,
//       tradeOfferId,
//       (err) => {
//         clearTimeout(timeout);

//         if (err) {
//           console.error("Confirm failed:", err);
//           reject(err);
//         } else {
//           console.log("Trade confirmed");
//           resolve(true);
//         }
//       }
//     );
//   });
// };

// export const cleanUp = async () => {
//   if (client) {
//     client.logOff();
//     console.log("Steam connection closed");
//   }
// };

export const getItemPriceService = async () => {
  const { data } = await steamApi.get<ItemPriceData>(
    `/priceoverview/?appid=730&currency=1&market_hash_name=${process.env.ITEM_NAME}`
  );
  return data;
};
