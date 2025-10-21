import { Deposit } from "csgoempire-api/dist/typings/operations/deposit";

export type CreateDepositPayload = {
  id: number;
  coinValue: number;
};

export type CancelDepositPayload = {
  depositId: number;
};

export type BlockUserPayload = {
  steamId: string;
};

export type BlockUserResponse = {
  success: boolean;
};

export type MarkAsSentPayload = {
  depositId: string;
};

export type DepositCustom = Deposit & {
  item?: {
    asset_id: string;
  };
};
