import { RATE } from "../constant";
import { TRADE_STATUS } from "../constant/tradeStatus";
import {
  blockUserService,
  cancelDepositService,
  createDepositService,
  getActiveTradesService,
  getCs2InventoryService,
} from "../services/empireService";
import { BlockUserPayload } from "../types/empire/BlockUser";
import { convertToUsd } from "../utils";

export const getActiveDepositController = async (): Promise<string> => {
  try {
    const activeTrades = await getActiveTradesService();

    if (!activeTrades.data.deposits.length) {
      throw new Error("No deposits found");
    }

    const depositCompleted = activeTrades.data.deposits.filter(
      (d) => d.status === TRADE_STATUS.COMPLETED_BUT_REVERSIBLE,
    );

    const totalValueCompleted = convertToUsd(
      depositCompleted.reduce(
        (initVal, d) => initVal + (d.total_value ?? 0),
        0,
      ),
    );

    const pendingDeposits = activeTrades.data.deposits
      .filter((d) => d.status !== TRADE_STATUS.COMPLETED_BUT_REVERSIBLE)
      .sort((a, b) => a.id - b.id)
      .map((d) => {
        const deposit = [
          `Order: ${d.id}`,
          `Price: ${convertToUsd(d.total_value)}$`,
          `Status: ${d.status_message}(${d.status})`,
          d.status === TRADE_STATUS.SENT &&
            d.metadata.partner &&
            `BuyerInfo: ${JSON.stringify(d.metadata.partner, null, 2)}`,
        ];

        return deposit.filter(Boolean).join(" - ");
      })
      .join("\n");

    const returnData = [
      ...(pendingDeposits.length ? [pendingDeposits] : []),
      `Confirmed (${depositCompleted.length}): ${totalValueCompleted}$`,
    ].join("\n");

    return returnData;
  } catch (error) {
    throw error;
  }
};

export const cancelDepositController = async (
  depositIds: "all" | number[],
): Promise<void> => {
  let ids: number[] = [];

  try {
    if (depositIds === "all") {
      const activeTrades = await getActiveTradesService();
      const pendingDeposits = activeTrades.data.deposits.filter(
        (d) => d.status === TRADE_STATUS.PENDING,
      );

      if (!pendingDeposits.length) {
        throw new Error("No active pending deposits to cancel");
      }

      ids = pendingDeposits.map((d) => d.id);
    } else {
      ids = depositIds;
    }

    await cancelDepositService({ depositIds: ids });
  } catch (error) {
    throw error;
  }
};

export const blockUserController = async ({
  steamId,
}: BlockUserPayload): Promise<void> => {
  try {
    await blockUserService({ steamId });
  } catch (error) {
    throw error;
  }
};

// export const countController = async (): Promise<number> => {
//   try {
//     const activeTrades = await getActiveTradesService();

//     const depositedItemIds: number[] = [];

//     for (const item of activeTrades.data.deposits) {
//       if (item.status === TRADE_STATUS.PROCESSING) continue;
//       depositedItemIds.push(item.item_id);
//     }

//     const { data } = await getCs2InventoryService();

//     const items = data
//       .filter((item) => item.market_name === ITEM_NAME)
//       .filter((item) => !depositedItemIds.includes(item.id));

//     return items.length;
//   } catch (error) {
//     throw error;
//   }
// };
