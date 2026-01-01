import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  IconButton,
  Stack,
  Tooltip,
  Avatar,
} from '@mui/material';
import {
  PlayArrow,
  BookmarkBorder,
  Bookmark,
  AccessTime,
} from '@mui/icons-material';
import { Resource } from '../../types';

interface ResourceCardProps {
  resource: Resource;
  onBookmark?: (resourceId: string) => void;
  onOpen?: (resourceId: string) => void;
}

const ResourceCard: React.FC<ResourceCardProps> = ({
  resource,
  onBookmark,
  onOpen,
}) => {
  const [isBookmarked, setIsBookmarked] = React.useState(false);

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    onBookmark?.(resource.id);
  };

  const handleOpen = () => {
    onOpen?.(resource.id);
    window.open(resource.url, '_blank');
  };

  const getTypeIcon = () => {
    switch (resource.type) {
      case 'youtube':
        return '📺';
      case 'mdn':
        return '📖';
      case 'article':
        return '📄';
      case 'documentation':
        return '📚';
      case 'github':
        return '💻';
      default:
        return '🔗';
    }
  };

  const getTypeColor = () => {
    switch (resource.type) {
      case 'youtube':
        return '#FF0000';
      case 'mdn':
        return '#000000';
      case 'article':
        return '#1976d2';
      case 'documentation':
        return '#4caf50';
      case 'github':
        return '#000000';
      default:
        return '#757575';
    }
  };

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

  const formatDuration = (minutes?: number) => {
    if (!minutes) return null;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${remainingMinutes}m`;
    }
    return `${minutes}m`;
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
        cursor: 'pointer',
      }}
      onClick={handleOpen}
    >
      {/* Thumbnail for YouTube videos */}
      {resource.type === 'youtube' && resource.thumbnail && (
        <Box sx={{ position: 'relative' }}>
          <CardMedia
            component="img"
            height="180"
            image={resource.thumbnail}
            alt={resource.title}
            sx={{
              objectFit: 'cover',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              display: 'flex',
              gap: 1,
            }}
          >
            <Chip
              label={getTypeIcon()}
              size="small"
              sx={{
                backgroundColor: 'rgba(0,0,0,0.7)',
                color: 'white',
                fontWeight: 600,
              }}
            />
          </Box>
          <Box
            sx={{
              position: 'absolute',
              bottom: 8,
              right: 8,
              backgroundColor: 'rgba(0,0,0,0.8)',
              color: 'white',
              px: 1,
              py: 0.5,
              borderRadius: 1,
              fontSize: '0.75rem',
              fontWeight: 500,
            }}
          >
            {formatDuration(resource.duration)}
          </Box>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: 'rgba(0,0,0,0.7)',
              borderRadius: '50%',
              p: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <PlayArrow sx={{ color: 'white', fontSize: '2rem' }} />
          </Box>
        </Box>
      )}

      <CardContent sx={{ p: 3, flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {resource.type !== 'youtube' && (
              <Typography
                variant="h6"
                sx={{
                  fontSize: '1.2rem',
                  color: getTypeColor(),
                }}
              >
                {getTypeIcon()}
              </Typography>
            )}
            <Chip
              label={resource.type.toUpperCase()}
              size="small"
              sx={{
                backgroundColor: getTypeColor(),
                color: 'white',
                fontWeight: 600,
                fontSize: '0.7rem',
              }}
            />
          </Box>
          <Tooltip title={isBookmarked ? 'Remove bookmark' : 'Bookmark'}>
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                handleBookmark();
              }}
            >
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
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {resource.title}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 2,
            flex: 1,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {resource.description}
        </Typography>

        {/* Author */}
        {resource.author && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <Avatar sx={{ width: 24, height: 24, fontSize: '0.75rem' }}>
              {resource.author.charAt(0)}
            </Avatar>
            <Typography variant="caption" color="text.secondary">
              {resource.author}
            </Typography>
          </Box>
        )}

        {/* Metadata */}
        <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap' }}>
          <Chip
            label={resource.difficulty}
            size="small"
            color={getDifficultyColor(resource.difficulty) as any}
            sx={{ fontWeight: 500 }}
          />
          {resource.duration && (
            <Chip
              label={formatDuration(resource.duration)}
              size="small"
              variant="outlined"
              icon={<AccessTime />}
            />
          )}
          <Chip
            label={`${resource.rating} ⭐`}
            size="small"
            variant="outlined"
          />
        </Stack>

        {/* Tags */}
        <Box sx={{ mb: 2 }}>
          <Stack direction="row" spacing={0.5} sx={{ flexWrap: 'wrap' }}>
            {resource.tags.slice(0, 3).map((tag) => (
              <Chip
                key={tag}
                label={tag}
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
            {resource.tags.length > 3 && (
              <Chip
                label={`+${resource.tags.length - 3}`}
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

        {/* Publication Date */}
        {resource.publishDate && (
          <Typography variant="caption" color="text.secondary" sx={{ mt: 'auto' }}>
            Published {new Date(resource.publishDate).toLocaleDateString()}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default ResourceCard;