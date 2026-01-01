import React, { useState } from 'react';
import {
  Container,
  Paper,
  Box,
  Typography,
  Avatar,
  Button,
  TextField,
  Card,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  IconButton,
  Alert,
  Snackbar,
  Tab,
  Tabs,
} from '@mui/material';
import {
  PhotoCamera,
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Notifications,
  Security,
  Language,
  Palette,
  School,
} from '@mui/icons-material';
import { mockUser } from '../../data/mockData';
import VideoProgressManager from '../../utils/videoProgress';

interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  language: string;
  notifications: {
    email: boolean;
    push: boolean;
    learning_reminders: boolean;
    achievement_alerts: boolean;
    weekly_progress: boolean;
  };
  privacy: {
    profile_visibility: 'public' | 'private' | 'friends';
    progress_sharing: boolean;
    achievement_sharing: boolean;
  };
  learning: {
    daily_goal_minutes: number;
    difficulty_preference: 'beginner' | 'intermediate' | 'advanced' | 'mixed';
    autoplay_next_video: boolean;
    video_speed: number;
    subtitles_enabled: boolean;
  };
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => (
  <div hidden={value !== index}>
    {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
  </div>
);

const UserProfile: React.FC = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  
  const [userInfo, setUserInfo] = useState({
    name: mockUser.name,
    email: mockUser.email,
    bio: 'Passionate learner exploring the world of programming and technology.',
    location: 'San Francisco, CA',
    website: 'https://github.com/johndoe',
    linkedin: 'https://linkedin.com/in/johndoe',
    skills: ['JavaScript', 'React', 'Node.js', 'Python', 'TypeScript'],
  });

  const [preferences, setPreferences] = useState<UserPreferences>({
    theme: 'light',
    language: 'en',
    notifications: {
      email: true,
      push: true,
      learning_reminders: true,
      achievement_alerts: true,
      weekly_progress: false,
    },
    privacy: {
      profile_visibility: 'public',
      progress_sharing: true,
      achievement_sharing: true,
    },
    learning: {
      daily_goal_minutes: 60,
      difficulty_preference: 'mixed',
      autoplay_next_video: true,
      video_speed: 1.0,
      subtitles_enabled: false,
    },
  });

  // Get user statistics
  const getUserStats = () => {
    const allProgress = VideoProgressManager.getAllProgress();
    const completedVideos = Object.values(allProgress).filter(p => p.completed).length;
    const totalWatchTime = Object.values(allProgress).reduce((sum, p) => sum + p.currentTime, 0);
    const avgCompletionRate = Object.values(allProgress).length > 0 
      ? Object.values(allProgress).reduce((sum, p) => sum + (p.currentTime / p.duration) * 100, 0) / Object.values(allProgress).length
      : 0;

    return {
      completedVideos,
      totalWatchTime: Math.floor(totalWatchTime / 60), // in minutes
      avgCompletionRate: Math.round(avgCompletionRate),
      currentStreak: 7, // Mock data
      totalBadges: 12, // Mock data
    };
  };

  const stats = getUserStats();

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    // TODO: Save to backend
    setIsEditing(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setAvatarPreview(null);
    // Reset form data if needed
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Paper 
        elevation={0}
        sx={{ 
          p: 4, 
          mb: 4,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          borderRadius: 4,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <Box sx={{ position: 'relative' }}>
            <Avatar
              src={avatarPreview || mockUser.avatar}
              sx={{ 
                width: 120, 
                height: 120,
                border: '4px solid rgba(255, 255, 255, 0.3)',
                fontSize: '3rem',
                fontWeight: 700,
              }}
            >
              {userInfo.name.charAt(0)}
            </Avatar>
            {isEditing && (
              <IconButton
                component="label"
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  color: '#667eea',
                  '&:hover': {
                    backgroundColor: 'white',
                  },
                }}
              >
                <PhotoCamera />
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleAvatarUpload}
                />
              </IconButton>
            )}
          </Box>
          
          <Box sx={{ flex: 1 }}>
            <Typography variant="h3" fontWeight="bold" sx={{ mb: 1 }}>
              {userInfo.name}
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9, mb: 2 }}>
              {userInfo.email}
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.8, mb: 3 }}>
              {userInfo.bio}
            </Typography>
            
            {/* Quick Stats */}
            <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
              <Box sx={{ textAlign: 'center', minWidth: 120 }}>
                <Typography variant="h4" fontWeight="bold">
                  {stats.completedVideos}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  Videos Completed
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center', minWidth: 120 }}>
                <Typography variant="h4" fontWeight="bold">
                  {stats.totalWatchTime}m
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  Watch Time
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center', minWidth: 120 }}>
                <Typography variant="h4" fontWeight="bold">
                  {stats.currentStreak}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  Day Streak
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center', minWidth: 120 }}>
                <Typography variant="h4" fontWeight="bold">
                  {stats.totalBadges}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  Badges Earned
                </Typography>
              </Box>
            </Box>
          </Box>
          
          <Box>
            {!isEditing ? (
              <Button
                variant="outlined"
                startIcon={<EditIcon />}
                onClick={() => setIsEditing(true)}
                sx={{
                  borderColor: 'rgba(255, 255, 255, 0.5)',
                  color: 'white',
                  '&:hover': {
                    borderColor: 'white',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                Edit Profile
              </Button>
            ) : (
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  variant="contained"
                  startIcon={<SaveIcon />}
                  onClick={handleSave}
                  sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.3)',
                    },
                  }}
                >
                  Save
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<CancelIcon />}
                  onClick={handleCancel}
                  sx={{
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                    color: 'white',
                  }}
                >
                  Cancel
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      </Paper>

      {/* Tabs */}
      <Paper elevation={0} sx={{ borderRadius: 4, overflow: 'hidden' }}>
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          sx={{
            backgroundColor: '#f8fafc',
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '1rem',
            },
          }}
        >
          <Tab label="Personal Info" icon={<EditIcon />} />
          <Tab label="Preferences" icon={<Palette />} />
          <Tab label="Notifications" icon={<Notifications />} />
          <Tab label="Privacy" icon={<Security />} />
          <Tab label="Learning" icon={<School />} />
        </Tabs>

        {/* Tab Content */}
        <Box sx={{ p: 4 }}>
          {/* Personal Info Tab */}
          <TabPanel value={currentTab} index={0}>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
              <Box sx={{ flex: 1 }}>
                <TextField
                  fullWidth
                  label="Full Name"
                  value={userInfo.name}
                  onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                  disabled={!isEditing}
                  sx={{ mb: 3 }}
                />
                <TextField
                  fullWidth
                  label="Email"
                  value={userInfo.email}
                  onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                  disabled={!isEditing}
                  sx={{ mb: 3 }}
                />
                <TextField
                  fullWidth
                  label="Location"
                  value={userInfo.location}
                  onChange={(e) => setUserInfo({ ...userInfo, location: e.target.value })}
                  disabled={!isEditing}
                  sx={{ mb: 3 }}
                />
                <TextField
                  fullWidth
                  label="Website"
                  value={userInfo.website}
                  onChange={(e) => setUserInfo({ ...userInfo, website: e.target.value })}
                  disabled={!isEditing}
                  sx={{ mb: 3 }}
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Bio"
                  value={userInfo.bio}
                  onChange={(e) => setUserInfo({ ...userInfo, bio: e.target.value })}
                  disabled={!isEditing}
                  sx={{ mb: 3 }}
                />
                <TextField
                  fullWidth
                  label="LinkedIn"
                  value={userInfo.linkedin}
                  onChange={(e) => setUserInfo({ ...userInfo, linkedin: e.target.value })}
                  disabled={!isEditing}
                  sx={{ mb: 3 }}
                />
                <Box>
                  <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                    Skills & Interests
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {userInfo.skills.map((skill, index) => (
                      <Chip
                        key={index}
                        label={skill}
                        variant="outlined"
                        sx={{
                          borderColor: '#667eea',
                          color: '#667eea',
                          '&:hover': {
                            backgroundColor: 'rgba(102, 126, 234, 0.1)',
                          },
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              </Box>
            </Box>
          </TabPanel>

          {/* Preferences Tab */}
          <TabPanel value={currentTab} index={1}>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
              <Box sx={{ flex: 1 }}>
                <Card elevation={0} sx={{ p: 3, backgroundColor: '#f8fafc' }}>
                  <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                    Appearance
                  </Typography>
                  <FormControl fullWidth sx={{ mb: 3 }}>
                    <InputLabel>Theme</InputLabel>
                    <Select
                      value={preferences.theme}
                      label="Theme"
                      onChange={(e) => setPreferences({
                        ...preferences,
                        theme: e.target.value as 'light' | 'dark' | 'system'
                      })}
                    >
                      <MenuItem value="light">Light</MenuItem>
                      <MenuItem value="dark">Dark</MenuItem>
                      <MenuItem value="system">System</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel>Language</InputLabel>
                    <Select
                      value={preferences.language}
                      label="Language"
                      onChange={(e) => setPreferences({
                        ...preferences,
                        language: e.target.value
                      })}
                    >
                      <MenuItem value="en">English</MenuItem>
                      <MenuItem value="es">Spanish</MenuItem>
                      <MenuItem value="fr">French</MenuItem>
                      <MenuItem value="de">German</MenuItem>
                    </Select>
                  </FormControl>
                </Card>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Card elevation={0} sx={{ p: 3, backgroundColor: '#f8fafc' }}>
                  <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                    Quick Settings
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Language color="action" />
                      <Typography>Interface Language</Typography>
                      <Chip label="English" size="small" />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Palette color="action" />
                      <Typography>Theme</Typography>
                      <Chip label="Light Mode" size="small" />
                    </Box>
                  </Box>
                </Card>
              </Box>
            </Box>
          </TabPanel>

          {/* Add more tab panels here... */}
        </Box>
      </Paper>

      {/* Success Snackbar */}
      <Snackbar
        open={showSuccess}
        autoHideDuration={3000}
        onClose={() => setShowSuccess(false)}
      >
        <Alert severity="success" onClose={() => setShowSuccess(false)}>
          Profile updated successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default UserProfile;