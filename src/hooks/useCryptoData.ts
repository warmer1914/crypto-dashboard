import { useQuery } from '@tanstack/react-query';
import { cryptoApi } from '@/lib/api';
import { CryptoCurrency } from '@/types/crypto';

export const useCryptoData = (page = 1, perPage = 100) => {
  return useQuery({
    queryKey: ['crypto-data', page, perPage],
    queryFn: () => cryptoApi.getMarketData(page, perPage),
    staleTime: 30000, // 30 seconds
    refetchInterval: 60000, // Refetch every minute
  });
};

export const useSearchCoins = (query: string, enabled = false) => {
  return useQuery({
    queryKey: ['search-coins', query],
    queryFn: () => cryptoApi.searchCoins(query),
    enabled: enabled && query.length > 0,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};




