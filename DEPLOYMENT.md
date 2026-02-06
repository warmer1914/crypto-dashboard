# Deployment Guide

## Vercel Deployment

### Prerequisites
- GitHub account
- Vercel account (free tier available)

### Steps

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will automatically detect Next.js
   - Click "Deploy"

3. **Environment Variables** (if needed)
   - No environment variables required for basic functionality
   - All APIs used are public

### Manual Deployment

```bash
# Build the project
npm run build

# Start production server
npm start
```

### Features Available After Deployment

- ✅ Real-time cryptocurrency data
- ✅ Search and filter functionality
- ✅ Responsive design
- ✅ WebSocket live updates
- ✅ Dark mode support
- ✅ Mobile-friendly interface

### Troubleshooting

**Build Errors:**
- Ensure Node.js version is 14+ (recommended: 16+)
- Run `npm install` before building
- Check TypeScript errors with `npm run lint`

**WebSocket Issues:**
- WebSocket connections work only in browser environment
- SSR errors are expected and don't affect client functionality
- Ensure HTTPS for production WebSocket connections

**API Rate Limits:**
- CoinGecko API has rate limits
- Consider implementing caching for production use
- Monitor API usage

### Performance Optimization

- Images are optimized with Next.js Image component
- CSS is purged with Tailwind CSS
- Code splitting is automatic with Next.js
- Static generation for better performance

### Monitoring

- Use Vercel Analytics for performance monitoring
- Monitor API response times
- Track WebSocket connection stability




