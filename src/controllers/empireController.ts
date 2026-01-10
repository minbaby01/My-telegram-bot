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

const ITEM_NAME = process.env.ITEM_NAME;
if (!ITEM_NAME) throw new Error("Item name not found");

export const createDepositController = async ({
  price,
}: {
  price: number;
}): Promise<void> => {
  try {
    const activeTrades = await getActiveTradesService();

    const depositedItems: number[] = [];

    for (const item of activeTrades.data.deposits) {
      if (item.status !== TRADE_STATUS.COMPLETED_BUT_REVERSIBLE) {
        throw new Error("Already have deposit");
      }
      depositedItems.push(item.item_id);
    }

    const { data } = await getCs2InventoryService();

    const items = data
      .filter((item) => item.market_name === ITEM_NAME)
      .filter((item) => !depositedItems.includes(item.id));

    if (!items.length) throw new Error("Out of stock");

    const item = items[0];

    const coinValue = Number((price / RATE).toFixed(2).replace(".", ""));

    await createDepositService([
      {
        id: item.id,
        coinValue: coinValue,
      },
    ]);
  } catch (error) {
    throw error;
  }
};

export const getActiveDepositController = async (): Promise<string> => {
  try {
    const activeTrades = await getActiveTradesService();

    if (!activeTrades.data.deposits.length) {
      throw new Error("No active deposits");
    }

    const depositCompleteLength = activeTrades.data.deposits.filter(
      (d) => d.status === TRADE_STATUS.COMPLETED_BUT_REVERSIBLE
    ).length;

    const totalPending = activeTrades.data.deposits
      .filter((d) => d.status === 13)
      .reduce((sum, d) => sum + (d.total_value ?? 0), 0);

    const currentDeposit = activeTrades.data.deposits
      .filter((d) => d.status !== 13)
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
      });

    const returnData = [
      ...(currentDeposit.length ? [`Current deposit: ${currentDeposit}`] : []),
      `Pending (${depositCompleteLength}): ${convertToUsd(totalPending)}$`,
    ].join("\n");

    return returnData;
  } catch (error) {
    throw error;
  }
};

export const cancelDepositController = async (): Promise<void> => {
  try {
    const activeTrades = await getActiveTradesService();
    if (!activeTrades.data.deposits.length) {
      throw new Error("No active deposit");
    }

    const depositId = activeTrades.data.deposits[0].id;

    await cancelDepositService({ depositId });
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

export const countController = async (): Promise<number> => {
  try {
    const activeTrades = await getActiveTradesService();

    const depositedItemIds: number[] = [];

    for (const item of activeTrades.data.deposits) {
      if (item.status === TRADE_STATUS.PROCESSING) continue;
      depositedItemIds.push(item.item_id);
    }

    const { data } = await getCs2InventoryService();

    const items = data
      .filter((item) => item.market_name === ITEM_NAME)
      .filter((item) => !depositedItemIds.includes(item.id));

    return items.length;
  } catch (error) {
    throw error;
  }
};
