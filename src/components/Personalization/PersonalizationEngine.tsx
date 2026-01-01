import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Chip,
  Stack,
  Container,
  Slider,
  Switch,
  FormControlLabel,
  Paper,
  Avatar,
  LinearProgress,
} from '@mui/material';
import {
  Psychology,
  GpsFixed as Target,
  Schedule,
  Star,
  TrendingUp,
} from '@mui/icons-material';
import { UserPreferences } from '../../types';
import { mockUser, mockLearningPaths } from '../../data/mockData';
import LearningPathCard from '../LearningPath/LearningPathCard';

interface PersonalizationEngineProps {
  onPreferencesChange?: (preferences: UserPreferences) => void;
}

const PersonalizationEngine: React.FC<PersonalizationEngineProps> = ({
  onPreferencesChange,
}) => {
  const [preferences, setPreferences] = useState<UserPreferences>(mockUser.preferences);
  const [currentStep, setCurrentStep] = useState(0);
  const [showRecommendations, setShowRecommendations] = useState(false);

  const steps = [
    'Learning Topics',
    'Learning Style',
    'Difficulty Level',
    'Time Availability',
    'Preferences',
  ];

  const availableTopics = [
    'React', 'Vue', 'Angular', 'JavaScript', 'TypeScript',
    'Node.js', 'Python', 'Java', 'C#', 'PHP',
    'HTML/CSS', 'Sass/SCSS', 'Bootstrap', 'Material UI',
    'MongoDB', 'PostgreSQL', 'MySQL', 'Firebase',
    'AWS', 'Docker', 'Kubernetes', 'Git',
    'GraphQL', 'REST APIs', 'WebSocket', 'Testing',
    'Redux', 'MobX', 'Context API', 'Hooks',
  ];

  const learningStyles = [
    { value: 'visual', label: 'Visual', description: 'Learn best through diagrams, videos, and visual content', icon: '👁️' },
    { value: 'auditory', label: 'Auditory', description: 'Learn best through listening and discussions', icon: '👂' },
    { value: 'reading', label: 'Reading/Writing', description: 'Learn best through reading and taking notes', icon: '📚' },
    { value: 'kinesthetic', label: 'Kinesthetic', description: 'Learn best through hands-on practice', icon: '✋' },
  ];

  const difficultyLevels = [
    { value: 'beginner', label: 'Beginner', description: 'New to programming or the topic', color: 'success' },
    { value: 'intermediate', label: 'Intermediate', description: 'Some experience, ready for more advanced topics', color: 'warning' },
    { value: 'advanced', label: 'Advanced', description: 'Experienced, looking for expert-level content', color: 'error' },
  ];

  const handleTopicToggle = (topic: string) => {
    const newTopics = preferences.preferredTopics.includes(topic)
      ? preferences.preferredTopics.filter(t => t !== topic)
      : [...preferences.preferredTopics, topic];
    
    setPreferences({ ...preferences, preferredTopics: newTopics });
  };

  const handleStyleChange = (style: string) => {
    setPreferences({ ...preferences, learningStyle: style as any });
  };

  const handleDifficultyChange = (difficulty: string) => {
    setPreferences({ ...preferences, difficultyLevel: difficulty as any });
  };

  const handleTimeChange = (event: Event, value: number | number[]) => {
    setPreferences({ ...preferences, timeAvailability: value as number });
  };

  const handleSavePreferences = () => {
    onPreferencesChange?.(preferences);
    setShowRecommendations(true);
  };

  const getRecommendedPaths = () => {
    return mockLearningPaths.filter(path => {
      // Filter by difficulty
      if (path.difficulty !== preferences.difficultyLevel) return false;
      
      // Filter by topics (at least one matching topic in tags or skills)
      const hasMatchingTopic = preferences.preferredTopics.some(topic =>
        path.tags.some(tag => tag.toLowerCase().includes(topic.toLowerCase())) ||
        path.skills.some(skill => skill.toLowerCase().includes(topic.toLowerCase()))
      );
      
      return hasMatchingTopic;
    });
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0: // Learning Topics
        return (
          <Card>
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Avatar sx={{ bgcolor: 'primary.main' }}>
                  <Target />
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    What would you like to learn?
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Select the topics that interest you most
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Selected: {preferences.preferredTopics.length} topics
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {availableTopics.map((topic) => (
                    <Chip
                      key={topic}
                      label={topic}
                      onClick={() => handleTopicToggle(topic)}
                      color={preferences.preferredTopics.includes(topic) ? 'primary' : 'default'}
                      variant={preferences.preferredTopics.includes(topic) ? 'filled' : 'outlined'}
                      sx={{
                        '&:hover': {
                          backgroundColor: preferences.preferredTopics.includes(topic) 
                            ? 'primary.dark' 
                            : 'action.hover',
                        },
                      }}
                    />
                  ))}
                </Box>
              </Box>
            </CardContent>
          </Card>
        );

      case 1: // Learning Style
        return (
          <Card>
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Avatar sx={{ bgcolor: 'secondary.main' }}>
                  <Psychology />
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    How do you learn best?
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Choose your preferred learning style
                  </Typography>
                </Box>
              </Box>

              <Stack spacing={2}>
                {learningStyles.map((style) => (
                  <Paper
                    key={style.value}
                    elevation={0}
                    sx={{
                      p: 3,
                      border: '2px solid',
                      borderColor: preferences.learningStyle === style.value ? 'primary.main' : 'divider',
                      borderRadius: 2,
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        borderColor: 'primary.main',
                        backgroundColor: 'action.hover',
                      },
                    }}
                    onClick={() => handleStyleChange(style.value)}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Typography variant="h4">{style.icon}</Typography>
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                          {style.label}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {style.description}
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>
                ))}
              </Stack>
            </CardContent>
          </Card>
        );

      case 2: // Difficulty Level
        return (
          <Card>
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Avatar sx={{ bgcolor: 'warning.main' }}>
                  <TrendingUp />
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    What's your experience level?
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Help us recommend content at the right difficulty
                  </Typography>
                </Box>
              </Box>

              <Stack spacing={2}>
                {difficultyLevels.map((level) => (
                  <Paper
                    key={level.value}
                    elevation={0}
                    sx={{
                      p: 3,
                      border: '2px solid',
                      borderColor: preferences.difficultyLevel === level.value ? `${level.color}.main` : 'divider',
                      borderRadius: 2,
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        borderColor: `${level.color}.main`,
                        backgroundColor: 'action.hover',
                      },
                    }}
                    onClick={() => handleDifficultyChange(level.value)}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                          {level.label}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {level.description}
                        </Typography>
                      </Box>
                      <Chip
                        label={level.label}
                        color={level.color as any}
                        variant={preferences.difficultyLevel === level.value ? 'filled' : 'outlined'}
                      />
                    </Box>
                  </Paper>
                ))}
              </Stack>
            </CardContent>
          </Card>
        );

      case 3: // Time Availability
        return (
          <Card>
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Avatar sx={{ bgcolor: 'info.main' }}>
                  <Schedule />
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    How much time can you dedicate?
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Help us suggest a realistic learning schedule
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ px: 2 }}>
                <Typography variant="h4" sx={{ textAlign: 'center', mb: 2, fontWeight: 600 }}>
                  {preferences.timeAvailability} hours per week
                </Typography>
                <Slider
                  value={preferences.timeAvailability}
                  onChange={handleTimeChange}
                  min={1}
                  max={30}
                  step={1}
                  marks={[
                    { value: 1, label: '1h' },
                    { value: 5, label: '5h' },
                    { value: 10, label: '10h' },
                    { value: 20, label: '20h' },
                    { value: 30, label: '30h' },
                  ]}
                  sx={{
                    '& .MuiSlider-thumb': {
                      width: 24,
                      height: 24,
                    },
                    '& .MuiSlider-track': {
                      height: 8,
                    },
                    '& .MuiSlider-rail': {
                      height: 8,
                    },
                  }}
                />
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mt: 2 }}>
                  {preferences.timeAvailability < 5 && "Perfect for busy schedules - focused, bite-sized learning"}
                  {preferences.timeAvailability >= 5 && preferences.timeAvailability < 15 && "Great balance - steady progress with consistent learning"}
                  {preferences.timeAvailability >= 15 && "Intensive learning - rapid skill development"}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        );

      case 4: // Additional Preferences
        return (
          <Card>
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Avatar sx={{ bgcolor: 'success.main' }}>
                  <Star />
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Final preferences
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Customize your learning experience
                  </Typography>
                </Box>
              </Box>

              <Stack spacing={3}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={preferences.notifications}
                      onChange={(e) => setPreferences({ ...preferences, notifications: e.target.checked })}
                    />
                  }
                  label={
                    <Box>
                      <Typography variant="subtitle2">Learning Reminders</Typography>
                      <Typography variant="caption" color="text.secondary">
                        Get notified about your learning goals and new content
                      </Typography>
                    </Box>
                  }
                />

                <FormControlLabel
                  control={
                    <Switch
                      checked={preferences.darkMode}
                      onChange={(e) => setPreferences({ ...preferences, darkMode: e.target.checked })}
                    />
                  }
                  label={
                    <Box>
                      <Typography variant="subtitle2">Dark Mode</Typography>
                      <Typography variant="caption" color="text.secondary">
                        Use dark theme for better readability in low light
                      </Typography>
                    </Box>
                  }
                />
              </Stack>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {!showRecommendations ? (
        <>
          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
              Personalize Your Learning
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Help us create the perfect learning experience for you
            </Typography>
          </Box>

          {/* Progress */}
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Step {currentStep + 1} of {steps.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {Math.round(((currentStep + 1) / steps.length) * 100)}% Complete
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={((currentStep + 1) / steps.length) * 100}
              sx={{ height: 8, borderRadius: 4 }}
            />
            <Typography variant="h6" sx={{ mt: 2, fontWeight: 500 }}>
              {steps[currentStep]}
            </Typography>
          </Box>

          {/* Step Content */}
          {renderStep()}

          {/* Navigation */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Button
              variant="outlined"
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
            >
              Previous
            </Button>
            {currentStep === steps.length - 1 ? (
              <Button
                variant="contained"
                onClick={handleSavePreferences}
                size="large"
                sx={{ px: 4 }}
              >
                Get My Recommendations
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
              >
                Next
              </Button>
            )}
          </Box>
        </>
      ) : (
        /* Recommendations */
        <Box>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
              🎯 Perfect Matches for You!
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Based on your preferences, here are the learning paths we recommend
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                md: 'repeat(auto-fill, minmax(350px, 1fr))',
              },
              gap: 3,
              mb: 4,
            }}
          >
            {getRecommendedPaths().map((path) => (
              <LearningPathCard
                key={path.id}
                path={path}
                onEnroll={() => console.log('Enroll')}
                onContinue={() => console.log('Continue')}
                onBookmark={() => console.log('Bookmark')}
              />
            ))}
          </Box>

          <Box sx={{ textAlign: 'center' }}>
            <Button
              variant="outlined"
              onClick={() => setShowRecommendations(false)}
              sx={{ mr: 2 }}
            >
              Update Preferences
            </Button>
            <Button variant="contained" size="large">
              Start Learning
            </Button>
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default PersonalizationEngine;