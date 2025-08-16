# Vercel Frontend - Render Backend Integration

## Overview
This document describes the integration between the Vercel-deployed frontend and Render-deployed backend for the Womenline 2.0 application.

## Backend URL
- **Production Backend**: `https://team5555-womenline-final.onrender.com`
- **Previous Backend**: `https://team5555-womenline-03.onrender.com` (deprecated)

## Configuration

### API Configuration
The frontend is configured to connect to the Render backend through the `src/api.js` file:

```javascript
const BASE_URL = process.env.REACT_APP_API_URL || "https://team5555-womenline-final.onrender.com";
```

### Environment Variables
To customize the API URL, you can set the `REACT_APP_API_URL` environment variable in your Vercel deployment:

1. Go to your Vercel project dashboard
2. Navigate to Settings > Environment Variables
3. Add: `REACT_APP_API_URL` = `https://team5555-womenline-final.onrender.com`

### CORS Configuration
The Render backend should be configured to allow requests from your Vercel domain:
- **Vercel Domain**: `http://women-line-frontend.vercel.app`
- **Local Development**: `http://localhost:8000`

## API Endpoints
The following endpoints are available through the Render backend:

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Journals
- `GET /api/journals` - Get user journals
- `POST /api/journals` - Create journal entry

### File Upload
- `POST /api/upload/file` - Upload files

### Rewards System
- `GET /api/rewards` - Get available rewards
- `POST /api/rewards/redeem` - Redeem reward
- `GET /api/user-credits` - Get user credits
- `POST /api/earn-credits` - Earn credits

### PDF Generation
- `GET /api/pdf/sample` - Generate sample PDF

## Testing the Integration

### 1. Verify Backend Connectivity
Test if the backend is accessible:
```bash
curl https://team5555-womenline-final.onrender.com/api/health
```

### 2. Test Frontend-Backend Communication
1. Deploy the updated frontend to Vercel
2. Test user registration/login
3. Verify journal creation and retrieval
4. Test file upload functionality

### 3. Monitor Network Requests
Use browser DevTools to monitor API calls and ensure they're going to the correct backend URL.

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure the Render backend allows requests from your Vercel domain
   - Check if the backend is properly configured for cross-origin requests

2. **API Timeout**
   - Render free tier has cold start delays
   - Consider upgrading to a paid plan for better performance

3. **Authentication Issues**
   - Verify JWT token handling
   - Check if tokens are being properly stored and sent

### Debug Steps

1. Check browser console for API errors
2. Verify the BASE_URL in the Network tab
3. Test backend endpoints directly with tools like Postman
4. Check Render logs for backend errors

## Deployment Checklist

- [ ] Update API configuration in `src/api.js`
- [ ] Set environment variables in Vercel
- [ ] Deploy frontend to Vercel
- [ ] Test all major functionality
- [ ] Verify backend connectivity
- [ ] Monitor for errors in production

## Support
For backend issues, check the Render deployment logs.
For frontend issues, check the Vercel deployment logs and browser console. 