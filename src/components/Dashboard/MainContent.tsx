import React from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  LinearProgress,
  Chip,
  Avatar,
  Button,
  IconButton,
} from '@mui/material';
import {
  TrendingUp,
  School,
  EmojiEvents,
  AccessTime,
  PlayArrow,
  BookmarkBorder,
} from '@mui/icons-material';
import { mockUser, mockLearningPaths, mockDashboardStats, mockWeeklyProgress } from '../../data/mockData';

const StatCard: React.FC<{
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  change?: string;
}> = ({ title, value, icon, color, change }) => (
  <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box>
          <Typography color="text.secondary" gutterBottom variant="body2">
            {title}
          </Typography>
          <Typography variant="h4" component="div" sx={{ fontWeight: 600, color }}>
            {value}
          </Typography>
          {change && (
            <Typography variant="caption" sx={{ color: 'success.main' }}>
              {change}
            </Typography>
          )}
        </Box>
        <Avatar sx={{ bgcolor: color, width: 56, height: 56 }}>
          {icon}
        </Avatar>
      </Box>
    </CardContent>
  </Card>
);

const LearningPathCard: React.FC<{ path: any }> = ({ path }) => (
  <Card
    elevation={0}
    sx={{
      border: '1px solid',
      borderColor: 'divider',
      '&:hover': {
        boxShadow: 2,
      },
    }}
  >
    <CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            {path.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {path.description}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <Chip
              label={path.difficulty}
              size="small"
              color={
                path.difficulty === 'beginner' ? 'success' :
                path.difficulty === 'intermediate' ? 'warning' : 'error'
              }
            />
            <Chip
              label={`${path.estimatedHours}h`}
              size="small"
              variant="outlined"
              icon={<AccessTime />}
            />
            <Chip
              label={`${path.rating} ⭐`}
              size="small"
              variant="outlined"
            />
          </Box>
        </Box>
        <IconButton size="small">
          <BookmarkBorder />
        </IconButton>
      </Box>
      
      <Box sx={{ mb: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Progress
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {path.progress}%
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={path.progress}
          sx={{ height: 6, borderRadius: 3 }}
        />
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', gap: 1 }}>
          {path.tags.slice(0, 2).map((tag: string) => (
            <Chip key={tag} label={tag} size="small" variant="outlined" />
          ))}
        </Box>
        <Button
          variant="contained"
          size="small"
          startIcon={<PlayArrow />}
          sx={{ borderRadius: 3 }}
        >
          {path.progress > 0 ? 'Continue' : 'Start'}
        </Button>
      </Box>
    </CardContent>
  </Card>
);

const MainContent: React.FC = () => {
  const { progress } = mockUser;
  const stats = mockDashboardStats;

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      {/* Welcome Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
          Welcome back, {mockUser.name.split(' ')[0]}! 👋
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Ready to continue your learning journey? You're doing great!
        </Typography>
      </Box>

      {/* Stats Overview */}
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: { 
          xs: '1fr', 
          sm: '1fr 1fr', 
          md: '1fr 1fr 1fr 1fr' 
        }, 
        gap: 3, 
        mb: 4 
      }}>
        <StatCard
          title="Learning Paths"
          value={stats.completedPaths + '/' + stats.totalLearningPaths}
          icon={<School />}
          color="#1976d2"
          change="+2 this week"
        />
        <StatCard
          title="Hours Learned"
          value={stats.hoursLearned}
          icon={<AccessTime />}
          color="#4caf50"
          change="+8 this week"
        />
        <StatCard
          title="Current Streak"
          value={`${stats.currentStreak} days`}
          icon={<TrendingUp />}
          color="#ff9800"
        />
        <StatCard
          title="Achievements"
          value={mockUser.achievements.length}
          icon={<EmojiEvents />}
          color="#9c27b0"
          change="+2 new"
        />
      </Box>

      {/* Weekly Progress */}
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, 
        gap: 3, 
        mb: 4 
      }}>
        <Paper elevation={0} sx={{ p: 3, border: '1px solid', borderColor: 'divider' }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            Weekly Progress
          </Typography>
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" color="text.secondary">
                {progress.weeklyProgress} / {progress.weeklyGoal} hours
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {Math.round((progress.weeklyProgress / progress.weeklyGoal) * 100)}%
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={(progress.weeklyProgress / progress.weeklyGoal) * 100}
              sx={{ height: 8, borderRadius: 4 }}
            />
          </Box>
          <Box sx={{ display: 'flex', gap: 1, mt: 3 }}>
            {mockWeeklyProgress.map((day, index) => (
              <Box key={day.day} sx={{ flex: 1, textAlign: 'center' }}>
                <Box
                  sx={{
                    height: 40,
                    backgroundColor: day.hours > 0 ? 'primary.main' : 'grey.200',
                    borderRadius: 1,
                    mb: 1,
                    display: 'flex',
                    alignItems: 'end',
                    justifyContent: 'center',
                    position: 'relative',
                  }}
                >
                  <Box
                    sx={{
                      height: `${(day.hours / 4) * 100}%`,
                      backgroundColor: day.hours > 0 ? 'primary.main' : 'grey.200',
                      width: '100%',
                      borderRadius: 1,
                    }}
                  />
                </Box>
                <Typography variant="caption" color="text.secondary">
                  {day.day}
                </Typography>
              </Box>
            ))}
          </Box>
        </Paper>
        <Paper elevation={0} sx={{ p: 3, border: '1px solid', borderColor: 'divider' }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            Recent Achievements
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {mockUser.achievements.slice(0, 3).map((achievement) => (
              <Box key={achievement.id} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant="h4">{achievement.icon}</Typography>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    {achievement.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {achievement.description}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Paper>
      </Box>

      {/* Continue Learning */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
          Continue Learning
        </Typography>
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { 
            xs: '1fr', 
            md: '1fr 1fr', 
            lg: '1fr 1fr 1fr' 
          }, 
          gap: 3 
        }}>
          {mockLearningPaths.filter(path => path.enrolled && path.progress > 0).map((path) => (
            <LearningPathCard key={path.id} path={path} />
          ))}
        </Box>
      </Box>

      {/* Recommended Paths */}
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
          Recommended for You
        </Typography>
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { 
            xs: '1fr', 
            md: '1fr 1fr', 
            lg: '1fr 1fr 1fr' 
          }, 
          gap: 3 
        }}>
          {mockLearningPaths.filter(path => !path.enrolled).map((path) => (
            <LearningPathCard key={path.id} path={path} />
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default MainContent;