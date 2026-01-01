import React, { useState } from 'react';
import {
  TextField,
  InputAdornment,
  IconButton,
  Paper,
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Chip,
  Fade,
  ClickAwayListener,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { mockLearningPaths, mockResources } from '../../data/mockData';

const SearchBar: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<any[]>([]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);

    if (value.length > 0) {
      // Filter learning paths and resources
      const pathSuggestions = mockLearningPaths
        .filter(path => 
          path.title.toLowerCase().includes(value.toLowerCase()) ||
          path.description.toLowerCase().includes(value.toLowerCase()) ||
          path.tags.some(tag => tag.toLowerCase().includes(value.toLowerCase()))
        )
        .slice(0, 3)
        .map(path => ({ ...path, type: 'path' }));

      const resourceSuggestions = mockResources
        .filter(resource => 
          resource.title.toLowerCase().includes(value.toLowerCase()) ||
          resource.description.toLowerCase().includes(value.toLowerCase()) ||
          resource.tags.some(tag => tag.toLowerCase().includes(value.toLowerCase()))
        )
        .slice(0, 2)
        .map(resource => ({ ...resource, type: 'resource' }));

      setSuggestions([...pathSuggestions, ...resourceSuggestions]);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleClearSearch = () => {
    setSearchValue('');
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (suggestion: any) => {
    setSearchValue(suggestion.title);
    setShowSuggestions(false);
    // Handle navigation to the selected item
    console.log('Selected:', suggestion);
  };

  const handleClickAway = () => {
    setShowSuggestions(false);
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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'path':
        return '📚';
      case 'resource':
        return '🔗';
      default:
        return '📄';
    }
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box sx={{ position: 'relative', width: '100%', maxWidth: 600 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search learning paths, resources, or topics..."
          value={searchValue}
          onChange={handleSearchChange}
          size="small"
          sx={{
            '& .MuiOutlinedInput-root': {
              bgcolor: 'background.paper',
              backdropFilter: 'blur(20px)',
              borderRadius: '16px',
              border: 1,
              borderColor: 'divider',
              transition: 'all 0.3s ease',
              '& fieldset': {
                border: 'none',
              },
              '&:hover': {
                borderColor: 'primary.light',
                boxShadow: 1,
              },
              '&.Mui-focused': {
                borderColor: 'primary.main',
                boxShadow: 2,
              },
            },
            '& .MuiInputBase-input': {
              py: 1.5,
              px: 2,
              fontWeight: 500,
              color: 'text.primary',
              '&::placeholder': {
                color: 'text.secondary',
                opacity: 0.7,
              },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'text.secondary' }} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                {searchValue && (
                  <IconButton
                    size="small"
                    onClick={handleClearSearch}
                    sx={{ mr: 1 }}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                )}
                <IconButton size="small">
                  <FilterIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {/* Search Suggestions */}
        <Fade in={showSuggestions && suggestions.length > 0}>
          <Paper
            elevation={0}
            sx={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              mt: 1,
              borderRadius: 4,
              maxHeight: 400,
              overflow: 'auto',
              zIndex: 1300,
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            }}
          >
            <Box sx={{ p: 1 }}>
              <Typography
                variant="caption"
                sx={{
                  color: 'text.secondary',
                  px: 2,
                  py: 1,
                  display: 'block',
                  fontWeight: 600,
                }}
              >
                SUGGESTIONS
              </Typography>
              <List dense>
                {suggestions.map((suggestion, index) => (
                  <ListItem key={`${suggestion.type}-${suggestion.id}`} disablePadding>
                    <ListItemButton
                      onClick={() => handleSuggestionClick(suggestion)}
                      sx={{
                        borderRadius: 1,
                        mx: 1,
                        '&:hover': {
                          backgroundColor: 'action.hover',
                        },
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar
                          sx={{
                            bgcolor: suggestion.type === 'path' ? 'primary.main' : 'secondary.main',
                            width: 32,
                            height: 32,
                            fontSize: '1rem',
                          }}
                        >
                          {getTypeIcon(suggestion.type)}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                              {suggestion.title}
                            </Typography>
                            <Chip
                              label={suggestion.difficulty}
                              size="small"
                              color={getDifficultyColor(suggestion.difficulty) as any}
                              sx={{ height: 20, fontSize: '0.75rem' }}
                            />
                          </Box>
                        }
                        secondary={
                          <Typography
                            variant="caption"
                            sx={{
                              color: 'text.secondary',
                              display: '-webkit-box',
                              WebkitLineClamp: 1,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                            }}
                          >
                            {suggestion.description}
                          </Typography>
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Paper>
        </Fade>
      </Box>
    </ClickAwayListener>
  );
};

export default SearchBar;