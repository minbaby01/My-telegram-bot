import { RATE } from "../constant";

export const convertToUsd = (coinValue: number) => {
  return ((coinValue * RATE) / 100).toFixed(2);
};
