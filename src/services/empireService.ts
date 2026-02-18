import { empireApi } from "../lib/empireApi.js";
import {
  BlockUserPayload,
  BlockUserResponse,
} from "../types/empire/BlockUser.js";
import { CancelDepositPayload } from "../types/empire/CancelDeposit.js";
import { CreateDepositItemsPayload } from "../types/empire/CreateDeposit.js";
import { GetActiveTradeResponse } from "../types/empire/GetActiveTrades.js";
import { GetCs2InventoryResponse } from "../types/empire/GetCs2Inventory.js";
import { MarkAsSentPayload } from "../types/empire/MarkAsSent.js";

export const getCs2InventoryService = async () => {
  const { data } =
    await empireApi.get<GetCs2InventoryResponse>(`/user/inventory`);
  return data;
};

export const createDepositService = async (
  items: CreateDepositItemsPayload,
): Promise<void> => {
  await empireApi.post(`/deposit`, {
    items: items,
  });
};

export const getActiveTradesService = async () => {
  const { data } = await empireApi.get<GetActiveTradeResponse>(`/user/trades`);
  return data;
};

export const cancelDepositService = async ({
  depositIds: depositIds,
}: CancelDepositPayload): Promise<void> => {
  await empireApi.post(`/deposit/cancel`, {
    ids: depositIds,
  });
};

export const blockUserService = async ({ steamId }: BlockUserPayload) => {
  const { data } = await empireApi.post<BlockUserResponse>(
    `/block-list/${steamId}`,
  );
  return data;
};

export const markAsSentService = async ({ depositId }: MarkAsSentPayload) => {
  const { data } = await empireApi.post(`/deposit/${depositId}/sent`);
  return data;
};
