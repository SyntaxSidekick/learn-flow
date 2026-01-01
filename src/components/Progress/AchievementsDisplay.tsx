import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Stack,
  Tooltip,
  LinearProgress,
} from '@mui/material';
import {
  EmojiEvents,
  Lock,
} from '@mui/icons-material';
import { Achievement } from '../../types';

interface AchievementsDisplayProps {
  achievements: Achievement[];
  unlockedCount?: number;
  totalCount?: number;
}

const AchievementCard: React.FC<{ 
  achievement: Achievement; 
  isLocked?: boolean;
  progress?: number;
}> = ({ achievement, isLocked = false, progress }) => {
  return (
    <Tooltip
      title={
        <Box>
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            {achievement.title}
          </Typography>
          <Typography variant="caption" sx={{ display: 'block', mb: 1 }}>
            {achievement.description}
          </Typography>
          {achievement.unlockedAt && (
            <Typography variant="caption" color="text.secondary">
              Unlocked on {new Date(achievement.unlockedAt).toLocaleDateString()}
            </Typography>
          )}
          {isLocked && progress !== undefined && (
            <Typography variant="caption" color="text.secondary">
              Progress: {progress}%
            </Typography>
          )}
        </Box>
      }
      placement="top"
    >
      <Card
        elevation={0}
        sx={{
          border: '1px solid',
          borderColor: isLocked ? 'grey.300' : 'primary.main',
          borderRadius: 2,
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: isLocked ? 1 : 3,
          },
          cursor: 'pointer',
          background: isLocked 
            ? 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)'
            : 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
          color: isLocked ? 'text.secondary' : 'white',
        }}
      >
        <CardContent sx={{ p: 2, textAlign: 'center', '&:last-child': { pb: 2 } }}>
          <Box sx={{ mb: 1 }}>
            {isLocked ? (
              <Lock sx={{ fontSize: '2rem', color: 'grey.500' }} />
            ) : (
              <Typography variant="h3" sx={{ fontSize: '2rem' }}>
                {achievement.icon}
              </Typography>
            )}
          </Box>
          
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 600,
              fontSize: '0.75rem',
              lineHeight: 1.2,
              color: isLocked ? 'text.secondary' : 'white',
            }}
          >
            {achievement.title}
          </Typography>

          <Chip
            label={achievement.category}
            size="small"
            sx={{
              mt: 1,
              height: 20,
              fontSize: '0.7rem',
              backgroundColor: isLocked ? 'grey.400' : 'rgba(255,255,255,0.2)',
              color: isLocked ? 'white' : 'white',
            }}
          />

          {isLocked && progress !== undefined && (
            <Box sx={{ mt: 1 }}>
              <LinearProgress
                variant="determinate"
                value={progress}
                sx={{
                  height: 4,
                  borderRadius: 2,
                  backgroundColor: 'rgba(255,255,255,0.3)',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: 'primary.main',
                  },
                }}
              />
            </Box>
          )}
        </CardContent>
      </Card>
    </Tooltip>
  );
};

const AchievementsDisplay: React.FC<AchievementsDisplayProps> = ({
  achievements,
  unlockedCount = achievements.length,
  totalCount = 20, // Mock total achievements
}) => {
  // Mock locked achievements for demo
  const mockLockedAchievements: Achievement[] = [
    {
      id: 'locked-1',
      title: 'Speed Learner',
      description: 'Complete 5 learning paths in one month',
      icon: '💨',
      category: 'learning',
      unlockedAt: '',
    },
    {
      id: 'locked-2',
      title: 'Night Owl',
      description: 'Learn for 30 days straight',
      icon: '🦉',
      category: 'streak',
      unlockedAt: '',
    },
    {
      id: 'locked-3',
      title: 'Full Stack Hero',
      description: 'Master both frontend and backend skills',
      icon: '🚀',
      category: 'skill',
      unlockedAt: '',
    },
  ];

  const completionRate = (unlockedCount / totalCount) * 100;

  return (
    <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
      <CardContent sx={{ p: 3 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <EmojiEvents sx={{ color: 'primary.main', fontSize: '1.5rem' }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Achievements
            </Typography>
          </Box>
          <Chip
            label={`${unlockedCount}/${totalCount}`}
            color="primary"
            sx={{ fontWeight: 600 }}
          />
        </Box>

        {/* Progress Overview */}
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Collection Progress
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {Math.round(completionRate)}%
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={completionRate}
            sx={{
              height: 8,
              borderRadius: 4,
              backgroundColor: 'grey.200',
              '& .MuiLinearProgress-bar': {
                borderRadius: 4,
                background: 'linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)',
              },
            }}
          />
        </Box>

        {/* Categories */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
            Categories
          </Typography>
          <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
            {['learning', 'streak', 'skill', 'community'].map((category) => {
              const count = achievements.filter(a => a.category === category).length;
              return (
                <Chip
                  key={category}
                  label={`${category.charAt(0).toUpperCase() + category.slice(1)} (${count})`}
                  size="small"
                  variant="outlined"
                  sx={{ mb: 1 }}
                />
              );
            })}
          </Stack>
        </Box>

        {/* Recent Achievements */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>
            Recent Unlocks
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
              gap: 2,
            }}
          >
            {achievements.slice(0, 4).map((achievement) => (
              <AchievementCard key={achievement.id} achievement={achievement} />
            ))}
          </Box>
        </Box>

        {/* Locked Achievements (Next Goals) */}
        <Box>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>
            Next Goals
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
              gap: 2,
            }}
          >
            {mockLockedAchievements.map((achievement, index) => (
              <AchievementCard
                key={achievement.id}
                achievement={achievement}
                isLocked={true}
                progress={[65, 80, 30][index]} // Mock progress
              />
            ))}
          </Box>
        </Box>

        {/* Call to Action */}
        <Box sx={{ mt: 3, p: 2, backgroundColor: 'primary.main', borderRadius: 2, textAlign: 'center' }}>
          <Typography variant="subtitle2" sx={{ color: 'white', fontWeight: 600, mb: 0.5 }}>
            🎯 Keep Learning!
          </Typography>
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.9)' }}>
            Complete more learning paths to unlock new achievements
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AchievementsDisplay;