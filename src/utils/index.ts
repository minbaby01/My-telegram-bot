import { RATE } from "../constant";

export const convertToUsd = (coinValue: number) => {
  return ((coinValue * RATE) / 100).toFixed(2);
};

export const getErrorMessage = (err: unknown) => {
  return err instanceof Error ? err.message : String(err);
};
