import { empireApi } from "../lib/empireApi";
import { BlockUserPayload, BlockUserResponse } from "../types/empire/BlockUser";
import { CancelDepositPayload } from "../types/empire/CancelDeposit";
import { CreateDepositItemsPayload } from "../types/empire/CreateDeposit";
import { GetActiveTradeResponse } from "../types/empire/GetActiveTrades";
import { GetCs2InventoryResponse } from "../types/empire/GetCs2Inventory";
import { MarkAsSentPayload } from "../types/empire/MarkAsSent";

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
