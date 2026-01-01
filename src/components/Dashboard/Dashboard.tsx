import React, { useState } from 'react';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery,
  Badge,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Notifications,
  Settings,
  AccountCircle,
} from '@mui/icons-material';
import Sidebar from './Sidebar';
import MainContent from './MainContentSimple';
import TopicLearning from '../Learning/TopicLearning';
import DeveloperPathLearning from '../Learning/DeveloperPathLearning';
import UserProfile from '../Profile/UserProfile';
import SearchBar from '../Search/SearchBar';
import { mockUser } from '../../data/mockData';

const DRAWER_WIDTH = 280;

const Dashboard: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  
  // Navigation state
  const [currentView, setCurrentView] = useState<string>('dashboard');
  const [enrolledTopics, setEnrolledTopics] = useState<string[]>(['javascript']); // Mock: user already enrolled in JS
  const [enrolledPaths, setEnrolledPaths] = useState<string[]>(['frontend-developer']); // Mock: user enrolled in frontend
  const [watchedVideos, setWatchedVideos] = useState<{[topic: string]: string[]}>({
    javascript: ['js-1'], // Mock: user already watched first JS video
  });
  const [completedPathVideos, setCompletedPathVideos] = useState<{[pathId: string]: string[]}>({
    'frontend-developer': ['fe-1'], // Mock: completed first frontend video
  });
  const [passedTests, setPassedTests] = useState<{[pathId: string]: string[]}>({
    'frontend-developer': [], // Mock: no tests passed yet
  });

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  // Navigation handlers
  const handleNavigationChange = (path: string) => {
    setCurrentView(path);
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const handleEnrollInTopic = (topic: string) => {
    setEnrolledTopics(prev => [...prev, topic]);
  };

  const handleEnrollInPath = (pathId: string) => {
    setEnrolledPaths(prev => [...prev, pathId]);
  };

  const handleVideoWatch = (topic: string, videoId: string) => {
    setWatchedVideos(prev => ({
      ...prev,
      [topic]: [...(prev[topic] || []), videoId]
    }));
  };

  const handlePathVideoComplete = (pathId: string, videoId: string) => {
    setCompletedPathVideos(prev => ({
      ...prev,
      [pathId]: [...(prev[pathId] || []), videoId]
    }));
  };

  // Handle test completion in learning paths
  const handleTestComplete = (pathId: string, testId: string, passed: boolean) => {
    if (passed) {
      setPassedTests(prev => ({
        ...prev,
        [pathId]: [...(prev[pathId] || []), testId]
      }));
    }
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
  };

  // Determine what content to show
  const renderMainContent = () => {
    if (currentView === 'profile') {
      return <UserProfile />;
    }
    
    if (currentView.startsWith('/learning/')) {
      const topic = currentView.split('/')[2];
      return (
        <TopicLearning
          topic={topic}
          onEnrollInPath={handleEnrollInTopic}
          isEnrolled={enrolledTopics.includes(topic)}
          watchedVideos={watchedVideos[topic] || []}
          onVideoWatch={(videoId: string) => handleVideoWatch(topic, videoId)}
          onBack={handleBackToDashboard}
        />
      );
    }
    
    if (currentView.startsWith('/paths/')) {
      const pathId = currentView.split('/')[2];
      return (
        <DeveloperPathLearning
          pathId={pathId}
          onEnrollInPath={handleEnrollInPath}
          isEnrolled={enrolledPaths.includes(pathId)}
          completedVideos={completedPathVideos[pathId] || []}
          onVideoComplete={(videoId: string) => handlePathVideoComplete(pathId, videoId)}
          passedTests={passedTests[pathId] || []}
          onTestComplete={(testId: string, passed: boolean) => handleTestComplete(pathId, testId, passed)}
          onBack={handleBackToDashboard}
        />
      );
    }
    
    return <MainContent />;
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      {/* App Bar */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: { lg: `calc(100% - ${DRAWER_WIDTH}px)` },
          ml: { lg: `${DRAWER_WIDTH}px` },
          zIndex: theme.zIndex.drawer + 1,
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
          color: '#1e293b',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ 
                mr: 2, 
                display: { lg: 'none' },
                '&:hover': {
                  backgroundColor: 'rgba(99, 102, 241, 0.1)',
                }
              }}
            >
              <MenuIcon />
            </IconButton>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: 2,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography sx={{ color: 'white', fontWeight: 'bold', fontSize: '1rem' }}>
                  L
                </Typography>
              </Box>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{
                  fontWeight: 600,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  display: { xs: 'none', sm: 'block' },
                }}
              >
                LearnFlow
              </Typography>
            </Box>
          </Box>

          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1,
            flex: 1,
            maxWidth: 500,
            mx: 3 
          }}>
            <SearchBar />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton 
              color="inherit"
              sx={{
                '&:hover': {
                  backgroundColor: 'rgba(99, 102, 241, 0.1)',
                }
              }}
            >
              <Badge badgeContent={3} color="error">
                <Notifications />
              </Badge>
            </IconButton>

            <IconButton 
              color="inherit"
              sx={{
                '&:hover': {
                  backgroundColor: 'rgba(99, 102, 241, 0.1)',
                }
              }}
            >
              <Settings />
            </IconButton>
            
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
              sx={{
                '&:hover': {
                  backgroundColor: 'rgba(99, 102, 241, 0.1)',
                }
              }}
            >
              <Avatar
                src={mockUser.avatar}
                alt={mockUser.name}
                sx={{ 
                  width: 36, 
                  height: 36,
                  border: '2px solid rgba(99, 102, 241, 0.2)',
                }}
              />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Profile Menu */}
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleProfileMenuClose}
        PaperProps={{
          elevation: 0,
          sx: {
            mt: 1,
            minWidth: 200,
            borderRadius: 3,
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          },
        }}
      >
        <Box sx={{ px: 2, py: 1.5, borderBottom: '1px solid rgba(0, 0, 0, 0.08)' }}>
          <Typography variant="subtitle2" fontWeight={600}>
            {mockUser.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {mockUser.email}
          </Typography>
        </Box>
        <MenuItem 
          onClick={() => {
            handleNavigationChange('profile');
            handleProfileMenuClose();
          }}
          sx={{ 
            py: 1.5,
            '&:hover': {
              backgroundColor: 'rgba(99, 102, 241, 0.1)',
            }
          }}
        >
          <AccountCircle sx={{ mr: 2, color: 'text.secondary' }} />
          Profile
        </MenuItem>
        <MenuItem 
          onClick={handleProfileMenuClose}
          sx={{ 
            py: 1.5,
            '&:hover': {
              backgroundColor: 'rgba(99, 102, 241, 0.1)',
            }
          }}
        >
          <Settings sx={{ mr: 2, color: 'text.secondary' }} />
          Settings
        </MenuItem>
        <MenuItem 
          onClick={handleProfileMenuClose}
          sx={{ 
            py: 1.5,
            color: 'error.main',
            '&:hover': {
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
            }
          }}
        >
          Logout
        </MenuItem>
      </Menu>

      {/* Sidebar */}
      <Box
        component="nav"
        sx={{ width: { lg: DRAWER_WIDTH }, flexShrink: { lg: 0 } }}
        aria-label="navigation"
      >
        <Drawer
          variant={isMobile ? 'temporary' : 'permanent'}
          open={isMobile ? mobileOpen : true}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: DRAWER_WIDTH,
              borderRight: 'none',
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              mt: { lg: '64px' }, // Account for AppBar height
              boxShadow: '8px 0 32px rgba(0, 0, 0, 0.05)',
            },
          }}
        >
          <Sidebar onNavigate={handleNavigationChange} currentPath={currentView} />
        </Drawer>
      </Box>

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { lg: `calc(100% - ${DRAWER_WIDTH}px)` },
          mt: '64px', // Account for AppBar height
          backgroundColor: '#f8fafc',
          minHeight: 'calc(100vh - 64px)',
        }}
      >
        {renderMainContent()}
      </Box>
    </Box>
  );
};

export default Dashboard;