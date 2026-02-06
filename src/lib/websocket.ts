import { WebSocketPriceUpdate } from '@/types/crypto';

export class WebSocketService {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectInterval = 5000;
  private isConnecting = false;
  private subscriptions = new Set<string>();
  private listeners = new Map<string, (data: WebSocketPriceUpdate) => void>();

  get isConnected(): boolean {
    return this.ws?.readyState === WebSocket.OPEN;
  }

  constructor() {
    // Only connect on client side
    if (typeof window !== 'undefined') {
      this.connect();
    }
  }

  private connect() {
    if (typeof window === 'undefined') {
      return;
    }
    
    if (this.isConnecting || (this.ws && this.ws.readyState === WebSocket.OPEN)) {
      return;
    }

    this.isConnecting = true;
    
    try {
      this.ws = new WebSocket('wss://stream.binance.com:9443/ws/!ticker@arr');
      
      this.ws.onopen = () => {
        console.log('WebSocket connected');
        this.isConnecting = false;
        this.reconnectAttempts = 0;
        this.resubscribe();
      };

      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          this.handleMessage(data);
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };

      this.ws.onclose = () => {
        console.log('WebSocket disconnected');
        this.isConnecting = false;
        this.scheduleReconnect();
      };

      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        this.isConnecting = false;
      };
    } catch (error) {
      console.error('Failed to create WebSocket connection:', error);
      this.isConnecting = false;
      this.scheduleReconnect();
    }
  }

  private scheduleReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      setTimeout(() => {
        this.connect();
      }, this.reconnectInterval);
    }
  }

  private resubscribe() {
    // Binance WebSocket sends all ticker data by default
    // No need to resubscribe to specific symbols
  }

  private handleMessage(data: any) {
    if (Array.isArray(data)) {
      data.forEach((ticker: any) => {
        const symbol = ticker.s;
        if (this.subscriptions.has(symbol)) {
          const listener = this.listeners.get(symbol);
          if (listener) {
            listener({
              stream: `${symbol.toLowerCase()}@ticker`,
              data: {
                e: '24hrTicker',
                E: ticker.E,
                s: ticker.s,
                c: ticker.c,
                o: ticker.o,
                h: ticker.h,
                l: ticker.l,
                v: ticker.v,
                q: ticker.q,
                O: ticker.O,
                C: ticker.C,
                F: ticker.F,
                L: ticker.L,
                n: ticker.n,
                x: ticker.x,
                p: ticker.P,
                P: ticker.P,
                Q: ticker.Q,
                b: ticker.b,
                B: ticker.B,
                a: ticker.a,
                A: ticker.A,
                i: ticker.i,
                I: ticker.I,
                w: ticker.w,
              },
            });
          }
        }
      });
    }
  }

  subscribe(symbol: string, callback: (data: WebSocketPriceUpdate) => void) {
    const binanceSymbol = symbol.toUpperCase() + 'USDT';
    this.subscriptions.add(binanceSymbol);
    this.listeners.set(binanceSymbol, callback);
  }

  unsubscribe(symbol: string) {
    const binanceSymbol = symbol.toUpperCase() + 'USDT';
    this.subscriptions.delete(binanceSymbol);
    this.listeners.delete(binanceSymbol);
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.subscriptions.clear();
    this.listeners.clear();
  }
}

// Singleton instance - only create on client side
let wsService: WebSocketService | null = null;

export const getWebSocketService = (): WebSocketService => {
  if (typeof window !== 'undefined' && !wsService) {
    wsService = new WebSocketService();
  }
  return wsService!;
};
