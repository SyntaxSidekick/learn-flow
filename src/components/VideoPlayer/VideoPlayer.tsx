import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Box,
  Typography,
  Chip,
  Avatar,
  Divider,
  Button,
  Paper,
  LinearProgress,
  Alert,
} from '@mui/material';
import {
  Close as CloseIcon,
  PlayArrow,
  Pause,
  VolumeUp,
  VolumeOff,
  Fullscreen,
  FullscreenExit,
  BookmarkBorder,
  Bookmark,
  Share,
  ThumbUp,
  ThumbDown,
} from '@mui/icons-material';
import VideoProgressManager from '../../utils/videoProgress';

interface VideoPlayerProps {
  open: boolean;
  onClose: () => void;
  video: {
    id: string;
    title: string;
    description: string;
    url: string;
    thumbnail: string;
    duration: string;
    channel: string;
    viewCount: string;
    topic?: string;
  };
  onVideoComplete: (videoId: string) => void;
  isCompleted: boolean;
  isBookmarked: boolean;
  onBookmarkToggle: (videoId: string) => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  open,
  onClose,
  video,
  onVideoComplete,
  isCompleted,
  isBookmarked,
  onBookmarkToggle,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showResumePrompt, setShowResumePrompt] = useState(false);

  // Convert duration string to seconds (e.g., "5:30" -> 330)
  const parseDuration = (durationStr: string): number => {
    const parts = durationStr.split(':');
    if (parts.length === 2) {
      return parseInt(parts[0]) * 60 + parseInt(parts[1]);
    }
    return 300; // Default 5 minutes
  };

  // Load saved progress when video opens
  useEffect(() => {
    if (open && video.id) {
      const videoDuration = parseDuration(video.duration);
      setDuration(videoDuration);
      
      const savedProgress = VideoProgressManager.getProgress(video.id);
      if (savedProgress && savedProgress.currentTime > 30 && !savedProgress.completed) {
        // Show resume prompt if there's significant progress (>30 seconds)
        setShowResumePrompt(true);
        setCurrentTime(savedProgress.currentTime);
        setProgress((savedProgress.currentTime / videoDuration) * 100);
      } else {
        setCurrentTime(0);
        setProgress(0);
        setShowResumePrompt(false);
      }
    }
  }, [open, video.id, video.duration]);

  // Convert YouTube URL to embed URL
  const getEmbedUrl = (url: string) => {
    const videoId = url.includes('youtube.com/watch?v=') 
      ? url.split('v=')[1]?.split('&')[0]
      : url.includes('youtu.be/') 
      ? url.split('youtu.be/')[1]?.split('?')[0]
      : '';
    
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}?enablejsapi=1&origin=${window.location.origin}`;
    }
    return url;
  };

  // Simulate video progress (in a real app, you'd get this from the video player API)
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && open) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          const newTime = prev + 1;
          const videoDuration = duration || 300; // Default 5 min if no duration
          const newProgress = Math.min((newTime / videoDuration) * 100, 100);
          
          setProgress(newProgress);
          
          // Save progress every 5 seconds
          if (newTime % 5 === 0) {
            VideoProgressManager.saveProgress(video.id, newTime, videoDuration);
          }
          
          // Mark as completed when 90% watched
          if (newProgress >= 90 && !isCompleted) {
            VideoProgressManager.markCompleted(video.id, videoDuration);
            onVideoComplete(video.id);
          }
          
          return newTime;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, open, duration, isCompleted, onVideoComplete, video.id]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
  };

  const handleFullscreenToggle = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleResume = () => {
    setShowResumePrompt(false);
    // Resume functionality is already handled by the loaded progress
  };

  const handleStartOver = () => {
    setShowResumePrompt(false);
    setCurrentTime(0);
    setProgress(0);
    VideoProgressManager.removeProgress(video.id);
  };

  const handleClose = () => {
    // Save final progress before closing
    if (currentTime > 0 && duration > 0) {
      VideoProgressManager.saveProgress(video.id, currentTime, duration);
    }
    setIsPlaying(false);
    setShowResumePrompt(false);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="lg"
      fullWidth
      fullScreen={isFullscreen}
      PaperProps={{
        sx: {
          backgroundColor: '#000',
          borderRadius: isFullscreen ? 0 : 4,
          overflow: 'hidden',
        },
      }}
    >
      <DialogTitle
        sx={{
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 2,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          {video.title}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton
            onClick={handleFullscreenToggle}
            sx={{ color: 'white' }}
          >
            {isFullscreen ? <FullscreenExit /> : <Fullscreen />}
          </IconButton>
          <IconButton
            onClick={handleClose}
            sx={{ color: 'white' }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      {/* Resume Prompt */}
      {showResumePrompt && (
        <Box sx={{ p: 2, backgroundColor: 'rgba(0, 0, 0, 0.9)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <Alert 
            severity="info" 
            sx={{ 
              backgroundColor: 'rgba(33, 150, 243, 0.1)',
              color: 'white',
              border: '1px solid rgba(33, 150, 243, 0.3)',
              '& .MuiAlert-icon': {
                color: '#2196f3'
              }
            }}
            action={
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button 
                  size="small" 
                  onClick={handleResume}
                  sx={{ 
                    color: '#2196f3',
                    fontWeight: 600,
                    '&:hover': { backgroundColor: 'rgba(33, 150, 243, 0.1)' }
                  }}
                >
                  Resume ({VideoProgressManager.formatTime(currentTime)})
                </Button>
                <Button 
                  size="small" 
                  onClick={handleStartOver}
                  sx={{ 
                    color: 'white',
                    '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' }
                  }}
                >
                  Start Over
                </Button>
              </Box>
            }
          >
            You previously watched {Math.round(progress)}% of this video. Would you like to resume where you left off?
          </Alert>
        </Box>
      )}

      <DialogContent sx={{ p: 0, backgroundColor: '#000' }}>
        {/* Video Player */}
        <Box sx={{ position: 'relative', aspectRatio: '16/9', backgroundColor: '#000' }}>
          <iframe
            width="100%"
            height="100%"
            src={getEmbedUrl(video.url)}
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{
              border: 'none',
              borderRadius: 0,
            }}
          />
          
          {/* Custom Controls Overlay */}
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
              p: 2,
              color: 'white',
            }}
          >
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                mb: 2,
                backgroundColor: 'rgba(255,255,255,0.3)',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: '#ff4444',
                },
              }}
            />
            
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <IconButton
                  onClick={handlePlayPause}
                  sx={{ color: 'white' }}
                >
                  {isPlaying ? <Pause /> : <PlayArrow />}
                </IconButton>
                
                <IconButton
                  onClick={handleMuteToggle}
                  sx={{ color: 'white' }}
                >
                  {isMuted ? <VolumeOff /> : <VolumeUp />}
                </IconButton>
                
                <Typography variant="body2">
                  {VideoProgressManager.formatTime(currentTime)} / {video.duration}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <IconButton
                  onClick={() => onBookmarkToggle(video.id)}
                  sx={{ color: isBookmarked ? '#ff6b35' : 'white' }}
                >
                  {isBookmarked ? <Bookmark /> : <BookmarkBorder />}
                </IconButton>
                
                <IconButton sx={{ color: 'white' }}>
                  <Share />
                </IconButton>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Video Information */}
        {!isFullscreen && (
          <Paper
            sx={{
              backgroundColor: 'white',
              p: 3,
            }}
          >
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                {video.topic && (
                  <Chip
                    label={video.topic}
                    size="small"
                    sx={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: 'white',
                      fontWeight: 600,
                    }}
                  />
                )}
                {isCompleted && (
                  <Chip
                    label="✅ Completed"
                    size="small"
                    sx={{
                      backgroundColor: '#4caf50',
                      color: 'white',
                      fontWeight: 600,
                    }}
                  />
                )}
              </Box>
              
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: '#1e293b' }}>
                {video.title}
              </Typography>
              
              <Typography variant="body1" sx={{ color: '#64748b', lineHeight: 1.6, mb: 3 }}>
                {video.description}
              </Typography>
            </Box>

            <Divider sx={{ my: 3 }} />

            {/* Channel Info */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ width: 48, height: 48, fontWeight: 700 }}>
                  {video.channel.charAt(0)}
                </Avatar>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {video.channel}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {video.viewCount} views
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Button
                  startIcon={<ThumbUp />}
                  variant="outlined"
                  size="small"
                  sx={{ borderRadius: 3 }}
                >
                  Like
                </Button>
                <Button
                  startIcon={<ThumbDown />}
                  variant="outlined"
                  size="small"
                  sx={{ borderRadius: 3 }}
                >
                  Dislike
                </Button>
              </Box>
            </Box>
          </Paper>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default VideoPlayer;