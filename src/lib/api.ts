import axios from 'axios';
import { CryptoCurrency } from '@/types/crypto';

const COINGECKO_API_BASE = 'https://api.coingecko.com/api/v3';

export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export const cryptoApi = {
  async getMarketData(page = 1, perPage = 100): Promise<CryptoCurrency[]> {
    try {
      const response = await axios.get(`${COINGECKO_API_BASE}/coins/markets`, {
        params: {
          vs_currency: 'usd',
          order: 'market_cap_desc',
          per_page: perPage,
          page,
          sparkline: false,
          price_change_percentage: '24h',
        },
        timeout: 10000,
      });
      
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new ApiError(
          `Failed to fetch market data: ${error.message}`,
          error.response?.status,
          error.code
        );
      }
      throw new ApiError('Unknown error occurred while fetching market data');
    }
  },

  async searchCoins(query: string): Promise<CryptoCurrency[]> {
    try {
      const response = await axios.get(`${COINGECKO_API_BASE}/search`, {
        params: {
          query,
        },
        timeout: 10000,
      });
      
      return response.data.coins.map((coin: any) => ({
        id: coin.id,
        symbol: coin.symbol,
        name: coin.name,
        image: coin.thumb,
        current_price: 0,
        market_cap: 0,
        market_cap_rank: 0,
        fully_diluted_valuation: 0,
        total_volume: 0,
        high_24h: 0,
        low_24h: 0,
        price_change_24h: 0,
        price_change_percentage_24h: 0,
        market_cap_change_24h: 0,
        market_cap_change_percentage_24h: 0,
        circulating_supply: 0,
        total_supply: 0,
        max_supply: 0,
        ath: 0,
        ath_change_percentage: 0,
        ath_date: '',
        atl: 0,
        atl_change_percentage: 0,
        atl_date: '',
        roi: null,
        last_updated: '',
      }));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new ApiError(
          `Failed to search coins: ${error.message}`,
          error.response?.status,
          error.code
        );
      }
      throw new ApiError('Unknown error occurred while searching coins');
    }
  },
};

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 8,
  }).format(value);
};

export const formatPercentage = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value / 100);
};

export const formatNumber = (value: number): string => {
  if (value >= 1e12) {
    return (value / 1e12).toFixed(2) + 'T';
  } else if (value >= 1e9) {
    return (value / 1e9).toFixed(2) + 'B';
  } else if (value >= 1e6) {
    return (value / 1e6).toFixed(2) + 'M';
  } else if (value >= 1e3) {
    return (value / 1e3).toFixed(2) + 'K';
  }
  return value.toFixed(2);
};

export const getCryptoTradingViewSymbol = (id: string, symbol: string): string => {
  const mapping: Record<string, string> = {
    'bitcoin': 'BINANCE:BTCUSDT',
    'ethereum': 'BINANCE:ETHUSDT',
    'tether': 'BINANCE:USDTUSDT',
    'binancecoin': 'BINANCE:BNBUSDT',
    'solana': 'BINANCE:SOLUSDT',
    'usd-coin': 'BINANCE:USDCUSDT',
    'ripple': 'BINANCE:XRPUSDT',
    'cardano': 'BINANCE:ADAUSDT',
    'dogecoin': 'BINANCE:DOGEUSDT',
    'avalanche-2': 'BINANCE:AVAXUSDT',
    'tron': 'BINANCE:TRXUSDT',
    'shiba-inu': 'BINANCE:SHIBUSDT',
    'polkadot': 'BINANCE:DOTUSDT',
    'chainlink': 'BINANCE:LINKUSDT',
    'polygon': 'BINANCE:MATICUSDT',
    'litecoin': 'BINANCE:LTCUSDT',
    'bitcoin-cash': 'BINANCE:BCHUSDT',
    'uniswap': 'BINANCE:UNIUSDT',
    'stellar': 'BINANCE:XLMUSDT',
    'ethereum-classic': 'BINANCE:ETCUSDT',
    'monero': 'BINANCE:XMRUSDT',
    'cosmos': 'BINANCE:ATOMUSDT',
    'algorand': 'BINANCE:ALGOUSDT',
    'vechain': 'BINANCE:VETUSDT',
    'filecoin': 'BINANCE:FILUSDT',
    'the-graph': 'BINANCE:GRTUSDT',
    'sandbox': 'BINANCE:SANDUSDT',
    'decentraland': 'BINANCE:MANAUSDT',
    'aave': 'BINANCE:AAVEUSDT',
    'eos': 'BINANCE:EOSUSDT',
    'theta-token': 'BINANCE:THETAUSDT',
    'axie-infinity': 'BINANCE:AXSUSDT',
    'maker': 'BINANCE:MKRUSDT',
    'fantom': 'BINANCE:FTMUSDT',
    'hedera-hashgraph': 'BINANCE:HBARUSDT',
    'elrond-erd-2': 'BINANCE:EGLDUSDT',
    'zcash': 'BINANCE:ZECUSDT',
    'neo': 'BINANCE:NEOUSDT',
    'flow': 'BINANCE:FLOWUSDT',
    'pancakeswap-token': 'BINANCE:CAKEUSDT',
    'klay-token': 'BINANCE:KLAYUSDT',
    'curve-dao-token': 'BINANCE:CRVUSDT',
  };
  
  return mapping[id] || `BINANCE:${symbol.toUpperCase()}USDT`;
};




