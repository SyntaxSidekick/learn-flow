import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  LinearProgress,
  Stack,
  Chip,
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  TrendingFlat,
} from '@mui/icons-material';

interface SkillProgressProps {
  skills: Array<{
    skill: string;
    progress: number;
    target: number;
    change?: number; // percentage change from last week
  }>;
}

const SkillProgress: React.FC<SkillProgressProps> = ({ skills }) => {
  const getChangeIcon = (change?: number) => {
    if (!change) return <TrendingFlat sx={{ color: 'text.secondary' }} />;
    if (change > 0) return <TrendingUp sx={{ color: 'success.main' }} />;
    if (change < 0) return <TrendingDown sx={{ color: 'error.main' }} />;
    return <TrendingFlat sx={{ color: 'text.secondary' }} />;
  };

  const getChangeColor = (change?: number) => {
    if (!change) return 'text.secondary';
    if (change > 0) return 'success.main';
    if (change < 0) return 'error.main';
    return 'text.secondary';
  };

  const getSkillIcon = (skill: string) => {
    const skillIcons: { [key: string]: string } = {
      'React': '⚛️',
      'TypeScript': '🔷',
      'Node.js': '🟢',
      'Material UI': '🎨',
      'JavaScript': '💛',
      'CSS': '🎨',
      'HTML': '📝',
      'Python': '🐍',
      'Vue': '💚',
      'Angular': '🔴',
    };
    return skillIcons[skill] || '📚';
  };

  return (
    <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
          Skills Progress
        </Typography>

        <Stack spacing={3}>
          {skills.map((skillData) => (
            <Box key={skillData.skill}>
              {/* Skill Header */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="h6" sx={{ fontSize: '1.2rem' }}>
                    {getSkillIcon(skillData.skill)}
                  </Typography>
                  <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                    {skillData.skill}
                  </Typography>
                  {skillData.change !== undefined && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      {getChangeIcon(skillData.change)}
                      <Typography
                        variant="caption"
                        sx={{
                          color: getChangeColor(skillData.change),
                          fontWeight: 500,
                        }}
                      >
                        {skillData.change > 0 ? '+' : ''}{skillData.change}%
                      </Typography>
                    </Box>
                  )}
                </Box>
                <Box sx={{ textAlign: 'right' }}>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: 'primary.main' }}>
                    {skillData.progress}%
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Target: {skillData.target}%
                  </Typography>
                </Box>
              </Box>

              {/* Progress Bar */}
              <Box sx={{ position: 'relative' }}>
                <LinearProgress
                  variant="determinate"
                  value={skillData.progress}
                  sx={{
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: 'grey.200',
                    '& .MuiLinearProgress-bar': {
                      borderRadius: 5,
                      backgroundColor: skillData.progress >= skillData.target ? 'success.main' : 'primary.main',
                    },
                  }}
                />
                {/* Target Line */}
                <Box
                  sx={{
                    position: 'absolute',
                    left: `${skillData.target}%`,
                    top: 0,
                    bottom: 0,
                    width: 2,
                    backgroundColor: 'warning.main',
                    borderRadius: 1,
                  }}
                />
              </Box>

              {/* Progress Info */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  Current Progress
                </Typography>
                <Typography variant="caption" color="warning.main" sx={{ fontWeight: 500 }}>
                  Target
                </Typography>
              </Box>
            </Box>
          ))}
        </Stack>

        {/* Summary */}
        <Box sx={{ mt: 3, p: 2, backgroundColor: 'grey.50', borderRadius: 2 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
            Progress Summary
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Chip
              label={`${skills.filter(s => s.progress >= s.target).length} skills on target`}
              size="small"
              color="success"
              variant="outlined"
            />
            <Chip
              label={`${skills.filter(s => s.progress < s.target).length} skills in progress`}
              size="small"
              color="primary"
              variant="outlined"
            />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default SkillProgress;