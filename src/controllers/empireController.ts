import { Maybe } from "csgoempire-api/dist/typings/utils";
import { RATE } from "../constant";
import {
  blockUserService,
  cancelDepositService,
  createDepositService,
  getActiveTradesService,
  getCSGOInventoryService,
} from "../services/empireService";
import { convertToUsd } from "../utils";
import { BlockUserPayload } from "../types/empire";

const ITEM_NAME = process.env.ITEM_NAME;
if (!ITEM_NAME) throw new Error("Item name not found");

export const createDepositController = async ({ price }: { price: number }) => {
  try {
    const { deposits } = await getActiveTradesService();

    const depositedItems: Maybe<number>[] = [];

    for (const item of deposits) {
      if (item.status !== 13) throw new Error("Already have deposit");
      depositedItems.push(item.item_id);
    }

    const { data } = await getCSGOInventoryService();

    const items = data
      .filter((item) => item.market_name === ITEM_NAME)
      .filter((item) => !depositedItems.includes(item.id));

    if (!items.length) throw new Error("Out of stock");

    const item = items[0];

    const coinValue = Number((price / RATE).toFixed(2).replace(".", ""));

    await createDepositService({
      id: item.id,
      coinValue: coinValue,
    });

    return;
  } catch (error) {
    throw new Error(`createDepositController: ${error}`);
  }
};

export const getActiveDepositController = async () => {
  try {
    const { deposits } = await getActiveTradesService();

    if (!deposits.length) throw new Error("No active deposits");

    const totalPending = deposits
      .filter((d) => d.status === 13)
      .reduce((sum, d) => sum + (d.total_value ?? 0), 0);

    const formatted = deposits
      .sort((a, b) => a.id - b.id)
      .map((d) => {
        const parts = [
          `Order: ${d.id}`,
          `Price: ${convertToUsd(d.total_value)}$`,
          `Status: ${d.status_message}(${d.status})`,
          d.metadata.partner &&
            d.status != 13 &&
            `BuyerInfo: ${JSON.stringify(d.metadata.partner, null, 2)}`,
        ];

        return parts.filter(Boolean).join(" - ");
      });

    return [...formatted, `Pending: ${convertToUsd(totalPending)}$`].join("\n");
  } catch (error) {
    throw new Error(`getActiveDepositController: ${error}`);
  }
};

export const cancelDepositController = async () => {
  try {
    const { deposits } = await getActiveTradesService();

    if (!deposits.length) throw new Error("No active deposits");

    const depositId = deposits[0].id;

    const { success } = await cancelDepositService({ depositId });
    if (!success) throw new Error(`Success false`);

    return success;
  } catch (error) {
    throw new Error(`cancelDepositController: ${error}`);
  }
};

export const blockUserController = async ({ steamId }: BlockUserPayload) => {
  try {
    const { success } = await blockUserService({ steamId });
    if (!success) throw new Error("blockUserController: Unk fail");

    return success;
  } catch (error) {
    throw new Error(`blockUserController: ${error}`);
  }
};

export const countController = async () => {
  try {
    const { deposits } = await getActiveTradesService();

    const depositedItems: Maybe<number>[] = [];

    for (const item of deposits) {
      if (item.status === 2) continue;
      depositedItems.push(item.item_id);
    }

    const { data } = await getCSGOInventoryService();

    const items = data
      .filter((item) => item.market_name === ITEM_NAME)
      .filter((item) => !depositedItems.includes(item.id));

    return items.length;
  } catch (error) {
    throw new Error(`countController: ${error}`);
  }
};
