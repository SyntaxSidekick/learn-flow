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
  School,
  AttachMoney,
  Schedule,
  WorkOutline,
  EmojiEvents,
  Quiz,
} from '@mui/icons-material';
import { developerPaths, PathVideo } from '../../data/developerPaths';
import { getTestsForPath, TestAttempt, getUnlockedVideosByTest } from '../../data/assessmentTests';
import AssessmentComponent from '../Assessment/AssessmentComponent';
import VideoPlayer from '../VideoPlayer/VideoPlayer';
import VideoProgressManager from '../../utils/videoProgress';

interface DeveloperPathLearningProps {
  pathId: string;
  onEnrollInPath: (pathId: string) => void;
  isEnrolled: boolean;
  completedVideos: string[];
  onVideoComplete: (videoId: string) => void;
  passedTests: string[];
  onTestComplete: (testId: string, passed: boolean, unlockedVideos: string[]) => void;
  onBack: () => void;
}

const DeveloperPathLearning: React.FC<DeveloperPathLearningProps> = ({
  pathId,
  onEnrollInPath,
  isEnrolled,
  completedVideos,
  onVideoComplete,
  passedTests,
  onTestComplete,
  onBack,
}) => {
  const [bookmarkedVideos, setBookmarkedVideos] = useState<string[]>([]);
  const [showEnrollAlert, setShowEnrollAlert] = useState(!isEnrolled);
  const [currentTest, setCurrentTest] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<PathVideo | null>(null);
  const [isVideoPlayerOpen, setIsVideoPlayerOpen] = useState(false);

  const pathData = developerPaths[pathId];
  const availableTests = getTestsForPath(pathId);
  
  if (!pathData) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Typography variant="h4">Learning Path not found</Typography>
        <Button onClick={onBack} sx={{ mt: 2 }}>
          Back to Dashboard
        </Button>
      </Container>
    );
  }

  // Sort videos by order
  const sortedVideos = [...pathData.videos].sort((a, b) => a.order - b.order);

  // Determine which videos are unlocked based on tests and completion
  const getUnlockedVideos = (): string[] => {
    const unlockedByTests = new Set<string>();
    
    // Add videos unlocked by passed tests
    passedTests.forEach(testId => {
      const unlockedVideos = getUnlockedVideosByTest(testId, true);
      unlockedVideos.forEach(videoId => unlockedByTests.add(videoId));
    });
    
    // Always unlock first video
    if (sortedVideos.length > 0) {
      unlockedByTests.add(sortedVideos[0].id);
    }
    
    // Unlock videos sequentially based on completion
    for (let i = 0; i < sortedVideos.length - 1; i++) {
      if (completedVideos.includes(sortedVideos[i].id)) {
        unlockedByTests.add(sortedVideos[i + 1].id);
      }
    }
    
    return Array.from(unlockedByTests);
  };

  const unlockedVideos = getUnlockedVideos();

  // Find which test can be taken to unlock videos
  const getAvailableTestForVideo = (videoId: string) => {
    return availableTests.find(test => 
      test.prerequisiteFor.includes(videoId) && !passedTests.includes(test.id)
    );
  };

  const completedCount = completedVideos.length;
  const totalVideos = sortedVideos.length;
  const progressPercentage = (completedCount / totalVideos) * 100;

  const handleBookmark = (videoId: string) => {
    setBookmarkedVideos(prev => 
      prev.includes(videoId) 
        ? prev.filter(id => id !== videoId)
        : [...prev, videoId]
    );
  };

  const handleEnroll = () => {
    onEnrollInPath(pathId);
    setShowEnrollAlert(false);
  };

  const handleTestComplete = (attempt: TestAttempt) => {
    if (attempt.passed) {
      const unlockedVideoIds = getUnlockedVideosByTest(attempt.testId, true);
      onTestComplete(attempt.testId, true, unlockedVideoIds);
    } else {
      onTestComplete(attempt.testId, false, []);
    }
    setCurrentTest(null);
  };

  const handleTakeTest = (testId: string) => {
    setCurrentTest(testId);
  };

  const handleCloseTest = () => {
    setCurrentTest(null);
  };

  const handleVideoOpen = (video: PathVideo) => {
    setSelectedVideo(video);
    setIsVideoPlayerOpen(true);
  };

  const handleVideoPlayerClose = () => {
    setIsVideoPlayerOpen(false);
    setSelectedVideo(null);
  };

  const handleVideoComplete = (videoId: string) => {
    onVideoComplete(videoId);
  };

  const VideoCard: React.FC<{ video: PathVideo; index: number }> = ({ video, index }) => {
    const isCompleted = completedVideos.includes(video.id);
    const isBookmarked = bookmarkedVideos.includes(video.id);
    const isUnlocked = unlockedVideos.includes(video.id);
    const availableTest = getAvailableTestForVideo(video.id);
    
    // Get video progress
    const progressPercentage = VideoProgressManager.getCompletionPercentage(video.id);
    const hasProgress = progressPercentage > 0 && !isCompleted;

    return (
      <Card 
        sx={{ 
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          border: 'none',
          borderRadius: 4,
          boxShadow: isCompleted 
            ? '0 8px 32px rgba(76, 175, 80, 0.2)' 
            : '0 4px 20px rgba(0, 0, 0, 0.08)',
          position: 'relative',
          opacity: !isUnlocked ? 0.6 : 1,
          overflow: 'hidden',
          backgroundColor: isCompleted ? '#f8fff8' : 'white',
          '&:hover': {
            transform: isUnlocked ? 'translateY(-8px)' : 'none',
            boxShadow: isUnlocked 
              ? isCompleted 
                ? '0 20px 40px rgba(76, 175, 80, 0.3)' 
                : '0 20px 40px rgba(102, 126, 234, 0.15)'
              : '0 4px 20px rgba(0, 0, 0, 0.08)',
          }
        }}
      >
        {isCompleted && (
          <Box
            sx={{
              position: 'absolute',
              top: 12,
              left: 12,
              zIndex: 2,
              background: 'linear-gradient(135deg, #4caf50 0%, #2e7d32 100%)',
              borderRadius: '50%',
              padding: 1,
              boxShadow: '0 4px 12px rgba(76, 175, 80, 0.4)',
            }}
          >
            <CheckCircle sx={{ color: 'white', fontSize: 18 }} />
          </Box>
        )}
        
        <Box sx={{ position: 'relative', overflow: 'hidden' }}>
          <CardMedia
            component="img"
            height="200"
            image={video.thumbnail}
            alt={video.title}
            sx={{ 
              objectFit: 'cover',
              filter: !isUnlocked ? 'grayscale(100%) brightness(0.7)' : 'none',
              transition: 'all 0.3s ease',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: 12,
              right: 12,
              background: 'rgba(0, 0, 0, 0.8)',
              backdropFilter: 'blur(10px)',
              color: 'white',
              px: 1.5,
              py: 0.5,
              borderRadius: 2,
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
          {isUnlocked && (
            <Box
              sx={{
                position: 'absolute',
                top: 12,
                right: 12,
              }}
            >
              <IconButton
                size="small"
                onClick={() => handleBookmark(video.id)}
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(10px)',
                  color: isBookmarked ? '#ff6b35' : '#64748b',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 1)',
                    transform: 'scale(1.1)',
                  },
                }}
              >
                {isBookmarked ? <Bookmark /> : <BookmarkBorder />}
              </IconButton>
            </Box>
          )}
        </Box>

        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, flexWrap: 'wrap', gap: 1 }}>
            <Chip
              label={`Step ${index + 1}`}
              size="small"
              sx={{
                background: `linear-gradient(135deg, ${pathData.color} 0%, ${pathData.color}dd 100%)`,
                color: 'white',
                fontWeight: 600,
                border: 'none',
                boxShadow: `0 2px 8px ${pathData.color}40`,
              }}
            />
            <Chip
              label={video.topic}
              size="small"
              variant="outlined"
              sx={{ 
                borderColor: 'rgba(102, 126, 234, 0.3)',
                color: '#667eea',
                fontWeight: 500,
                '&:hover': {
                  backgroundColor: 'rgba(102, 126, 234, 0.1)',
                }
              }}
            />
            {!isUnlocked && (
              <Chip
                label="🔒 Locked"
                size="small"
                sx={{ 
                  background: 'linear-gradient(135deg, #64748b 0%, #475569 100%)',
                  color: 'white',
                  fontWeight: 500,
                  border: 'none',
                }}
              />
            )}
          </Box>

          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 700,
              mb: 1.5,
              color: '#1e293b',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              lineHeight: 1.3,
            }}
          >
            {video.title}
          </Typography>

          <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{ 
              mb: 3,
              flexGrow: 1,
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              lineHeight: 1.5,
              color: '#64748b',
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

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {isUnlocked ? (
              <Button
                variant={isCompleted ? "outlined" : "contained"}
                startIcon={isCompleted ? <CheckCircle /> : <PlayArrow />}
                onClick={() => {
                  handleVideoOpen(video);
                }}
                fullWidth
                sx={{ 
                  textTransform: 'none', 
                  fontWeight: 600,
                  borderRadius: 3,
                  py: 1.5,
                  ...(isCompleted ? {
                    borderColor: '#4caf50',
                    color: '#4caf50',
                    '&:hover': {
                      backgroundColor: 'rgba(76, 175, 80, 0.1)',
                      borderColor: '#4caf50',
                    }
                  } : {
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    boxShadow: '0 4px 16px rgba(102, 126, 234, 0.4)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)',
                      boxShadow: '0 6px 20px rgba(102, 126, 234, 0.5)',
                      transform: 'translateY(-2px)',
                    }
                  })
                }}
              >
                {isCompleted 
                  ? 'Watch Again' 
                  : hasProgress 
                    ? `Resume (${Math.round(progressPercentage)}%)` 
                    : 'Start Learning'}
              </Button>
            ) : availableTest ? (
              <Button
                variant="contained"
                startIcon={<Quiz />}
                onClick={() => handleTakeTest(availableTest.id)}
                fullWidth
                sx={{ 
                  textTransform: 'none', 
                  fontWeight: 600,
                  borderRadius: 3,
                  py: 1.5,
                  background: 'linear-gradient(135deg, #ff8a50 0%, #ff6b35 100%)',
                  boxShadow: '0 4px 16px rgba(255, 107, 53, 0.4)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #ff7043 0%, #ff5722 100%)',
                    boxShadow: '0 6px 20px rgba(255, 107, 53, 0.5)',
                    transform: 'translateY(-2px)',
                  }
                }}
              >
                Take Test to Unlock
              </Button>
            ) : (
              <Button
                variant="outlined"
                disabled
                fullWidth
                sx={{ 
                  textTransform: 'none', 
                  fontWeight: 600,
                  borderRadius: 3,
                  py: 1.5,
                  borderColor: '#e2e8f0',
                  color: '#94a3b8',
                }}
              >
                Complete Previous Steps
              </Button>
            )}
          </Box>
        </CardContent>
      </Card>
    );
  };

  // Show assessment if one is selected
  if (currentTest) {
    const test = availableTests.find(t => t.id === currentTest);
    if (test) {
      return (
        <AssessmentComponent
          test={test}
          onTestComplete={handleTestComplete}
          onClose={handleCloseTest}
        />
      );
    }
  }

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
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Typography 
              variant="h2" 
              sx={{ 
                fontSize: { xs: '2rem', md: '3rem' },
                mr: 2
              }}
            >
              {pathData.icon}
            </Typography>
            <Box>
              <Typography 
                variant="h3" 
                fontWeight="bold" 
                sx={{ 
                  color: pathData.color,
                  fontSize: { xs: '1.8rem', md: '2.5rem' }
                }}
              >
                {pathData.title}
              </Typography>
              <Typography variant="h6" color="text.secondary">
                {pathData.description}
              </Typography>
            </Box>
          </Box>
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
                Enroll Now!
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
            Ready to become a {pathData.title}?
          </AlertTitle>
          Enroll in this comprehensive learning path to track your progress, earn certificates, and join a community of learners.
        </Alert>
      )}

      {/* Path Overview Cards */}
      <Box 
        sx={{ 
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
          gap: 3,
          mb: 4
        }}
      >
        <Card sx={{ background: `linear-gradient(135deg, ${pathData.color}10 0%, ${pathData.color}05 100%)`, border: `1px solid ${pathData.color}20` }}>
          <CardContent sx={{ textAlign: 'center', py: 3 }}>
            <Schedule sx={{ fontSize: 40, color: pathData.color, mb: 1 }} />
            <Typography variant="h6" fontWeight="bold">{pathData.duration}</Typography>
            <Typography variant="body2" color="text.secondary">Estimated Duration</Typography>
          </CardContent>
        </Card>
        
        <Card sx={{ background: `linear-gradient(135deg, #4caf5010 0%, #4caf5005 100%)`, border: '1px solid #4caf5020' }}>
          <CardContent sx={{ textAlign: 'center', py: 3 }}>
            <AttachMoney sx={{ fontSize: 40, color: '#4caf50', mb: 1 }} />
            <Typography variant="h6" fontWeight="bold">{pathData.averageSalary}</Typography>
            <Typography variant="body2" color="text.secondary">Average Salary</Typography>
          </CardContent>
        </Card>
        
        <Card sx={{ background: `linear-gradient(135deg, #ff980010 0%, #ff980005 100%)`, border: '1px solid #ff980020' }}>
          <CardContent sx={{ textAlign: 'center', py: 3 }}>
            <School sx={{ fontSize: 40, color: '#ff9800', mb: 1 }} />
            <Typography variant="h6" fontWeight="bold">{pathData.videos.length}</Typography>
            <Typography variant="body2" color="text.secondary">Learning Videos</Typography>
          </CardContent>
        </Card>
        
        <Card sx={{ background: `linear-gradient(135deg, #9c27b010 0%, #9c27b005 100%)`, border: '1px solid #9c27b020' }}>
          <CardContent sx={{ textAlign: 'center', py: 3 }}>
            <EmojiEvents sx={{ fontSize: 40, color: '#9c27b0', mb: 1 }} />
            <Typography variant="h6" fontWeight="bold">{pathData.skillsGained.length}</Typography>
            <Typography variant="body2" color="text.secondary">Skills to Master</Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Progress Section */}
      {isEnrolled && (
        <Card sx={{ mb: 4, borderRadius: 3, background: `linear-gradient(135deg, ${pathData.color}05 0%, ${pathData.color}02 100%)` }}>
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <TrendingUp sx={{ mr: 2, color: pathData.color, fontSize: 32 }} />
              <Box sx={{ flex: 1 }}>
                <Typography variant="h5" fontWeight="bold">
                  Your Learning Progress
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {completedCount} of {totalVideos} steps completed • {pathData.duration} total
                </Typography>
              </Box>
              <Typography variant="h3" fontWeight="bold" sx={{ color: pathData.color }}>
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
                  backgroundColor: pathData.color,
                }
              }} 
            />
          </CardContent>
        </Card>
      )}

      {/* Learning Roadmap */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' }, gap: 4, mb: 4 }}>
        <Card sx={{ borderRadius: 3 }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
              🗺️ Learning Roadmap
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {pathData.roadmapSteps.map((step, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      backgroundColor: index < completedCount ? pathData.color : '#e0e0e0',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold',
                      mr: 2,
                      fontSize: '0.875rem'
                    }}
                  >
                    {index + 1}
                  </Box>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      fontWeight: index < completedCount ? 600 : 400,
                      color: index < completedCount ? 'text.primary' : 'text.secondary'
                    }}
                  >
                    {step}
                  </Typography>
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* Skills */}
          <Card sx={{ borderRadius: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                🚀 Skills You'll Master
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {pathData.skillsGained.map((skill, index) => (
                  <Chip
                    key={index}
                    label={skill}
                    size="small"
                    sx={{
                      backgroundColor: pathData.color,
                      color: 'white',
                      fontWeight: 500,
                    }}
                  />
                ))}
              </Box>
            </CardContent>
          </Card>

          {/* Career Opportunities */}
          <Card sx={{ borderRadius: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                💼 Career Opportunities
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {pathData.careerOpportunities.map((career, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
                    <WorkOutline sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2">{career}</Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>

      <Divider sx={{ mb: 4 }} />

      {/* Videos Curriculum */}
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 3 }}>
        📚 Learning Curriculum
      </Typography>
      
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Follow this structured curriculum to master {pathData.title} skills. Complete each step to unlock the next one.
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
          isCompleted={completedVideos.includes(selectedVideo.id)}
          isBookmarked={bookmarkedVideos.includes(selectedVideo.id)}
          onBookmarkToggle={handleBookmark}
        />
      )}
    </Container>
  );
};

export default DeveloperPathLearning;