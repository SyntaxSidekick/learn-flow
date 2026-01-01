import React from 'react';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Typography,
  Chip,
  Collapse,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  School as SchoolIcon,
  TrendingUp as TrendingUpIcon,
  BookmarksOutlined as BookmarksIcon,
  Search as SearchIcon,
  Settings as SettingsIcon,
  EmojiEvents as AchievementsIcon,
  Analytics as AnalyticsIcon,
  MenuBook as LearningIcon,
  AccountCircle as ProfileIcon,
  ExpandLess,
  ExpandMore,
  Code as CodeIcon,
  Language as LanguageIcon,
  Web as WebIcon,
  DataObject as DataIcon,
  Build as BuildIcon,
  Storage as DatabaseIcon,
} from '@mui/icons-material';

interface SidebarSubItem {
  text: string;
  icon: React.ReactNode;
  path: string;
  color?: string;
}

interface SidebarItem {
  text: string;
  icon: React.ReactNode;
  path: string;
  badge?: number;
  expandable?: boolean;
  subItems?: SidebarSubItem[];
}

const mainMenuItems: SidebarItem[] = [
  {
    text: 'Dashboard',
    icon: <DashboardIcon />,
    path: '/dashboard',
  },
  {
    text: 'Learning',
    icon: <LearningIcon />,
    path: '/learning',
    expandable: true,
    subItems: [
      {
        text: 'JavaScript',
        icon: <CodeIcon />,
        path: '/learning/javascript',
        color: '#f7df1e',
      },
      {
        text: 'TypeScript',
        icon: <DataIcon />,
        path: '/learning/typescript',
        color: '#3178c6',
      },
      {
        text: 'HTML',
        icon: <LanguageIcon />,
        path: '/learning/html',
        color: '#e34f26',
      },
      {
        text: 'CSS',
        icon: <WebIcon />,
        path: '/learning/css',
        color: '#1572b6',
      },
      {
        text: 'React',
        icon: <BuildIcon />,
        path: '/learning/react',
        color: '#61dafb',
      },
      {
        text: 'Node.js',
        icon: <DatabaseIcon />,
        path: '/learning/nodejs',
        color: '#339933',
      },
    ],
  },
  {
    text: 'Learning Paths',
    icon: <SchoolIcon />,
    path: '/paths',
    expandable: true,
    subItems: [
      {
        text: 'Frontend Developer',
        icon: <WebIcon />,
        path: '/paths/frontend-developer',
        color: '#e91e63',
      },
      {
        text: 'Backend Developer',
        icon: <DatabaseIcon />,
        path: '/paths/backend-developer',
        color: '#4caf50',
      },
      {
        text: 'Full Stack Developer',
        icon: <BuildIcon />,
        path: '/paths/fullstack-developer',
        color: '#9c27b0',
      },
      {
        text: 'UI Developer',
        icon: <LanguageIcon />,
        path: '/paths/ui-developer',
        color: '#ff9800',
      },
      {
        text: 'JavaScript Developer',
        icon: <CodeIcon />,
        path: '/paths/javascript-developer',
        color: '#f7df1e',
      },
      {
        text: 'DevOps Engineer',
        icon: <DataIcon />,
        path: '/paths/devops-engineer',
        color: '#2196f3',
      },
    ],
  },
  {
    text: 'Progress',
    icon: <TrendingUpIcon />,
    path: '/progress',
  },
  {
    text: 'Saved Resources',
    icon: <BookmarksIcon />,
    path: '/saved',
    badge: 12,
  },
  {
    text: 'Explore',
    icon: <SearchIcon />,
    path: '/explore',
  },
];

const secondaryMenuItems: SidebarItem[] = [
  {
    text: 'Profile',
    icon: <ProfileIcon />,
    path: 'profile',
  },
  {
    text: 'Achievements',
    icon: <AchievementsIcon />,
    path: '/achievements',
    badge: 2,
  },
  {
    text: 'Analytics',
    icon: <AnalyticsIcon />,
    path: '/analytics',
  },
  {
    text: 'Settings',
    icon: <SettingsIcon />,
    path: '/settings',
  },
];

const Sidebar: React.FC<{
  onNavigate?: (path: string) => void;
  currentPath?: string;
}> = ({ onNavigate, currentPath = '/dashboard' }) => {
  const [selectedItem, setSelectedItem] = React.useState(currentPath);
  const [expandedItems, setExpandedItems] = React.useState<string[]>([]);

  // Update selected item when currentPath changes
  React.useEffect(() => {
    setSelectedItem(currentPath);
  }, [currentPath]);

  const handleItemClick = (path: string) => {
    setSelectedItem(path);
    if (onNavigate) {
      onNavigate(path);
    }
  };

  const handleExpandClick = (itemText: string) => {
    setExpandedItems(prev => 
      prev.includes(itemText) 
        ? prev.filter(item => item !== itemText)
        : [...prev, itemText]
    );
  };

  const renderMenuItems = (items: SidebarItem[]) => {
    return items.map((item) => (
      <React.Fragment key={item.text}>
        <ListItem disablePadding>
          <ListItemButton
            selected={selectedItem === item.path}
            onClick={() => {
              if (item.expandable) {
                handleExpandClick(item.text);
              } else {
                handleItemClick(item.path);
              }
            }}
            sx={{
              borderRadius: 3,
              mx: 2,
              my: 0.5,
              transition: 'all 0.2s ease-in-out',
              '&.Mui-selected': {
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)',
                  transform: 'translateY(-1px)',
                  boxShadow: '0 6px 16px rgba(102, 126, 234, 0.5)',
                },
                '& .MuiListItemIcon-root': {
                  color: 'white',
                },
              },
              '&:hover': {
                backgroundColor: 'rgba(102, 126, 234, 0.08)',
                transform: 'translateX(4px)',
              },
            }}
          >
            <ListItemIcon
              sx={{
                color: selectedItem === item.path ? 'white' : 'text.secondary',
                minWidth: 40,
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.text}
              primaryTypographyProps={{
                fontWeight: selectedItem === item.path ? 600 : 400,
                fontSize: '0.875rem',
              }}
            />
            {item.badge && (
              <Chip
                label={item.badge}
                size="small"
                sx={{
                  backgroundColor: selectedItem === item.path ? 'rgba(255,255,255,0.2)' : 'primary.main',
                  color: selectedItem === item.path ? 'white' : 'white',
                  fontWeight: 600,
                  height: 20,
                  fontSize: '0.75rem',
                  mr: item.expandable ? 1 : 0,
                }}
              />
            )}
            {item.expandable && (
              expandedItems.includes(item.text) ? <ExpandLess /> : <ExpandMore />
            )}
          </ListItemButton>
        </ListItem>

        {/* Sub-items for expandable items */}
        {item.expandable && item.subItems && (
          <Collapse in={expandedItems.includes(item.text)} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.subItems.map((subItem) => (
                <ListItem key={subItem.text} disablePadding>
                  <ListItemButton
                    selected={selectedItem === subItem.path}
                    onClick={() => handleItemClick(subItem.path)}
                    sx={{
                      borderRadius: 2,
                      mx: 2,
                      my: 0.25,
                      pl: 4,
                      '&.Mui-selected': {
                        backgroundColor: 'primary.main',
                        color: 'white',
                        '&:hover': {
                          backgroundColor: 'primary.dark',
                        },
                        '& .MuiListItemIcon-root': {
                          color: 'white',
                        },
                      },
                      '&:hover': {
                        backgroundColor: 'action.hover',
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color: selectedItem === subItem.path ? 'white' : subItem.color || 'text.secondary',
                        minWidth: 32,
                      }}
                    >
                      {subItem.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={subItem.text}
                      primaryTypographyProps={{
                        fontWeight: selectedItem === subItem.path ? 600 : 400,
                        fontSize: '0.8rem',
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Collapse>
        )}
      </React.Fragment>
    ));
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Logo/Brand Section */}
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '1rem',
          }}
        >
          LF
        </Box>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          LearnFlow
        </Typography>
      </Box>

      <Divider sx={{ mx: 2 }} />

      {/* Main Navigation */}
      <Box sx={{ flex: 1, py: 1 }}>
        <Typography
          variant="overline"
          sx={{
            px: 3,
            py: 1,
            display: 'block',
            color: 'text.secondary',
            fontWeight: 600,
            fontSize: '0.75rem',
          }}
        >
          MAIN
        </Typography>
        <List dense>{renderMenuItems(mainMenuItems)}</List>

        <Typography
          variant="overline"
          sx={{
            px: 3,
            py: 1,
            mt: 2,
            display: 'block',
            color: 'text.secondary',
            fontWeight: 600,
            fontSize: '0.75rem',
          }}
        >
          INSIGHTS
        </Typography>
        <List dense>{renderMenuItems(secondaryMenuItems)}</List>
      </Box>

      {/* Quick Stats */}
      <Box sx={{ p: 2, mt: 'auto' }}>
        <Box
          sx={{
            backgroundColor: 'primary.main',
            borderRadius: 2,
            p: 2,
            color: 'white',
            textAlign: 'center',
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 600, mb: 0.5 }}>
            7
          </Typography>
          <Typography variant="caption" sx={{ opacity: 0.9 }}>
            Day Streak 🔥
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;