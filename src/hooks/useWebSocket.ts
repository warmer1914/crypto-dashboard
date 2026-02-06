import { useEffect, useState, useCallback } from 'react';
import { getWebSocketService } from '@/lib/websocket';
import { WebSocketPriceUpdate } from '@/types/crypto';

export const useWebSocket = (symbol: string) => {
  const [priceData, setPriceData] = useState<WebSocketPriceUpdate | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const handlePriceUpdate = useCallback((data: WebSocketPriceUpdate) => {
    setPriceData(data);
  }, []);

  useEffect(() => {
    if (!symbol || typeof window === 'undefined') return;

    const wsService = getWebSocketService();
    wsService.subscribe(symbol, handlePriceUpdate);
    
    // Check connection status
    const checkConnection = () => {
      setIsConnected(wsService.isConnected);
    };
    
    checkConnection();
    const interval = setInterval(checkConnection, 1000);

    return () => {
      wsService.unsubscribe(symbol);
      clearInterval(interval);
    };
  }, [symbol, handlePriceUpdate]);

  return {
    priceData,
    isConnected,
  };
};
