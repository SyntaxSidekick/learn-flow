import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  Avatar,
  LinearProgress,
  Alert,
  AlertTitle,
  Divider,
  IconButton,
} from '@mui/material';
import {
  PlayArrow,
  Visibility,
  CheckCircle,
  BookmarkBorder,
  Bookmark,
  TrendingUp,
  Close,
} from '@mui/icons-material';
import { topicVideos, getDifficultyColor, getDifficultyOrder, Video } from '../../data/videoData';
import VideoPlayer from '../VideoPlayer/VideoPlayer';
import VideoProgressManager from '../../utils/videoProgress';

interface TopicLearningProps {
  topic: string;
  onEnrollInPath: (topic: string) => void;
  isEnrolled: boolean;
  watchedVideos: string[];
  onVideoWatch: (videoId: string) => void;
  onBack: () => void;
}

const TopicLearning: React.FC<TopicLearningProps> = ({
  topic,
  onEnrollInPath,
  isEnrolled,
  watchedVideos,
  onVideoWatch,
  onBack,
}) => {
  const [bookmarkedVideos, setBookmarkedVideos] = useState<string[]>([]);
  const [showEnrollAlert, setShowEnrollAlert] = useState(!isEnrolled);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [isVideoPlayerOpen, setIsVideoPlayerOpen] = useState(false);

  const topicData = topicVideos[topic];
  
  if (!topicData) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Typography variant="h4">Topic not found</Typography>
        <Button onClick={onBack} sx={{ mt: 2 }}>
          Back to Dashboard
        </Button>
      </Container>
    );
  }

  // Sort videos by difficulty (beginner -> intermediate -> advanced)
  const sortedVideos = [...topicData.videos].sort((a, b) => 
    getDifficultyOrder(a.difficulty) - getDifficultyOrder(b.difficulty)
  );

  const watchedCount = watchedVideos.length;
  const totalVideos = sortedVideos.length;
  const progressPercentage = (watchedCount / totalVideos) * 100;

  const handleBookmark = (videoId: string) => {
    setBookmarkedVideos(prev => 
      prev.includes(videoId) 
        ? prev.filter(id => id !== videoId)
        : [...prev, videoId]
    );
  };

  const handleEnroll = () => {
    onEnrollInPath(topic);
    setShowEnrollAlert(false);
  };

  const handleVideoOpen = (video: Video) => {
    setSelectedVideo(video);
    setIsVideoPlayerOpen(true);
  };

  const handleVideoPlayerClose = () => {
    setIsVideoPlayerOpen(false);
    setSelectedVideo(null);
  };

  const handleVideoComplete = (videoId: string) => {
    onVideoWatch(videoId);
  };

  const VideoCard: React.FC<{ video: Video; index: number }> = ({ video, index }) => {
    const isWatched = watchedVideos.includes(video.id);
    const isBookmarked = bookmarkedVideos.includes(video.id);
    const difficultyColor = getDifficultyColor(video.difficulty);
    
    // Get video progress
    const progressPercentage = VideoProgressManager.getCompletionPercentage(video.id);
    const hasProgress = progressPercentage > 0 && !isWatched;

    return (
      <Card 
        sx={{ 
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          border: isWatched ? '2px solid #4caf50' : '1px solid',
          borderColor: isWatched ? '#4caf50' : 'divider',
          position: 'relative',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: 8,
          }
        }}
      >
        {isWatched && (
          <Box
            sx={{
              position: 'absolute',
              top: 8,
              left: 8,
              zIndex: 2,
              backgroundColor: '#4caf50',
              borderRadius: '50%',
              padding: 0.5,
            }}
          >
            <CheckCircle sx={{ color: 'white', fontSize: 20 }} />
          </Box>
        )}
        
        <Box sx={{ position: 'relative' }}>
          <CardMedia
            component="img"
            height="180"
            image={video.thumbnail}
            alt={video.title}
            sx={{ objectFit: 'cover' }}
          />
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
              fontWeight: 600,
            }}
          >
            {video.duration}
          </Box>

          {/* Progress bar for partially watched videos */}
          {hasProgress && (
            <Box
              sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: 4,
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
              }}
            >
              <Box
                sx={{
                  height: '100%',
                  width: `${progressPercentage}%`,
                  backgroundColor: '#ff4444',
                  transition: 'width 0.3s ease',
                }}
              />
            </Box>
          )}
          <Box
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
            }}
          >
            <IconButton
              size="small"
              onClick={() => handleBookmark(video.id)}
              sx={{
                backgroundColor: 'rgba(0,0,0,0.6)',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(0,0,0,0.8)',
                },
              }}
            >
              {isBookmarked ? <Bookmark /> : <BookmarkBorder />}
            </IconButton>
          </Box>
        </Box>

        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Chip
              label={video.difficulty}
              size="small"
              sx={{
                backgroundColor: difficultyColor,
                color: 'white',
                fontWeight: 600,
                textTransform: 'capitalize',
                mr: 1,
              }}
            />
            <Typography variant="caption" color="text.secondary">
              Video {index + 1} of {totalVideos}
            </Typography>
          </Box>

          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 600,
              mb: 1,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {video.title}
          </Typography>

          <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{ 
              mb: 2,
              flexGrow: 1,
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {video.description}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Avatar sx={{ width: 24, height: 24, mr: 1, fontSize: '0.75rem' }}>
              G
            </Avatar>
            <Typography variant="caption" color="text.secondary" sx={{ mr: 2 }}>
              {video.channel}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Visibility sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
              <Typography variant="caption" color="text.secondary">
                {video.viewCount}
              </Typography>
            </Box>
          </Box>

          <Button
            variant={isWatched ? "outlined" : "contained"}
            startIcon={isWatched ? <CheckCircle /> : <PlayArrow />}
            onClick={() => {
              handleVideoOpen(video);
            }}
            fullWidth
            sx={{
              textTransform: 'none',
              fontWeight: 600,
            }}
          >
            {isWatched 
              ? 'Watch Again' 
              : hasProgress 
                ? `Resume (${Math.round(progressPercentage)}%)` 
                : 'Watch Video'}
          </Button>
        </CardContent>
      </Card>
    );
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4, px: { xs: 2, sm: 3 } }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <Button
          onClick={onBack}
          startIcon={<Close />}
          sx={{ mr: 3, textTransform: 'none' }}
        >
          Back to Dashboard
        </Button>
        <Box sx={{ flex: 1 }}>
          <Typography 
            variant="h3" 
            fontWeight="bold" 
            sx={{ 
              textTransform: 'capitalize',
              mb: 1,
              background: `linear-gradient(135deg, ${getDifficultyColor('beginner')} 0%, ${getDifficultyColor('advanced')} 100%)`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {topic} Learning Path
          </Typography>
          <Typography variant="h6" color="text.secondary">
            {topicData.description}
          </Typography>
        </Box>
      </Box>

      {/* Enrollment Alert */}
      {showEnrollAlert && (
        <Alert 
          severity="info" 
          sx={{ mb: 4, borderRadius: 2 }}
          action={
            <Box>
              <Button 
                color="inherit" 
                size="small" 
                onClick={handleEnroll}
                sx={{ mr: 1, fontWeight: 600 }}
              >
                Yes, Enroll Me!
              </Button>
              <Button 
                color="inherit" 
                size="small" 
                onClick={() => setShowEnrollAlert(false)}
              >
                Maybe Later
              </Button>
            </Box>
          }
        >
          <AlertTitle sx={{ fontWeight: 600 }}>
            Want to track your progress in {topic}?
          </AlertTitle>
          Enroll in this learning path to track your video progress, earn achievements, and get personalized recommendations.
        </Alert>
      )}

      {/* Progress Section */}
      {isEnrolled && (
        <Card sx={{ mb: 4, borderRadius: 3, background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.05) 0%, rgba(76, 175, 80, 0.05) 100%)' }}>
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <TrendingUp sx={{ mr: 2, color: 'primary.main', fontSize: 32 }} />
              <Box sx={{ flex: 1 }}>
                <Typography variant="h5" fontWeight="bold">
                  Your Progress
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {watchedCount} of {totalVideos} videos completed • {topicData.totalDuration} total
                </Typography>
              </Box>
              <Typography variant="h3" fontWeight="bold" color="primary.main">
                {Math.round(progressPercentage)}%
              </Typography>
            </Box>
            
            <LinearProgress 
              variant="determinate" 
              value={progressPercentage} 
              sx={{ 
                height: 8, 
                borderRadius: 4,
                backgroundColor: 'rgba(0,0,0,0.1)',
                '& .MuiLinearProgress-bar': {
                  borderRadius: 4,
                  background: 'linear-gradient(90deg, #4caf50 0%, #8bc34a 100%)',
                }
              }} 
            />

            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle1" fontWeight="600" sx={{ mb: 1 }}>
                Skills You'll Learn:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {topicData.skillsLearned.map((skill, index) => (
                  <Chip
                    key={index}
                    label={skill}
                    size="small"
                    sx={{
                      backgroundColor: 'primary.main',
                      color: 'white',
                      fontWeight: 500,
                    }}
                  />
                ))}
              </Box>
            </Box>
          </CardContent>
        </Card>
      )}

      <Divider sx={{ mb: 4 }} />

      {/* Videos Grid */}
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 3 }}>
        📺 Video Curriculum
      </Typography>
      
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Videos are organized by difficulty level - start with beginner concepts and progress to advanced topics.
      </Typography>

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
        {sortedVideos.map((video, index) => (
          <VideoCard key={video.id} video={video} index={index} />
        ))}
      </Box>

      {/* Video Player Modal */}
      {selectedVideo && (
        <VideoPlayer
          open={isVideoPlayerOpen}
          onClose={handleVideoPlayerClose}
          video={selectedVideo}
          onVideoComplete={handleVideoComplete}
          isCompleted={watchedVideos.includes(selectedVideo.id)}
          isBookmarked={bookmarkedVideos.includes(selectedVideo.id)}
          onBookmarkToggle={handleBookmark}
        />
      )}
    </Container>
  );
};

export default TopicLearning;