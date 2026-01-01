export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  channel: string;
  publishedAt: string;
  viewCount: string;
  url: string;
  tags: string[];
}

export interface TopicVideoData {
  [key: string]: {
    title: string;
    description: string;
    videos: Video[];
    totalDuration: string;
    skillsLearned: string[];
  };
}

export const topicVideos: TopicVideoData = {
  javascript: {
    title: 'JavaScript Fundamentals',
    description: 'Master JavaScript from basics to advanced concepts with Google Developers',
    totalDuration: '8h 45m',
    skillsLearned: ['Variables & Data Types', 'Functions', 'DOM Manipulation', 'Async Programming', 'ES6+ Features'],
    videos: [
      {
        id: 'js-1',
        title: 'JavaScript Fundamentals - Variables and Data Types',
        description: 'Learn the basics of JavaScript variables, data types, and how to use them effectively.',
        thumbnail: 'https://i.ytimg.com/vi/W6NZfCO5SIk/maxresdefault.jpg',
        duration: '12:34',
        difficulty: 'beginner',
        channel: 'Google for Developers',
        publishedAt: '2024-10-15',
        viewCount: '125K',
        url: 'https://www.youtube.com/watch?v=W6NZfCO5SIk',
        tags: ['variables', 'data-types', 'basics']
      },
      {
        id: 'js-2',
        title: 'Functions in JavaScript - Complete Guide',
        description: 'Comprehensive guide to JavaScript functions, arrow functions, and best practices.',
        thumbnail: 'https://i.ytimg.com/vi/N8ap4k_1QEQ/maxresdefault.jpg',
        duration: '18:42',
        difficulty: 'beginner',
        channel: 'Google for Developers',
        publishedAt: '2024-10-20',
        viewCount: '98K',
        url: 'https://www.youtube.com/watch?v=N8ap4k_1QEQ',
        tags: ['functions', 'arrow-functions', 'scope']
      },
      {
        id: 'js-3',
        title: 'DOM Manipulation Made Easy',
        description: 'Learn how to interact with the DOM using modern JavaScript techniques.',
        thumbnail: 'https://i.ytimg.com/vi/0ik6X4DJKCc/maxresdefault.jpg',
        duration: '25:18',
        difficulty: 'intermediate',
        channel: 'Google for Developers',
        publishedAt: '2024-10-25',
        viewCount: '156K',
        url: 'https://www.youtube.com/watch?v=0ik6X4DJKCc',
        tags: ['dom', 'events', 'manipulation']
      },
      {
        id: 'js-4',
        title: 'Async JavaScript - Promises and Async/Await',
        description: 'Master asynchronous programming with promises, async/await, and fetch API.',
        thumbnail: 'https://i.ytimg.com/vi/V_Kr9OSfDeU/maxresdefault.jpg',
        duration: '32:15',
        difficulty: 'intermediate',
        channel: 'Google for Developers',
        publishedAt: '2024-11-01',
        viewCount: '89K',
        url: 'https://www.youtube.com/watch?v=V_Kr9OSfDeU',
        tags: ['async', 'promises', 'fetch']
      },
      {
        id: 'js-5',
        title: 'Advanced JavaScript Patterns and Performance',
        description: 'Learn advanced JavaScript patterns, performance optimization, and modern best practices.',
        thumbnail: 'https://i.ytimg.com/vi/Mus_vwhTCq0/maxresdefault.jpg',
        duration: '45:30',
        difficulty: 'advanced',
        channel: 'Google for Developers',
        publishedAt: '2024-11-02',
        viewCount: '67K',
        url: 'https://www.youtube.com/watch?v=Mus_vwhTCq0',
        tags: ['patterns', 'performance', 'optimization']
      }
    ]
  },
  typescript: {
    title: 'TypeScript Mastery',
    description: 'Learn TypeScript with Google developers and build type-safe applications',
    totalDuration: '6h 30m',
    skillsLearned: ['Type Annotations', 'Interfaces', 'Generics', 'Decorators', 'Advanced Types'],
    videos: [
      {
        id: 'ts-1',
        title: 'TypeScript for JavaScript Developers',
        description: 'Introduction to TypeScript and its benefits over plain JavaScript.',
        thumbnail: 'https://i.ytimg.com/vi/BwuLxPH8IDs/maxresdefault.jpg',
        duration: '15:22',
        difficulty: 'beginner',
        channel: 'Google for Developers',
        publishedAt: '2024-10-12',
        viewCount: '203K',
        url: 'https://www.youtube.com/watch?v=BwuLxPH8IDs',
        tags: ['typescript', 'introduction', 'types']
      },
      {
        id: 'ts-2',
        title: 'TypeScript Interfaces and Types',
        description: 'Deep dive into TypeScript interfaces, type aliases, and when to use each.',
        thumbnail: 'https://i.ytimg.com/vi/1Z1jw3GI4PQ/maxresdefault.jpg',
        duration: '22:45',
        difficulty: 'intermediate',
        channel: 'Google for Developers',
        publishedAt: '2024-10-18',
        viewCount: '142K',
        url: 'https://www.youtube.com/watch?v=1Z1jw3GI4PQ',
        tags: ['interfaces', 'types', 'aliases']
      },
      {
        id: 'ts-3',
        title: 'Advanced TypeScript - Generics and Utility Types',
        description: 'Master advanced TypeScript features like generics, utility types, and conditional types.',
        thumbnail: 'https://i.ytimg.com/vi/nePDL5lQSE4/maxresdefault.jpg',
        duration: '38:12',
        difficulty: 'advanced',
        channel: 'Google for Developers',
        publishedAt: '2024-10-28',
        viewCount: '95K',
        url: 'https://www.youtube.com/watch?v=nePDL5lQSE4',
        tags: ['generics', 'utility-types', 'advanced']
      }
    ]
  },
  html: {
    title: 'HTML5 & Semantic Web',
    description: 'Modern HTML5 development with semantic markup and accessibility',
    totalDuration: '4h 20m',
    skillsLearned: ['Semantic HTML', 'Forms', 'Media Elements', 'Accessibility', 'SEO Basics'],
    videos: [
      {
        id: 'html-1',
        title: 'Semantic HTML5 - Building Meaningful Web Content',
        description: 'Learn to write semantic HTML5 that improves accessibility and SEO.',
        thumbnail: 'https://i.ytimg.com/vi/UB1O30fR-EE/maxresdefault.jpg',
        duration: '16:30',
        difficulty: 'beginner',
        channel: 'Google for Developers',
        publishedAt: '2024-10-08',
        viewCount: '178K',
        url: 'https://www.youtube.com/watch?v=UB1O30fR-EE',
        tags: ['semantic', 'html5', 'accessibility']
      },
      {
        id: 'html-2',
        title: 'Advanced HTML Forms and Validation',
        description: 'Create powerful, accessible forms with modern HTML5 features.',
        thumbnail: 'https://i.ytimg.com/vi/fNcJuPIZ2WE/maxresdefault.jpg',
        duration: '24:15',
        difficulty: 'intermediate',
        channel: 'Google for Developers',
        publishedAt: '2024-10-22',
        viewCount: '112K',
        url: 'https://www.youtube.com/watch?v=fNcJuPIZ2WE',
        tags: ['forms', 'validation', 'input-types']
      }
    ]
  },
  css: {
    title: 'Modern CSS & Layout',
    description: 'Master modern CSS with Grid, Flexbox, and cutting-edge features',
    totalDuration: '7h 15m',
    skillsLearned: ['Flexbox', 'CSS Grid', 'Animations', 'Custom Properties', 'Responsive Design'],
    videos: [
      {
        id: 'css-1',
        title: 'CSS Flexbox Complete Guide',
        description: 'Master CSS Flexbox layout with practical examples and best practices.',
        thumbnail: 'https://i.ytimg.com/vi/3YW65K6LcIA/maxresdefault.jpg',
        duration: '28:45',
        difficulty: 'beginner',
        channel: 'Google for Developers',
        publishedAt: '2024-10-05',
        viewCount: '234K',
        url: 'https://www.youtube.com/watch?v=3YW65K6LcIA',
        tags: ['flexbox', 'layout', 'responsive']
      },
      {
        id: 'css-2',
        title: 'CSS Grid Layout - From Zero to Hero',
        description: 'Complete guide to CSS Grid layout for modern web development.',
        thumbnail: 'https://i.ytimg.com/vi/jV8B24rSN5o/maxresdefault.jpg',
        duration: '35:20',
        difficulty: 'intermediate',
        channel: 'Google for Developers',
        publishedAt: '2024-10-14',
        viewCount: '189K',
        url: 'https://www.youtube.com/watch?v=jV8B24rSN5o',
        tags: ['grid', 'layout', 'advanced']
      },
      {
        id: 'css-3',
        title: 'CSS Animations and Transitions Masterclass',
        description: 'Create stunning animations and smooth transitions with modern CSS.',
        thumbnail: 'https://i.ytimg.com/vi/68O6eOGAGqA/maxresdefault.jpg',
        duration: '42:30',
        difficulty: 'advanced',
        channel: 'Google for Developers',
        publishedAt: '2024-10-30',
        viewCount: '156K',
        url: 'https://www.youtube.com/watch?v=68O6eOGAGqA',
        tags: ['animations', 'transitions', 'keyframes']
      }
    ]
  },
  react: {
    title: 'React Development',
    description: 'Build modern web applications with React and its ecosystem',
    totalDuration: '9h 45m',
    skillsLearned: ['Components', 'Hooks', 'State Management', 'Performance', 'Testing'],
    videos: [
      {
        id: 'react-1',
        title: 'React Fundamentals - Components and JSX',
        description: 'Learn React basics: components, JSX, and the virtual DOM.',
        thumbnail: 'https://i.ytimg.com/vi/Tn6-PIqc4UM/maxresdefault.jpg',
        duration: '22:15',
        difficulty: 'beginner',
        channel: 'Google for Developers',
        publishedAt: '2024-10-10',
        viewCount: '312K',
        url: 'https://www.youtube.com/watch?v=Tn6-PIqc4UM',
        tags: ['react', 'components', 'jsx']
      },
      {
        id: 'react-2',
        title: 'React Hooks - useState, useEffect, and Custom Hooks',
        description: 'Master React Hooks for modern functional component development.',
        thumbnail: 'https://i.ytimg.com/vi/O6P86uwfdR0/maxresdefault.jpg',
        duration: '34:50',
        difficulty: 'intermediate',
        channel: 'Google for Developers',
        publishedAt: '2024-10-24',
        viewCount: '245K',
        url: 'https://www.youtube.com/watch?v=O6P86uwfdR0',
        tags: ['hooks', 'usestate', 'useeffect']
      },
      {
        id: 'react-3',
        title: 'Advanced React Patterns and Performance',
        description: 'Learn advanced React patterns, optimization techniques, and performance best practices.',
        thumbnail: 'https://i.ytimg.com/vi/3XaXKiXtNjw/maxresdefault.jpg',
        duration: '48:25',
        difficulty: 'advanced',
        channel: 'Google for Developers',
        publishedAt: '2024-11-01',
        viewCount: '187K',
        url: 'https://www.youtube.com/watch?v=3XaXKiXtNjw',
        tags: ['patterns', 'performance', 'optimization']
      }
    ]
  },
  nodejs: {
    title: 'Node.js Backend Development',
    description: 'Build scalable backend applications with Node.js and modern tools',
    totalDuration: '8h 20m',
    skillsLearned: ['Express.js', 'APIs', 'Database Integration', 'Authentication', 'Deployment'],
    videos: [
      {
        id: 'node-1',
        title: 'Node.js Fundamentals - Getting Started',
        description: 'Introduction to Node.js, npm, and building your first server.',
        thumbnail: 'https://i.ytimg.com/vi/RLtyhwFtXQA/maxresdefault.jpg',
        duration: '19:30',
        difficulty: 'beginner',
        channel: 'Google for Developers',
        publishedAt: '2024-10-07',
        viewCount: '198K',
        url: 'https://www.youtube.com/watch?v=RLtyhwFtXQA',
        tags: ['nodejs', 'server', 'basics']
      },
      {
        id: 'node-2',
        title: 'Building REST APIs with Express.js',
        description: 'Create robust REST APIs using Express.js framework and middleware.',
        thumbnail: 'https://i.ytimg.com/vi/L72fhGm1tfE/maxresdefault.jpg',
        duration: '31:45',
        difficulty: 'intermediate',
        channel: 'Google for Developers',
        publishedAt: '2024-10-19',
        viewCount: '167K',
        url: 'https://www.youtube.com/watch?v=L72fhGm1tfE',
        tags: ['express', 'api', 'rest']
      },
      {
        id: 'node-3',
        title: 'Advanced Node.js - Performance and Scaling',
        description: 'Learn advanced Node.js concepts for building high-performance applications.',
        thumbnail: 'https://i.ytimg.com/vi/9aKtJ_AuedI/maxresdefault.jpg',
        duration: '41:20',
        difficulty: 'advanced',
        channel: 'Google for Developers',
        publishedAt: '2024-10-29',
        viewCount: '134K',
        url: 'https://www.youtube.com/watch?v=9aKtJ_AuedI',
        tags: ['performance', 'scaling', 'advanced']
      }
    ]
  }
};

export const getDifficultyColor = (difficulty: string): string => {
  switch (difficulty) {
    case 'beginner':
      return '#4caf50';
    case 'intermediate':
      return '#ff9800';
    case 'advanced':
      return '#f44336';
    default:
      return '#757575';
  }
};

export const getDifficultyOrder = (difficulty: string): number => {
  switch (difficulty) {
    case 'beginner':
      return 1;
    case 'intermediate':
      return 2;
    case 'advanced':
      return 3;
    default:
      return 4;
  }
};