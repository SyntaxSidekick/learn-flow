import React, { useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
  Button,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material';
import {
  Search,
  FilterList,
  ViewModule,
  ViewList,
} from '@mui/icons-material';
import { Resource } from '../../types';
import ResourceCard from './ResourceCard';
import { mockResources } from '../../data/mockData';

interface ResourcesGridProps {
  resources?: Resource[];
  title?: string;
  showFilters?: boolean;
}

const ResourcesGrid: React.FC<ResourcesGridProps> = ({
  resources = mockResources,
  title = 'Learning Resources',
  showFilters = true,
}) => {
  const [filteredResources, setFilteredResources] = useState(resources);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filter logic
  React.useEffect(() => {
    let filtered = [...resources];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        resource =>
          resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
          resource.author?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Type filter
    if (typeFilter !== 'all') {
      filtered = filtered.filter(resource => resource.type === typeFilter);
    }

    // Difficulty filter
    if (difficultyFilter !== 'all') {
      filtered = filtered.filter(resource => resource.difficulty === difficultyFilter);
    }

    setFilteredResources(filtered);
  }, [resources, searchTerm, typeFilter, difficultyFilter]);

  const handleBookmark = (resourceId: string) => {
    console.log('Bookmarking resource:', resourceId);
    // TODO: Implement bookmark logic
  };

  const handleOpen = (resourceId: string) => {
    console.log('Opening resource:', resourceId);
    // TODO: Implement analytics tracking
  };

  const clearFilters = () => {
    setSearchTerm('');
    setTypeFilter('all');
    setDifficultyFilter('all');
  };

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
          {title}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Curated resources from YouTube, MDN, and other trusted sources
        </Typography>
      </Box>

      {/* Filters */}
      {showFilters && (
        <Box sx={{ mb: 4 }}>
          <Stack spacing={2}>
            {/* Search and View Toggle */}
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
              <TextField
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                size="small"
                sx={{ minWidth: 300 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />
              
              <ToggleButtonGroup
                value={viewMode}
                exclusive
                onChange={(_, value) => value && setViewMode(value)}
                size="small"
              >
                <ToggleButton value="grid">
                  <ViewModule />
                </ToggleButton>
                <ToggleButton value="list">
                  <ViewList />
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>

            {/* Filter Controls */}
            <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap' }}>
              <FormControl size="small" sx={{ minWidth: 150 }}>
                <InputLabel>Type</InputLabel>
                <Select
                  value={typeFilter}
                  label="Type"
                  onChange={(e) => setTypeFilter(e.target.value)}
                >
                  <MenuItem value="all">All Types</MenuItem>
                  <MenuItem value="youtube">YouTube Videos</MenuItem>
                  <MenuItem value="mdn">MDN Documentation</MenuItem>
                  <MenuItem value="article">Articles</MenuItem>
                  <MenuItem value="documentation">Documentation</MenuItem>
                  <MenuItem value="github">GitHub Repositories</MenuItem>
                </Select>
              </FormControl>

              <FormControl size="small" sx={{ minWidth: 150 }}>
                <InputLabel>Difficulty</InputLabel>
                <Select
                  value={difficultyFilter}
                  label="Difficulty"
                  onChange={(e) => setDifficultyFilter(e.target.value)}
                >
                  <MenuItem value="all">All Levels</MenuItem>
                  <MenuItem value="beginner">Beginner</MenuItem>
                  <MenuItem value="intermediate">Intermediate</MenuItem>
                  <MenuItem value="advanced">Advanced</MenuItem>
                </Select>
              </FormControl>

              <Button
                variant="outlined"
                startIcon={<FilterList />}
                onClick={clearFilters}
                size="small"
              >
                Clear Filters
              </Button>
            </Stack>
          </Stack>
        </Box>
      )}

      {/* Results Summary */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="body2" color="text.secondary">
          Showing {filteredResources.length} of {resources.length} resources
        </Typography>
      </Box>

      {/* Resources Grid/List */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: viewMode === 'list' ? '1fr' : 'repeat(auto-fill, minmax(300px, 1fr))',
            md: viewMode === 'list' ? '1fr' : 'repeat(auto-fill, minmax(350px, 1fr))',
          },
          gap: 3,
        }}
      >
        {filteredResources.map((resource) => (
          <ResourceCard
            key={resource.id}
            resource={resource}
            onBookmark={handleBookmark}
            onOpen={handleOpen}
          />
        ))}
      </Box>

      {/* Empty State */}
      {filteredResources.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
            No resources found
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Try adjusting your filters or search terms
          </Typography>
          <Button variant="outlined" onClick={clearFilters}>
            Clear All Filters
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default ResourcesGrid;