import React from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Avatar,
  Button,
  useTheme,
} from '@mui/material';
import {
  TrendingUp,
  School,
  EmojiEvents,
  AccessTime,
} from '@mui/icons-material';
import { mockUser, mockDashboardStats, mockLearningPaths, mockResources, mockSkillProgress } from '../../data/mockData';
import LearningPathCard from '../LearningPath/LearningPathCard';
import ResourceCard from '../Resources/ResourceCard';
import SkillProgress from '../Progress/SkillProgress';
import AchievementsDisplay from '../Progress/AchievementsDisplay';

const StatCard: React.FC<{
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: 'primary' | 'success' | 'warning' | 'secondary' | 'error' | 'info';
  subtitle?: string;
}> = ({ title, value, icon, color, subtitle }) => {
  const theme = useTheme();
  const colorValue = theme.palette[color].main;
  
  return (
  <Card 
    sx={{ 
      position: 'relative',
      overflow: 'hidden',
      bgcolor: 'background.paper',
      backdropFilter: 'blur(20px)',
      border: 1,
      borderColor: 'divider',
      borderRadius: 4,
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      '&:hover': {
        transform: 'translateY(-8px)',
        boxShadow: 3,
      },
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 4,
        bgcolor: `${color}.main`,
      }
    }}
  >
    <CardContent sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <Box sx={{ flex: 1 }}>
          <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{ fontWeight: 500, mb: 1, textTransform: 'uppercase', letterSpacing: '0.5px' }}
          >
            {title}
          </Typography>
          <Typography 
            variant="h3" 
            sx={{ 
              fontWeight: 700, 
              color: 'text.primary',
              lineHeight: 1.2,
              mb: subtitle ? 0.5 : 0
            }}
          >
            {value}
          </Typography>
          {subtitle && (
            <Typography variant="caption" color="text.secondary">
              {subtitle}
            </Typography>
          )}
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 56,
            height: 56,
            borderRadius: '14px',
            bgcolor: `${color}.main`,
            color: `${color}.contrastText`,
            boxShadow: 2,
            ml: 2,
          }}
        >
          {icon}
        </Box>
      </Box>
    </CardContent>
  </Card>
  );
};

const MainContent: React.FC = () => {
  const stats = mockDashboardStats;

  return (
    <Box sx={{ p: 4, bgcolor: 'background.default', minHeight: '100vh' }}>
      <Container maxWidth="xl">
        {/* Welcome Header */}
        <Box sx={{ mb: 8 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
            <Avatar 
              sx={{ 
                width: 80, 
                height: 80, 
                mr: 4,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                fontSize: '32px',
                fontWeight: 700,
                boxShadow: 3,
                border: 4,
                borderColor: 'background.paper',
              }}
            >
              {mockUser.name.charAt(0)}
            </Avatar>
            <Box>
              <Typography 
                variant="h2" 
                fontWeight="800" 
                sx={{ 
                  mb: 1,
                  color: 'text.primary',
                }}
              >
                Welcome back, {mockUser.name.split(' ')[0]}! 👋
              </Typography>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 500,
                  color: 'text.secondary',
                  letterSpacing: '0.5px',
                }}
              >
                Ready to continue your learning journey? Let's achieve your goals today.
              </Typography>
            </Box>
          </Box>
        </Box>

      {/* Dashboard Stats Grid */}
      <Box sx={{ mb: 6 }}>
        <Typography 
          variant="h4" 
          fontWeight="bold" 
          sx={{ mb: 4, display: 'flex', alignItems: 'center' }}
        >
          <TrendingUp sx={{ mr: 2, color: 'primary.main', fontSize: 32 }} />
          Your Progress Overview
        </Typography>
        
        <Box 
          sx={{ 
            display: 'grid',
            gridTemplateColumns: { 
              xs: '1fr', 
              sm: 'repeat(2, 1fr)', 
              lg: 'repeat(4, 1fr)' 
            },
            gap: 3,
            mb: 2
          }}
        >
          <StatCard
            title="Learning Paths"
            value={`${stats.completedPaths}/${stats.totalLearningPaths}`}
            icon={<School />}
            color="primary"
            subtitle="Completed / Total"
          />
          <StatCard
            title="Hours Learned"
            value={stats.hoursLearned}
            icon={<AccessTime />}
            color="success"
            subtitle="This month"
          />
          <StatCard
            title="Current Streak"
            value={`${stats.currentStreak} days`}
            icon={<TrendingUp />}
            color="warning"
            subtitle="Keep it up!"
          />
          <StatCard
            title="Achievements"
            value={mockUser.achievements.length}
            icon={<EmojiEvents />}
            color="secondary"
            subtitle="Unlocked"
          />
        </Box>
      </Box>

      {/* Skills & Achievements Dashboard */}
      <Box sx={{ mb: 6 }}>
        <Typography 
          variant="h4" 
          fontWeight="bold" 
          sx={{ mb: 4 }}
        >
          🎯 Skills & Achievements
        </Typography>
        
        <Box 
          sx={{ 
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' },
            gap: 4
          }}
        >
          {/* Skills Progress Card */}
          <Card 
            sx={{ 
              borderRadius: '20px', 
              border: 1, 
              borderColor: 'divider',
              bgcolor: 'background.paper',
              overflow: 'hidden'
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
                🚀 Skill Development
              </Typography>
              <SkillProgress skills={mockSkillProgress} />
            </CardContent>
          </Card>

          {/* Achievements Card */}
          <Card 
            sx={{ 
              borderRadius: '20px', 
              border: 1, 
              borderColor: 'divider',
              bgcolor: 'background.paper',
              overflow: 'hidden'
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
                🏆 Recent Achievements
              </Typography>
              <AchievementsDisplay achievements={mockUser.achievements} />
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* Continue Learning Section */}
      <Box sx={{ mb: 6 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
          <Typography variant="h4" fontWeight="bold">
            📚 Continue Learning
          </Typography>
          <Button 
            variant="outlined" 
            size="large"
            sx={{ 
              borderRadius: '25px',
              textTransform: 'none',
              fontWeight: 600,
              px: 4,
              py: 1.5
            }}
          >
            View All Paths
          </Button>
        </Box>
        
        <Box 
          sx={{ 
            display: 'grid',
            gridTemplateColumns: { 
              xs: '1fr', 
              md: 'repeat(2, 1fr)'
            },
            gap: 3
          }}
        >
          {mockLearningPaths.filter(path => path.enrolled).slice(0, 2).map((path) => (
            <LearningPathCard
              key={path.id}
              path={path}
              onEnroll={() => console.log('Enroll')}
              onContinue={() => console.log('Continue')}
              onBookmark={() => console.log('Bookmark')}
            />
          ))}
        </Box>
      </Box>

      {/* Featured Resources Section */}
      <Box sx={{ mb: 6 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
          <Typography variant="h4" fontWeight="bold">
            💡 Featured Resources
          </Typography>
          <Button 
            variant="outlined" 
            size="large"
            sx={{ 
              borderRadius: '25px',
              textTransform: 'none',
              fontWeight: 600,
              px: 4,
              py: 1.5
            }}
          >
            Explore More
          </Button>
        </Box>
        
        <Box 
          sx={{ 
            display: 'grid',
            gridTemplateColumns: { 
              xs: '1fr', 
              sm: 'repeat(2, 1fr)', 
              lg: 'repeat(3, 1fr)' 
            },
            gap: 3
          }}
        >
          {mockResources.slice(0, 6).map((resource) => (
            <ResourceCard
              key={resource.id}
              resource={resource}
              onBookmark={() => console.log('Bookmark')}
              onOpen={() => console.log('Open')}
            />
          ))}
        </Box>
      </Box>

      {/* Call to Action */}
      <Box 
        sx={{ 
          textAlign: 'center',
          py: 6,
          bgcolor: 'action.hover',
          borderRadius: '24px',
          border: 1,
          borderColor: 'divider'
        }}
      >
        <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>
          Ready to level up? 🚀
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}>
          Discover new learning paths and expand your skills with our curated content library.
        </Typography>
        <Button 
          variant="contained" 
          size="large"
          sx={{ 
            borderRadius: '30px',
            textTransform: 'none',
            fontWeight: 600,
            px: 6,
            py: 2,
            fontSize: '1.1rem'
          }}
        >
          Explore All Learning Paths
        </Button>
      </Box>
      </Container>
    </Box>
  );
};

export default MainContent;