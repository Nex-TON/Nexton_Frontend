import axios from "axios";
import useSWR from "swr";

const tonClient = axios.create({
  baseURL: "https://tonapi.io",
});

const tonFetcher = (url: string) => tonClient.get(url).then(res => res.data);

interface ICoinPrice {
  rates: {
    [token: string]: {
      prices: {
        [currency: string]: number;
      };
      diff_24h: {
        [currency: string]: string;
      };
      diff_7d: {
        [currency: string]: string;
      };
      diff_30d: {
        [currency: string]: string;
      };
    };
  };
}

export function useCoinPrice(token: string, currency: string) {
  const swrKey = token && currency ? `/v2/rates?tokens=${token}&currencies=${currency}` : null;

  return useSWR<ICoinPrice>(swrKey, tonFetcher);
}
