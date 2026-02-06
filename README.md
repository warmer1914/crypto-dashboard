# Crypto Prices Dashboard

A real-time cryptocurrency prices dashboard built with Next.js, TypeScript, and Tailwind CSS. This project demonstrates SSR (Server-Side Rendering), WebSocket integration, and modern React patterns.

## 🚀 Features

- **Real-time Data**: Live cryptocurrency prices using Binance WebSocket API
- **SSR Support**: Server-side rendering with Next.js App Router
- **Search & Filter**: Search cryptocurrencies by name or symbol
- **Sorting**: Sort by market cap, price change, volume, and more
- **Responsive Design**: Mobile-first responsive UI with Tailwind CSS
- **State Management**: Efficient state management with TanStack Query
- **Type Safety**: Full TypeScript support
- **Dark Mode**: Built-in dark mode support

## 🛠 Tech Stack

- **Framework**: Next.js 13+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: TanStack Query (React Query)
- **HTTP Client**: Axios
- **WebSocket**: Native WebSocket API
- **Icons**: Lucide React
- **Deployment**: Vercel

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd crypto-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── providers.tsx      # React Query provider
├── components/            # Reusable components
│   ├── CryptoCard.tsx     # Cryptocurrency card component
│   ├── ErrorMessage.tsx   # Error display component
│   ├── LoadingSpinner.tsx # Loading indicator
│   ├── SearchBar.tsx     # Search input component
│   └── SortDropdown.tsx   # Sorting controls
├── hooks/                 # Custom React hooks
│   ├── useCryptoData.ts   # Crypto data fetching hook
│   └── useWebSocket.ts    # WebSocket connection hook
├── lib/                   # Utility libraries
│   ├── api.ts            # API service layer
│   ├── query-client.ts   # React Query configuration
│   └── websocket.ts     # WebSocket service
└── types/                 # TypeScript type definitions
    └── crypto.ts         # Cryptocurrency types
```

## 🔧 API Integration

### CoinGecko API
- **Endpoint**: `https://api.coingecko.com/api/v3/coins/markets`
- **Purpose**: Fetch initial cryptocurrency market data
- **Features**: Market cap, price changes, volume, rankings

### Binance WebSocket API
- **Endpoint**: `wss://stream.binance.com:9443/ws/!ticker@arr`
- **Purpose**: Real-time price updates
- **Features**: Live price changes, volume updates

## 🎨 UI Components

### CryptoCard
Displays individual cryptocurrency information including:
- Current price and 24h change
- Market cap and volume
- High/low prices
- Real-time indicators

### SearchBar
- Real-time search functionality
- Clear search option
- Responsive design

### SortDropdown
- Multiple sorting options
- Ascending/descending order
- Visual indicators

## 🔄 State Management

The application uses TanStack Query for efficient data fetching and caching:

- **Stale Time**: 5 minutes for cached data
- **Cache Time**: 10 minutes for inactive queries
- **Retry Logic**: 3 attempts with exponential backoff
- **Background Refetch**: Automatic data updates

## 🌐 WebSocket Integration

Real-time updates are handled through a custom WebSocket service:

- **Connection Management**: Automatic reconnection with exponential backoff
- **Subscription System**: Subscribe/unsubscribe to specific symbols
- **Error Handling**: Graceful error handling and connection status
- **Performance**: Efficient data parsing and state updates

## 📱 Responsive Design

The dashboard is fully responsive with:
- Mobile-first approach
- Flexible grid layouts
- Adaptive typography
- Touch-friendly interactions

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Manual Deployment

```bash
npm run build
npm start
```

## 🔍 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Environment Variables

No environment variables are required for basic functionality. The application uses public APIs.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [CoinGecko](https://www.coingecko.com/) for cryptocurrency data API
- [Binance](https://www.binance.com/) for WebSocket API
- [Next.js](https://nextjs.org/) for the React framework
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [TanStack Query](https://tanstack.com/query) for data fetching

## 📞 Support

If you encounter any issues or have questions, please open an issue on GitHub.




