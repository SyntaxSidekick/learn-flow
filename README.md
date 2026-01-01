# 🚀 LearnFlow - Personalized Learning Platform

LearnFlow is a modern, full-featured learning platform designed specifically for web developers. Built with React, TypeScript, and Material UI, it provides personalized learning paths, progress tracking, interactive assessments, and a beautiful Google-inspired interface.

> **Current Status**: Feature-complete MVP prototype ready for production deployment with authentication and backend integration.

## ✨ Current Features

### 🎯 **Comprehensive Learning Paths**
- **6 Professional Career Paths**: Frontend, Backend, Full-Stack, UI Developer, JavaScript Developer, DevOps
- **Structured Video Curriculum**: 50+ curated YouTube videos with progress tracking
- **Topic-Based Learning**: Dedicated modules for JavaScript, TypeScript, HTML, CSS, React, Node.js
- **Progressive Difficulty**: Beginner to advanced content with clear prerequisites
- **In-App Video Player**: Watch videos without leaving the platform

### 📊 **Advanced Progress Tracking**
- **Video Resume Feature**: Continue watching from where you left off
- **Completion Tracking**: Track progress across all learning paths
- **LocalStorage Persistence**: Save progress automatically (migrating to database)
- **Progress Visualization**: Charts, bars, and stats on your dashboard
- **Streak Tracking**: Maintain daily learning streaks

### 🎓 **Interactive Assessment System**
- **Knowledge Tests**: Multiple-choice assessments for each learning module
- **85% Pass Requirement**: Ensure mastery before advancing
- **Gated Content**: Unlock advanced videos by passing tests
- **Instant Feedback**: See correct answers and explanations
- **Test History**: Track all assessment attempts

### 👤 **User Profile & Settings**
- **Personalized Dashboard**: Quick stats and learning overview
- **Profile Management**: Edit name, bio, location, avatar
- **Settings Tabs**: Personal Info, Preferences, Notifications, Privacy, Learning Goals
- **Avatar Upload**: Custom profile pictures
- **Achievement Showcase**: Display your badges and milestones

### 🎨 **Modern UI/UX**
- **Glassmorphism Design**: Beautiful frosted-glass effects
- **Material UI v7**: Latest Material Design components
- **Fully Responsive**: Optimized for desktop, tablet, and mobile
- **Dark Mode Ready**: Theme system prepared for light/dark modes
- **Smooth Animations**: Delightful micro-interactions

### 🔍 **Smart Search & Discovery**
- **Real-time Search**: Instant results as you type
- **Multi-Filter Support**: Filter by category, difficulty, duration
- **Trending Topics**: See what others are learning
- **Personalized Recommendations**: Content suggestions based on your progress

## 🛠️ Technology Stack

### **Frontend (Current)**
- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe development with full type coverage
- **Material UI v7** - Latest Material Design component library
- **React Router** - Client-side routing and navigation
- **LocalStorage API** - Progress persistence (migrating to database)

### **Upcoming Backend Integration**
- **Firebase/Supabase** - Authentication, database, storage
- **React Query** - Server state management and caching
- **Zustand** - Client-side state management
- **WebSockets** - Real-time progress sync

### **Development Tools**
- **Create React App** - Zero-configuration React setup
- **ESLint & Prettier** - Code quality and formatting
- **TypeScript Compiler** - Static type checking
- **Chrome DevTools** - Performance profiling and debugging

## 🚀 Getting Started

### Prerequisites
```bash
- Node.js 16+ and npm 8+
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Git for version control
```

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/learn-flow.git
cd learn-flow
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm start
```

4. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

### `npm start`
Runs the app in development mode at [http://localhost:3000](http://localhost:3000). The page auto-reloads on edits with live error reporting.

### `npm test`
Launches the test runner in interactive watch mode. See the [testing documentation](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`
Builds the optimized production bundle in the `build/` folder. Minified, hashed filenames, ready for deployment. See the [deployment documentation](https://facebook.github.io/create-react-app/docs/deployment) for more information.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
