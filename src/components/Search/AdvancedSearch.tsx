import React, { useState } from 'react';
import {
  Box,
  Typography,
  Container,
  TextField,
  InputAdornment,
  Chip,
  Stack,
  Button,
  Paper,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Fade,
  ClickAwayListener,
} from '@mui/material';
import {
  Search as SearchIcon,
  TrendingUp,
  History,
  School,
  Article,
} from '@mui/icons-material';
import { mockLearningPaths, mockResources } from '../../data/mockData';
import LearningPathCard from '../LearningPath/LearningPathCard';
import ResourceCard from '../Resources/ResourceCard';

interface SearchResult {
  type: 'path' | 'resource';
  item: any;
  relevanceScore: number;
  matchedFields: string[];
}

const AdvancedSearch: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [recentSearches] = useState([
    'React Hooks',
    'TypeScript',
    'Node.js API',
    'Material UI',
    'JavaScript ES6',
  ]);
  const [trendingTopics] = useState([
    'React 18 Features',
    'Next.js 13',
    'TypeScript Best Practices',
    'CSS Grid',
    'GraphQL',
    'Docker',
  ]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);

    if (value.length > 0) {
      // Generate suggestions
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
        .slice(0, 3)
        .map(resource => ({ ...resource, type: 'resource' }));

      setSuggestions([...pathSuggestions, ...resourceSuggestions]);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
      setResults([]);
    }
  };

  const handleSearch = (query?: string) => {
    const searchQuery = query || searchValue;
    if (!searchQuery) return;

    // Perform search
    const pathResults = mockLearningPaths
      .map(path => {
        let score = 0;
        const matchedFields = [];

        if (path.title.toLowerCase().includes(searchQuery.toLowerCase())) {
          score += 10;
          matchedFields.push('title');
        }
        if (path.description.toLowerCase().includes(searchQuery.toLowerCase())) {
          score += 5;
          matchedFields.push('description');
        }
        if (path.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))) {
          score += 7;
          matchedFields.push('tags');
        }
        if (path.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))) {
          score += 8;
          matchedFields.push('skills');
        }

        return score > 0 ? {
          type: 'path' as const,
          item: path,
          relevanceScore: score,
          matchedFields,
        } : null;
      })
      .filter(Boolean) as SearchResult[];

    const resourceResults = mockResources
      .map(resource => {
        let score = 0;
        const matchedFields = [];

        if (resource.title.toLowerCase().includes(searchQuery.toLowerCase())) {
          score += 10;
          matchedFields.push('title');
        }
        if (resource.description.toLowerCase().includes(searchQuery.toLowerCase())) {
          score += 5;
          matchedFields.push('description');
        }
        if (resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))) {
          score += 7;
          matchedFields.push('tags');
        }

        return score > 0 ? {
          type: 'resource' as const,
          item: resource,
          relevanceScore: score,
          matchedFields,
        } : null;
      })
      .filter(Boolean) as SearchResult[];

    const allResults = [...pathResults, ...resourceResults]
      .sort((a, b) => b.relevanceScore - a.relevanceScore);

    setResults(allResults);
    setShowSuggestions(false);
    setSearchValue(searchQuery);
  };

  const handleSuggestionClick = (suggestion: any) => {
    handleSearch(suggestion.title);
  };

  const handleClickAway = () => {
    setShowSuggestions(false);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'path':
        return <School sx={{ color: 'primary.main' }} />;
      case 'resource':
        return <Article sx={{ color: 'secondary.main' }} />;
      default:
        return <SearchIcon />;
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
          Explore Learning Resources
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Find the perfect learning paths and resources for your journey
        </Typography>
      </Box>

      {/* Search Bar */}
      <ClickAwayListener onClickAway={handleClickAway}>
        <Box sx={{ position: 'relative', maxWidth: 600, mx: 'auto', mb: 4 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search for learning paths, resources, or topics..."
            value={searchValue}
            onChange={handleSearchChange}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'background.paper',
                borderRadius: '30px',
                '& fieldset': {
                  borderColor: 'primary.main',
                },
                '&:hover fieldset': {
                  borderColor: 'primary.dark',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'primary.main',
                  borderWidth: '2px',
                },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'primary.main' }} />
                </InputAdornment>
              ),
              endAdornment: searchValue && (
                <InputAdornment position="end">
                  <Button
                    variant="contained"
                    onClick={() => handleSearch()}
                    sx={{ borderRadius: '20px', mr: 1 }}
                  >
                    Search
                  </Button>
                </InputAdornment>
              ),
            }}
          />

          {/* Search Suggestions */}
          <Fade in={showSuggestions && suggestions.length > 0}>
            <Paper
              elevation={8}
              sx={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                mt: 1,
                borderRadius: 2,
                maxHeight: 400,
                overflow: 'auto',
                zIndex: 1300,
              }}
            >
              <List dense>
                {suggestions.map((suggestion, index) => (
                  <ListItem key={`${suggestion.type}-${suggestion.id}`} disablePadding>
                    <ListItemButton onClick={() => handleSuggestionClick(suggestion)}>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: suggestion.type === 'path' ? 'primary.main' : 'secondary.main' }}>
                          {getTypeIcon(suggestion.type)}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={suggestion.title}
                        secondary={suggestion.description}
                        primaryTypographyProps={{ fontWeight: 500 }}
                        secondaryTypographyProps={{
                          sx: {
                            display: '-webkit-box',
                            WebkitLineClamp: 1,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                          },
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Fade>
        </Box>
      </ClickAwayListener>

      {/* No search results - show trending and recent */}
      {results.length === 0 && !searchValue && (
        <Box>
          {/* Trending Topics */}
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <TrendingUp sx={{ color: 'primary.main' }} />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Trending Topics
              </Typography>
            </Box>
            <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
              {trendingTopics.map((topic) => (
                <Chip
                  key={topic}
                  label={topic}
                  onClick={() => handleSearch(topic)}
                  sx={{
                    mb: 1,
                    '&:hover': {
                      backgroundColor: 'primary.main',
                      color: 'white',
                    },
                  }}
                />
              ))}
            </Stack>
          </Box>

          {/* Recent Searches */}
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <History sx={{ color: 'text.secondary' }} />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Recent Searches
              </Typography>
            </Box>
            <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
              {recentSearches.map((search) => (
                <Chip
                  key={search}
                  label={search}
                  variant="outlined"
                  onClick={() => handleSearch(search)}
                  sx={{
                    mb: 1,
                    '&:hover': {
                      borderColor: 'primary.main',
                      color: 'primary.main',
                    },
                  }}
                />
              ))}
            </Stack>
          </Box>
        </Box>
      )}

      {/* Search Results */}
      {results.length > 0 && (
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
            Search Results ({results.length})
          </Typography>
          
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                md: 'repeat(auto-fill, minmax(350px, 1fr))',
              },
              gap: 3,
            }}
          >
            {results.map((result, index) => (
              <Box key={`${result.type}-${result.item.id}`}>
                {result.type === 'path' ? (
                  <LearningPathCard
                    path={result.item}
                    onEnroll={() => console.log('Enroll')}
                    onContinue={() => console.log('Continue')}
                    onBookmark={() => console.log('Bookmark')}
                  />
                ) : (
                  <ResourceCard
                    resource={result.item}
                    onBookmark={() => console.log('Bookmark')}
                    onOpen={() => console.log('Open')}
                  />
                )}
              </Box>
            ))}
          </Box>
        </Box>
      )}

      {/* No results found */}
      {results.length === 0 && searchValue && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
            No results found for "{searchValue}"
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Try different keywords or browse our trending topics
          </Typography>
          <Button variant="outlined" onClick={() => setSearchValue('')}>
            Clear Search
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default AdvancedSearch;