import axios from "axios";
import { GetMastercardRateResponse, GetVisaRateResponse } from "../types/money";

const fromCurr = "VND";
const toCurr = "USD";

export const getVisaUsdRateService = async (date: string) => {
  const amount = 1;
  const fee = 0;

  const { data } = await axios.get<GetVisaRateResponse>(
    `https://www.visa.com.vn/cmsapi/fx/rates?amount=${amount}&fee=${fee}&utcConvertedDate=${encodeURIComponent(
      date
    )}&exchangedate=${encodeURIComponent(
      date
    )}&fromCurr=${fromCurr}&toCurr=${toCurr}`
  );
  return data;
};

export const getMastercardUsdRateService = async (date: string) => {
  const amount = 1;
  const fee = 0;

  const { data } = await axios.get<GetMastercardRateResponse>(
    `https://www.mastercard.com/marketingservices/public/mccom-services/currency-conversions/conversion-rates?exchange_date=${date}&transaction_currency=${toCurr}&cardholder_billing_currency=${fromCurr}&bank_fee=${fee}&transaction_amount=${amount}`
  );
  return data.data;
};
