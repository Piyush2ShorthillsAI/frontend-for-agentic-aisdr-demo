# AI SDR Insights Dashboard

A modern, production-grade React dashboard for visualizing AI SDR email campaign analytics and performance metrics.

## 🎨 Features

- **📊 Comprehensive Dashboard**: High-level overview of key metrics and KPIs
- **👥 Sender Performance**: Detailed analytics for each sender
- **📧 Campaign Analytics**: Track and compare campaign performance
- **📈 Funnel Analysis**: Visualize lead conversion through stages
- **🎯 Real-time Data**: Live updates from the backend API
- **📱 Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **🎨 Professional UI**: Clean, modern interface with custom color palette
- **⚡ Fast Performance**: Optimized with React and Vite

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm
- Backend API running on `http://localhost:8000`

### Installation

```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The dashboard will be available at `http://localhost:3000`

### Building for Production

```bash
# Create an optimized production build
npm run build

# Preview the production build
npm run preview
```

## 📁 Project Structure

```
frontend/
├── public/                 # Static assets
├── src/
│   ├── components/        # Reusable components
│   │   ├── UI/           # UI components (Card, Button, etc.)
│   │   ├── Charts/       # Chart components
│   │   └── Layout/       # Layout components
│   ├── pages/            # Page components
│   │   ├── Dashboard.jsx
│   │   ├── SenderPerformance.jsx
│   │   ├── CampaignAnalytics.jsx
│   │   └── FunnelAnalysis.jsx
│   ├── services/         # API service layer
│   │   ├── api.js
│   │   └── insightsService.js
│   ├── utils/            # Utility functions
│   │   └── formatters.js
│   ├── App.jsx           # Main app component
│   ├── main.jsx          # Entry point
│   └── index.css         # Global styles
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🎨 Color Palette

The dashboard uses a carefully selected grayscale color palette:

- `#F8F9FA` - Light gray (backgrounds)
- `#E9ECEF` - Soft gray
- `#DEE2E6` - Border gray
- `#CED4DA` - Medium gray
- `#ADB5BD` - Muted gray
- `#6C757D` - Dark gray (secondary text)
- `#495057` - Primary dark
- `#343A40` - Darker gray
- `#212529` - Almost black (primary text)

## 📊 Pages Overview

### Dashboard
- Overview metrics (emails sent, open rate, click rate, reply rate)
- Top performing campaigns
- Engagement scores
- Quick stats

### Sender Performance
- Performance metrics by sender email
- Comparative charts
- Detailed sender statistics
- Average performance indicators

### Campaign Analytics
- Top campaigns ranked by various metrics
- Winner podium for top 3 campaigns
- Comprehensive campaign table
- Metric-based filtering

### Funnel Analysis
- Conversion funnel visualization
- Stage-by-stage breakdown
- Drop-off analysis
- Actionable insights and recommendations

## 🔌 API Integration

The frontend connects to the backend API via the `insightsService`:

```javascript
import insightsService from './services/insightsService';

// Get overview metrics
const overview = await insightsService.getOverview({
  start_date: '2024-01-01',
  end_date: '2024-01-31'
});

// Get sender performance
const senders = await insightsService.getSenderPerformance({
  start_date: '2024-01-01'
});

// Get funnel analysis
const funnel = await insightsService.getFunnelAnalysis();
```

### Available API Methods

- `getOverview(params)` - Get dashboard overview metrics
- `getSenderPerformance(params)` - Get sender performance data
- `getFunnelAnalysis(params)` - Get funnel analysis
- `getTopCampaigns(params)` - Get top performing campaigns
- `getQuickSummary(params)` - Get quick summary
- `exportInsights(params)` - Export data

## 🛠️ Configuration

Create a `.env` file in the frontend directory (copy from `.env.example`):

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

## 📦 Dependencies

### Core
- **React 18** - UI library
- **React Router DOM** - Navigation
- **Axios** - HTTP client

### UI & Visualization
- **Recharts** - Charts and graphs
- **Lucide React** - Icon library
- **date-fns** - Date formatting

### Build Tools
- **Vite** - Build tool and dev server

## 🎯 Key Components

### UI Components
- **Card** - Container for content sections
- **MetricCard** - Display KPI metrics with icons and trends
- **Button** - Consistent button styling
- **LoadingSpinner** - Loading states
- **ErrorMessage** - Error handling

### Chart Components
- **FunnelChart** - Conversion funnel visualization
- **BarChart** - Bar charts for comparisons

### Layout Components
- **Layout** - Main layout wrapper
- **Header** - Top navigation bar
- **Sidebar** - Side navigation menu

## 🔧 Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code (if configured)
npm run lint
```

### Code Style

- Use functional components with hooks
- Follow component naming conventions
- Keep components small and focused
- Use CSS modules or scoped styles
- Add PropTypes or TypeScript for type safety

## 📱 Responsive Design

The dashboard is fully responsive with breakpoints:

- **Desktop**: 1024px and above
- **Tablet**: 768px - 1023px
- **Mobile**: Below 768px

## 🚀 Performance

- Code splitting with React Router
- Lazy loading of components
- Optimized bundle size with Vite
- Efficient re-renders with React hooks
- Memoization where appropriate

## 🔐 Security

- API requests include authentication tokens
- Environment variables for sensitive data
- XSS protection through React
- HTTPS in production (recommended)

## 🐛 Troubleshooting

### API Connection Issues

If you can't connect to the backend:

1. Verify the backend is running: `http://localhost:8000`
2. Check the `VITE_API_BASE_URL` in your `.env` file
3. Ensure CORS is enabled on the backend
4. Check browser console for errors

### Build Issues

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
rm -rf node_modules/.vite
npm run dev
```

## 📄 License

This project is part of the AI SDR System.

## 🤝 Contributing

1. Follow the existing code style
2. Write clean, readable code
3. Add comments for complex logic
4. Test on multiple screen sizes
5. Update documentation as needed

## 📞 Support

For issues or questions:
- Check the troubleshooting section
- Review the backend API documentation
- Contact the development team

---

Built with ❤️ using React and Vite


