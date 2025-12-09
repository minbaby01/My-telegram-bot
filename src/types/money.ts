export type GetMastercardRateResponse = {
  data: {
    conversionRate: string;
    crdhldBillAmt: string;
    crdhldBillCurr: string;
    fxDate: string;
    transAmt: string;
    transCurr: string;
  };
};

export type GetVisaRateResponse = {
  originalValues: {
    fromCurrency: string;
    fromCurrencyName: string;
    toCurrency: string;
    toCurrencyName: string;
    asOfDate: number;
    fromAmount: string;
    toAmountWithVisaRate: string;
    toAmountWithAdditionalFee: string;
    fxRateVisa: string;
    fxRateWithAdditionalFee: string;
    lastUpdatedVisaRate: number;
    benchmarks: [];
  };
  conversionAmountValue: string;
  conversionBankFee: string;
  conversionInputDate: string;
  conversionFromCurrency: string;
  conversionToCurrency: string;
  fromCurrencyName: string;
  toCurrencyName: string;
  convertedAmount: string;
  benchMarkAmount: string;
  fxRateWithAdditionalFee: string;
  reverseAmount: string;
  disclaimerDate: string;
  status: string;
};
