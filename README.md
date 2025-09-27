# CyberLink - AI-Powered Smart City Platform

## 🌟 Overview

CyberLink is a comprehensive frontend-only webapp that serves as a Generative AI-powered smart city platform. It connects three key stakeholders in the urban ecosystem: **Freelancers**, **SMEs & Side Hustlers**, and **Event Organizers** through intelligent demand forecasting, smart recommendations, and seamless city integration.

## 🚀 Features

### 🎯 Landing Page
- **Hero Section**: Modern, gradient-based design with platform introduction
- **Role-based Selection**: Three distinct user paths with tailored features
- **Interactive Statistics**: Live metrics showing platform engagement
- **Testimonials**: User feedback and success stories

### 👨‍💻 Freelancer Dashboard
- **Event Discovery**: Browse and search events with smart filters
- **Smart Recommendations**: AI-powered suggestions based on preferences
- **Booking System**: Complete event booking flow with add-ons
- **Gig Marketplace**: Find freelance opportunities
- **Profile Management**: User preferences and booking history

### 🏪 SME & Side Hustlers Dashboard
- **Demand Forecasting**: Interactive charts showing predicted demand patterns
- **Smart Alerts**: Real-time notifications for business opportunities
- **AI Campaign Studio**: 
  - Text generator for marketing campaigns
  - Poster generator with mock AI-generated designs
- **Delivery & Logistics**: 
  - **🗺️ Real Google Maps Integration** with interactive delivery routes
  - Live delivery tracking with customer information
  - AI-powered hot spot recommendations
  - Route optimization with turn-by-turn directions
  - Performance metrics and ETA calculations
- **Freelancer Marketplace**: Hire staff for events and operations

### 🎪 Event Organizer Dashboard
- **Event Management**: Create and manage events
- **Vendor Matching**: AI-suggested vendors based on event requirements
- **Smart City Integration**: 
  - Interactive city infrastructure map
  - Real-time resource monitoring
  - Parking, transport, and sanitation overlays
- **Ripple Effect Dashboard**: 
  - Economic impact analysis
  - Sector-wise impact visualization
  - Predictive insights and recommendations

## 🛠️ Tech Stack

- **Frontend Framework**: React 19.1.1
- **Routing**: React Router DOM
- **Styling**: TailwindCSS with custom design system
- **Icons**: Lucide React
- **Charts**: Recharts
- **Maps**: Google Maps JavaScript API (@googlemaps/js-api-loader)
- **Build Tool**: Vite
- **AI Integration**: Google Gemini API (for campaign generation)

## 🎨 Design System

### Color Palette
- **Primary**: Teal (50-900) - Main brand color
- **Secondary**: Indigo (50-900) - Accent and interactive elements
- **Accent**: Sky Blue (50-900) - Highlights and call-to-actions

### Components
- **Cards**: Reusable card components for events, freelancers, SMEs, and jobs
- **Charts**: Demand forecasting, ripple effects, and traffic analysis
- **Layout**: Responsive dashboard layout with collapsible sidebar
- **Buttons**: Primary, secondary, and outline button variants

## 📱 Responsive Design

- **Mobile**: Collapsible sidebar, stacked cards, scrollable charts
- **Tablet**: Optimized grid layouts, touch-friendly interactions
- **Desktop**: Full sidebar navigation, multi-column layouts

## 🗂️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Cards.jsx       # Event, Freelancer, SME, Job cards
│   ├── Charts.jsx      # Chart components and metrics
│   └── DashboardLayout.jsx  # Main layout component
├── context/            # React context providers
│   └── AuthContext.jsx # Authentication state management
├── data/              # Mock data for demo
│   └── mockData.js    # Events, freelancers, SMEs, etc.
├── pages/             # Main page components
│   ├── LandingPage.jsx
│   ├── FreelancerDashboard.jsx
│   ├── SMEDashboard.jsx
│   └── EventOrganizerDashboard.jsx
└── assets/            # Static assets
```

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/jocelyngan2005/CyberLink.git
   cd CyberLink
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up API keys (optional)**
   ```bash
   cp .env.example .env
   # Add your Google Maps API key for real map functionality
   # See GOOGLE_MAPS_SETUP.md for detailed setup instructions
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   Navigate to `http://localhost:5173` (or the port shown in terminal)

## 🗺️ Google Maps Setup

For the **Delivery & Logistics** feature to work with real Google Maps:

1. **Follow the detailed setup guide**: [GOOGLE_MAPS_SETUP.md](./GOOGLE_MAPS_SETUP.md)
2. **Get a Google Maps API key** from Google Cloud Console
3. **Add the key to your `.env` file** as `VITE_GOOGLE_MAPS_API_KEY`
4. **Enable required APIs**: Maps JavaScript API, Directions API

Without the API key, the map will show a helpful error message with setup instructions.

## 🎮 Demo Features

### Mock Data & AI Features
- **Demand Forecasting**: Simulated traffic, weather, and event data
- **AI Campaign Generation**: Pre-filled marketing content examples
- **AI Poster Design**: Static generated poster placeholders
- **Smart Recommendations**: Hardcoded intelligent suggestions
- **Ripple Effect Analysis**: Mock economic and traffic impact data

### Interactive Elements
- **Booking Flow**: Complete 3-step event booking process
- **Route Optimization**: Interactive delivery route planning
- **City Infrastructure**: Live map with parking, transport overlays
- **Vendor Matching**: AI-suggested business partnerships

## 📊 Key Mockups

### Dashboard Metrics
- Revenue tracking and growth indicators
- Customer ratings and satisfaction scores
- Resource utilization and optimization
- Environmental impact measurements

### Smart City Integration
- Real-time infrastructure status
- Traffic and parking availability
- Public transport scheduling
- Emergency and sanitation services

## 🔮 Future Enhancements

- **Backend Integration**: Connect to real APIs and databases
- **Real AI Integration**: OpenAI, Gemini, or other AI services
- **Payment Processing**: Stripe or similar payment gateways
- **Real-time Notifications**: WebSocket implementations
- **Mobile App**: React Native version
- **Advanced Analytics**: Machine learning models

## 📈 Performance Highlights

- **Fast Loading**: Vite for optimized builds
- **Responsive**: Mobile-first design approach
- **Accessible**: WCAG compliant components
- **SEO Ready**: Semantic HTML structure

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👏 Acknowledgments

- **Unsplash**: High-quality images for mockups
- **Lucide**: Beautiful icon library
- **TailwindCSS**: Utility-first CSS framework
- **Recharts**: Composable charting library

---

**Built with ❤️ for Smart Cities and Community Empowerment**+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
