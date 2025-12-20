import {
  getMastercardUsdRateService,
  // getVisaUsdRateService,
} from "../services/moneyService";

export const getUsdRateController = async () => {
  try {
    const [d, m, y] = new Intl.DateTimeFormat("vi-VN", {
      timeZone: "Asia/Bangkok",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
      .format(new Date())
      .split("/");

    // const visaRate = await getVisaUsdRateService(`${m}/${d}/${y}`);
    const mastercardRate = await getMastercardUsdRateService(`${y}-${m}-${d}`);

    const returnData = [
      `${d}/${m}/${y} rate:`,
      // `Visa: ${visaRate.originalValues.toAmountWithVisaRate}`,
      `Mastercard: ${mastercardRate?.data?.conversionRate ?? "Error"}`,
    ].join("\n");

    return returnData;
  } catch (error) {
    throw error;
  }
};
