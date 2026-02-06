export interface CryptoCurrency {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  roi: null | {
    times: number;
    currency: string;
    percentage: number;
  };
  last_updated: string;
}

export interface WebSocketPriceUpdate {
  stream: string;
  data: {
    e: string; // Event type
    E: number; // Event time
    s: string; // Symbol
    c: string; // Close price
    o: string; // Open price
    h: string; // High price
    l: string; // Low price
    v: string; // Volume
    q: string; // Quote asset volume
    O: number; // Open time
    C: number; // Close time
    F: number; // First trade ID
    L: number; // Last trade ID
    n: number; // Number of trades
    x: string; // Ignore
    p: string; // Price change
    P: string; // Price change percent
    Q: string; // Last quantity
    b: string; // Best bid price
    B: string; // Best bid quantity
    a: string; // Best ask price
    A: string; // Best ask quantity
    i: string; // Ignore
    I: string; // Ignore
    w: string; // Weighted average price
  };
}

export type SortField = 'market_cap_rank' | 'price_change_percentage_24h' | 'market_cap' | 'volume';
export type SortOrder = 'asc' | 'desc';
