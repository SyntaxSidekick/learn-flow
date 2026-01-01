import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Chip,
  Button,
  IconButton,
  Stack,
  Tooltip,
} from '@mui/material';
import {
  PlayArrow,
  BookmarkBorder,
  Bookmark,
  AccessTime,
  CheckCircle,
} from '@mui/icons-material';
import { LearningPath } from '../../types';

interface LearningPathCardProps {
  path: LearningPath;
  onEnroll?: (pathId: string) => void;
  onContinue?: (pathId: string) => void;
  onBookmark?: (pathId: string) => void;
}

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'beginner':
      return 'success';
    case 'intermediate':
      return 'warning';
    case 'advanced':
      return 'error';
    default:
      return 'default';
  }
};

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'frontend':
      return '🎨';
    case 'backend':
      return '⚙️';
    case 'fullstack':
      return '🚀';
    case 'mobile':
      return '📱';
    case 'data-science':
      return '📊';
    case 'devops':
      return '🔧';
    default:
      return '📚';
  }
};

const LearningPathCard: React.FC<LearningPathCardProps> = ({
  path,
  onEnroll,
  onContinue,
  onBookmark,
}) => {
  const [isBookmarked, setIsBookmarked] = React.useState(false);

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    onBookmark?.(path.id);
  };

  const handleAction = () => {
    if (path.enrolled && path.progress > 0) {
      onContinue?.(path.id);
    } else if (path.enrolled) {
      onContinue?.(path.id);
    } else {
      onEnroll?.(path.id);
    }
  };

  const getActionText = () => {
    if (path.enrolled && path.progress > 0) {
      return 'Continue';
    } else if (path.enrolled) {
      return 'Start';
    } else {
      return 'Enroll';
    }
  };

  return (
    <Card
      elevation={0}
      sx={{
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          transform: 'translateY(-2px)',
        },
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CardContent sx={{ p: 3, flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="h4" sx={{ fontSize: '1.5rem' }}>
              {getCategoryIcon(path.category)}
            </Typography>
            {path.progress === 100 && (
              <CheckCircle sx={{ color: 'success.main', fontSize: '1.2rem' }} />
            )}
          </Box>
          <Tooltip title={isBookmarked ? 'Remove bookmark' : 'Bookmark'}>
            <IconButton size="small" onClick={handleBookmark}>
              {isBookmarked ? (
                <Bookmark sx={{ color: 'primary.main' }} />
              ) : (
                <BookmarkBorder />
              )}
            </IconButton>
          </Tooltip>
        </Box>

        {/* Title and Description */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            mb: 1,
            color: 'text.primary',
            lineHeight: 1.3,
          }}
        >
          {path.title}
        </Typography>
        
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 2,
            flex: 1,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {path.description}
        </Typography>

        {/* Metadata */}
        <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap' }}>
          <Chip
            label={path.difficulty}
            size="small"
            color={getDifficultyColor(path.difficulty) as any}
            sx={{ fontWeight: 500 }}
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
        </Stack>

        {/* Progress */}
        {path.enrolled && (
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Progress
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                {path.progress}%
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={path.progress}
              sx={{
                height: 8,
                borderRadius: 4,
                backgroundColor: 'grey.200',
                '& .MuiLinearProgress-bar': {
                  borderRadius: 4,
                },
              }}
            />
          </Box>
        )}

        {/* Skills */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
            Skills you'll learn:
          </Typography>
          <Stack direction="row" spacing={0.5} sx={{ flexWrap: 'wrap' }}>
            {path.skills.slice(0, 3).map((skill) => (
              <Chip
                key={skill}
                label={skill}
                size="small"
                variant="outlined"
                sx={{
                  fontSize: '0.75rem',
                  height: 24,
                  '& .MuiChip-label': {
                    px: 1,
                  },
                }}
              />
            ))}
            {path.skills.length > 3 && (
              <Chip
                label={`+${path.skills.length - 3} more`}
                size="small"
                variant="outlined"
                sx={{
                  fontSize: '0.75rem',
                  height: 24,
                  '& .MuiChip-label': {
                    px: 1,
                  },
                }}
              />
            )}
          </Stack>
        </Box>

        {/* Prerequisites */}
        {path.prerequisites.length > 0 && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
              Prerequisites:
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
              {path.prerequisites.join(', ')}
            </Typography>
          </Box>
        )}

        {/* Action Button */}
        <Button
          variant="contained"
          size="large"
          startIcon={<PlayArrow />}
          onClick={handleAction}
          sx={{
            borderRadius: 3,
            mt: 'auto',
            fontWeight: 600,
            py: 1.5,
          }}
          fullWidth
        >
          {getActionText()}
        </Button>
      </CardContent>
    </Card>
  );
};

export default LearningPathCard;