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
import ThemeToggle from '../ThemeToggle';
import { mockUser } from '../../data/mockData';

const DRAWER_WIDTH = 240;

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
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* App Bar - Full Width */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: '100%',
          zIndex: theme.zIndex.drawer + 1,
          bgcolor: 'background.paper',
          backdropFilter: 'blur(20px)',
          borderBottom: 1,
          borderColor: 'divider',
          color: 'text.primary',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', py: 1.5, minHeight: { xs: 64, sm: 70 } }}>
          {/* Left Section: Menu Toggle + Branding */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ 
                display: { lg: 'none' },
                '&:hover': {
                  bgcolor: 'action.hover',
                }
              }}
            >
              <MenuIcon />
            </IconButton>
            
            {/* LearnFlow Branding - Always Visible */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 2.5,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: 2,
                }}
              >
                <Typography sx={{ color: 'white', fontWeight: 700, fontSize: '1.2rem', letterSpacing: '-0.5px' }}>
                  L
                </Typography>
              </Box>
              <Box>
                <Typography
                  variant="h6"
                  noWrap
                  sx={{
                    fontWeight: 700,
                    fontSize: '1.3rem',
                    letterSpacing: '-0.5px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    lineHeight: 1,
                  }}
                >
                  LearnFlow
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: 'text.secondary',
                    fontSize: '0.7rem',
                    fontWeight: 500,
                    letterSpacing: '0.5px',
                    textTransform: 'uppercase',
                    display: { xs: 'none', sm: 'block' }
                  }}
                >
                  Learning Platform
                </Typography>
              </Box>
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

          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1 } }}>
            <ThemeToggle />
            
            <IconButton 
              color="inherit"
              sx={{
                borderRadius: 2,
                transition: 'all 0.2s',
                '&:hover': {
                  bgcolor: 'action.hover',
                  transform: 'translateY(-1px)',
                }
              }}
            >
              <Badge 
                badgeContent={3} 
                color="error"
                sx={{
                  '& .MuiBadge-badge': {
                    fontSize: '0.65rem',
                    height: 18,
                    minWidth: 18,
                    fontWeight: 600,
                  }
                }}
              >
                <Notifications sx={{ fontSize: { xs: 22, sm: 24 } }} />
              </Badge>
            </IconButton>

            <IconButton 
              color="inherit"
              sx={{
                borderRadius: 2,
                transition: 'all 0.2s',
                '&:hover': {
                  bgcolor: 'action.hover',
                  transform: 'translateY(-1px)',
                }
              }}
            >
              <Settings sx={{ fontSize: { xs: 22, sm: 24 } }} />
            </IconButton>
            
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
              sx={{
                p: 0.5,
                ml: 1,
                borderRadius: 2,
                transition: 'all 0.2s',
                '&:hover': {
                  bgcolor: 'action.hover',
                  transform: 'scale(1.05)',
                }
              }}
            >
              <Avatar
                src={mockUser.avatar}
                alt={mockUser.name}
                sx={{ 
                  width: { xs: 36, sm: 40 }, 
                  height: { xs: 36, sm: 40 },
                  border: 2,
                  borderColor: 'primary.light',
                  transition: 'all 0.2s',
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
            bgcolor: 'background.paper',
            backdropFilter: 'blur(20px)',
            border: 1,
            borderColor: 'divider',
          },
        }}
      >
        <Box sx={{ px: 2, py: 1.5, borderBottom: 1, borderColor: 'divider' }}>
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
              bgcolor: 'action.hover',
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
              bgcolor: 'action.hover',
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
              backgroundColor: 'error.light',
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
              border: 1,
              borderColor: 'divider',
              bgcolor: 'background.paper',
              mt: { lg: '70px' },
              height: { lg: 'calc(100vh - 70px)' },
              boxShadow: { xs: 2, lg: 'none' },
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
          ml: { lg: '40px' },
          mt: { xs: '64px', sm: '70px' },
          bgcolor: 'background.default',
          minHeight: { xs: 'calc(100vh - 64px)', sm: 'calc(100vh - 70px)' },
        }}
      >
        {renderMainContent()}
      </Box>
    </Box>
  );
};

export default Dashboard;