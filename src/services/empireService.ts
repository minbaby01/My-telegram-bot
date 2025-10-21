import { empire, empireApi } from "../lib/empireApi";
import {
  BlockUserPayload,
  BlockUserResponse,
  CancelDepositPayload,
  CreateDepositPayload,
  MarkAsSentPayload,
} from "../types/empire";

export const getCSGOInventoryService = async () => {
  return await empire.getCSGOInventory(true);
};

export const createDepositService = async ({
  id,
  coinValue,
}: CreateDepositPayload) => {
  return await empire.createDeposit({
    items: [
      {
        id: id,
        custom_price: coinValue,
        coin_value: coinValue,
      },
    ],
  });
};

export const getActiveTradesService = async () => {
  const { data } = await empire.getActiveTrades();
  return data;
};

export const cancelDepositService = async ({
  depositId,
}: CancelDepositPayload) => {
  return await empire.cancelDeposit(depositId);
};

export const blockUserService = async ({ steamId }: BlockUserPayload) => {
  const { data } = await empireApi.post<BlockUserResponse>(
    `/trading/block-list/${steamId}`
  );
  return data;
};

export const markAsSentService = async ({ depositId }: MarkAsSentPayload) => {
  return (await empireApi.post(`/${depositId}/sent`)).data;
};
