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
import { LearningPath } from '../../types';
import LearningPathCard from './LearningPathCard';
import { mockLearningPaths } from '../../data/mockData';

interface LearningPathsGridProps {
  paths?: LearningPath[];
  title?: string;
  showFilters?: boolean;
}

const LearningPathsGrid: React.FC<LearningPathsGridProps> = ({
  paths = mockLearningPaths,
  title = 'Learning Paths',
  showFilters = true,
}) => {
  const [filteredPaths, setFilteredPaths] = useState(paths);
  const [searchTerm, setSearchTerm] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filter logic
  React.useEffect(() => {
    let filtered = [...paths];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        path =>
          path.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          path.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          path.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
          path.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Difficulty filter
    if (difficultyFilter !== 'all') {
      filtered = filtered.filter(path => path.difficulty === difficultyFilter);
    }

    // Category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(path => path.category === categoryFilter);
    }

    // Status filter
    if (statusFilter !== 'all') {
      if (statusFilter === 'enrolled') {
        filtered = filtered.filter(path => path.enrolled);
      } else if (statusFilter === 'completed') {
        filtered = filtered.filter(path => path.progress === 100);
      } else if (statusFilter === 'in-progress') {
        filtered = filtered.filter(path => path.enrolled && path.progress > 0 && path.progress < 100);
      } else if (statusFilter === 'not-started') {
        filtered = filtered.filter(path => !path.enrolled);
      }
    }

    setFilteredPaths(filtered);
  }, [paths, searchTerm, difficultyFilter, categoryFilter, statusFilter]);

  const handleEnroll = (pathId: string) => {
    console.log('Enrolling in path:', pathId);
    // TODO: Implement enrollment logic
  };

  const handleContinue = (pathId: string) => {
    console.log('Continuing path:', pathId);
    // TODO: Implement continue logic
  };

  const handleBookmark = (pathId: string) => {
    console.log('Bookmarking path:', pathId);
    // TODO: Implement bookmark logic
  };

  const clearFilters = () => {
    setSearchTerm('');
    setDifficultyFilter('all');
    setCategoryFilter('all');
    setStatusFilter('all');
  };

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
          {title}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Discover and master new skills with our curated learning paths
        </Typography>
      </Box>

      {/* Filters */}
      {showFilters && (
        <Box sx={{ mb: 4 }}>
          <Stack spacing={2}>
            {/* Search and View Toggle */}
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
              <TextField
                placeholder="Search learning paths..."
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

              <FormControl size="small" sx={{ minWidth: 150 }}>
                <InputLabel>Category</InputLabel>
                <Select
                  value={categoryFilter}
                  label="Category"
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <MenuItem value="all">All Categories</MenuItem>
                  <MenuItem value="frontend">Frontend</MenuItem>
                  <MenuItem value="backend">Backend</MenuItem>
                  <MenuItem value="fullstack">Full Stack</MenuItem>
                  <MenuItem value="mobile">Mobile</MenuItem>
                  <MenuItem value="data-science">Data Science</MenuItem>
                  <MenuItem value="devops">DevOps</MenuItem>
                </Select>
              </FormControl>

              <FormControl size="small" sx={{ minWidth: 150 }}>
                <InputLabel>Status</InputLabel>
                <Select
                  value={statusFilter}
                  label="Status"
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="enrolled">Enrolled</MenuItem>
                  <MenuItem value="completed">Completed</MenuItem>
                  <MenuItem value="in-progress">In Progress</MenuItem>
                  <MenuItem value="not-started">Not Started</MenuItem>
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
          Showing {filteredPaths.length} of {paths.length} learning paths
        </Typography>
      </Box>

      {/* Learning Paths Grid/List */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: viewMode === 'list' ? '1fr' : 'repeat(auto-fill, minmax(350px, 1fr))',
            md: viewMode === 'list' ? '1fr' : 'repeat(auto-fill, minmax(380px, 1fr))',
          },
          gap: 3,
        }}
      >
        {filteredPaths.map((path) => (
          <LearningPathCard
            key={path.id}
            path={path}
            onEnroll={handleEnroll}
            onContinue={handleContinue}
            onBookmark={handleBookmark}
          />
        ))}
      </Box>

      {/* Empty State */}
      {filteredPaths.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
            No learning paths found
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

export default LearningPathsGrid;