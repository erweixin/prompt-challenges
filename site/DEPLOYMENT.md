# Deployment Guide

## Environment Variables

Before deploying, make sure to set the following environment variables:

### Required Variables

- `OPENROUTER_API_KEY`: Your OpenRouter API key for the scoring system

### Optional Variables

- `NEXT_PUBLIC_SITE_URL`: Your site's public URL (used for OpenRouter API headers)

## Deployment Platforms

### Vercel (Recommended)

1. **Connect Repository**
   - Fork or connect your repository to Vercel
   - Vercel will automatically detect it's a Next.js project

2. **Configure Environment Variables**
   - Go to your project settings in Vercel
   - Add the required environment variables
   - Redeploy the project

3. **Deploy**
   - Vercel will automatically deploy on every push to main branch
   - Or manually trigger deployment from the dashboard

### Netlify

1. **Build Settings**
   ```
   Build command: npm run build
   Publish directory: .next
   ```

2. **Environment Variables**
   - Add environment variables in Netlify dashboard
   - Redeploy after adding variables

3. **Deploy**
   - Connect your repository
   - Netlify will build and deploy automatically

### Docker

1. **Create Dockerfile**
   ```dockerfile
   FROM node:18-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci --only=production
   COPY . .
   RUN npm run build
   EXPOSE 3000
   CMD ["npm", "start"]
   ```

2. **Build and Run**
   ```bash
   docker build -t prompt-challenges .
   docker run -p 3000:3000 -e OPENROUTER_API_KEY=your_key prompt-challenges
   ```

## Production Considerations

### Performance

- **Caching**: Enable Next.js caching for static assets
- **CDN**: Use a CDN for global content delivery
- **Database**: Consider adding a database for user progress tracking

### Security

- **API Rate Limiting**: Implement rate limiting for the scoring API
- **Input Validation**: Validate all user inputs
- **CORS**: Configure CORS properly for production

### Monitoring

- **Error Tracking**: Set up error tracking (e.g., Sentry)
- **Analytics**: Add analytics to track usage
- **Health Checks**: Implement health check endpoints

## Environment-Specific Configurations

### Development
```bash
NODE_ENV=development
OPENROUTER_API_KEY=your_dev_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Staging
```bash
NODE_ENV=production
OPENROUTER_API_KEY=your_staging_key
NEXT_PUBLIC_SITE_URL=https://staging.yoursite.com
```

### Production
```bash
NODE_ENV=production
OPENROUTER_API_KEY=your_production_key
NEXT_PUBLIC_SITE_URL=https://yoursite.com
```

## Troubleshooting

### Common Issues

1. **API Key Not Working**
   - Verify the API key is correct
   - Check OpenRouter account balance
   - Ensure the key has proper permissions

2. **Build Failures**
   - Check Node.js version compatibility
   - Verify all dependencies are installed
   - Review build logs for specific errors

3. **Scoring Not Working**
   - Verify environment variables are set
   - Check API endpoint is accessible
   - Review browser console for errors

### Debug Mode

Enable debug logging by setting:
```bash
DEBUG=* npm run dev
```

## Support

For deployment issues:
1. Check the troubleshooting section above
2. Review platform-specific documentation
3. Open an issue on GitHub with detailed error information 