export interface PathVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  topic: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  channel: string;
  publishedAt: string;
  viewCount: string;
  url: string;
  tags: string[];
  order: number;
}

export interface DeveloperPath {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  duration: string;
  skillsGained: string[];
  careerOpportunities: string[];
  averageSalary: string;
  videos: PathVideo[];
  roadmapSteps: string[];
}

export const developerPaths: { [key: string]: DeveloperPath } = {
  'frontend-developer': {
    id: 'frontend-developer',
    title: 'Frontend Developer',
    description: 'Build beautiful, interactive user interfaces for web applications',
    icon: '🎨',
    color: '#e91e63',
    duration: '6-8 months',
    averageSalary: '$75,000 - $120,000',
    skillsGained: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Vue.js', 'Responsive Design', 'APIs', 'Version Control'],
    careerOpportunities: ['Frontend Developer', 'UI Developer', 'React Developer', 'Web Developer', 'JavaScript Developer'],
    roadmapSteps: [
      'HTML & CSS Fundamentals',
      'JavaScript Core Concepts',
      'DOM Manipulation & Events',
      'CSS Frameworks & Responsive Design',
      'JavaScript ES6+ Features',
      'Frontend Framework (React/Vue)',
      'API Integration & Fetch',
      'State Management',
      'Build Tools & Deployment'
    ],
    videos: [
      {
        id: 'fe-1',
        title: 'HTML5 Semantic Elements & Structure',
        description: 'Learn modern HTML5 semantic elements and how to structure web pages properly.',
        thumbnail: 'https://i.ytimg.com/vi/UB1O30fR-EE/maxresdefault.jpg',
        duration: '18:45',
        topic: 'HTML',
        difficulty: 'beginner',
        channel: 'Google for Developers',
        publishedAt: '2024-10-08',
        viewCount: '245K',
        url: 'https://www.youtube.com/watch?v=UB1O30fR-EE',
        tags: ['html5', 'semantic', 'structure'],
        order: 1
      },
      {
        id: 'fe-2',
        title: 'CSS Flexbox Complete Guide',
        description: 'Master CSS Flexbox for modern layouts and responsive design.',
        thumbnail: 'https://i.ytimg.com/vi/3YW65K6LcIA/maxresdefault.jpg',
        duration: '28:30',
        topic: 'CSS',
        difficulty: 'beginner',
        channel: 'Google for Developers',
        publishedAt: '2024-10-10',
        viewCount: '312K',
        url: 'https://www.youtube.com/watch?v=3YW65K6LcIA',
        tags: ['css', 'flexbox', 'layout'],
        order: 2
      },
      {
        id: 'fe-3',
        title: 'CSS Grid Layout Mastery',
        description: 'Learn CSS Grid for complex, responsive web layouts.',
        thumbnail: 'https://i.ytimg.com/vi/jV8B24rSN5o/maxresdefault.jpg',
        duration: '35:20',
        topic: 'CSS',
        difficulty: 'intermediate',
        channel: 'Google for Developers',
        publishedAt: '2024-10-12',
        viewCount: '289K',
        url: 'https://www.youtube.com/watch?v=jV8B24rSN5o',
        tags: ['css', 'grid', 'responsive'],
        order: 3
      },
      {
        id: 'fe-4',
        title: 'JavaScript Fundamentals for Web Development',
        description: 'Essential JavaScript concepts every frontend developer needs to know.',
        thumbnail: 'https://i.ytimg.com/vi/W6NZfCO5SIk/maxresdefault.jpg',
        duration: '42:15',
        topic: 'JavaScript',
        difficulty: 'beginner',
        channel: 'Google for Developers',
        publishedAt: '2024-10-15',
        viewCount: '456K',
        url: 'https://www.youtube.com/watch?v=W6NZfCO5SIk',
        tags: ['javascript', 'fundamentals', 'frontend'],
        order: 4
      },
      {
        id: 'fe-5',
        title: 'DOM Manipulation & Event Handling',
        description: 'Learn to interact with web pages using JavaScript DOM APIs.',
        thumbnail: 'https://i.ytimg.com/vi/0ik6X4DJKCc/maxresdefault.jpg',
        duration: '33:45',
        topic: 'JavaScript',
        difficulty: 'intermediate',
        channel: 'Google for Developers',
        publishedAt: '2024-10-18',
        viewCount: '198K',
        url: 'https://www.youtube.com/watch?v=0ik6X4DJKCc',
        tags: ['javascript', 'dom', 'events'],
        order: 5
      },
      {
        id: 'fe-6',
        title: 'Fetch API & Working with REST APIs',
        description: 'Master API integration and asynchronous data fetching in JavaScript.',
        thumbnail: 'https://i.ytimg.com/vi/V_Kr9OSfDeU/maxresdefault.jpg',
        duration: '29:30',
        topic: 'APIs',
        difficulty: 'intermediate',
        channel: 'Google for Developers',
        publishedAt: '2024-10-20',
        viewCount: '167K',
        url: 'https://www.youtube.com/watch?v=V_Kr9OSfDeU',
        tags: ['api', 'fetch', 'async'],
        order: 6
      },
      {
        id: 'fe-7',
        title: 'React Fundamentals - Components & JSX',
        description: 'Get started with React for building modern user interfaces.',
        thumbnail: 'https://i.ytimg.com/vi/Tn6-PIqc4UM/maxresdefault.jpg',
        duration: '38:20',
        topic: 'React',
        difficulty: 'intermediate',
        channel: 'Google for Developers',
        publishedAt: '2024-10-22',
        viewCount: '234K',
        url: 'https://www.youtube.com/watch?v=Tn6-PIqc4UM',
        tags: ['react', 'components', 'jsx'],
        order: 7
      },
      {
        id: 'fe-8',
        title: 'React Hooks & State Management',
        description: 'Master React Hooks for modern component development.',
        thumbnail: 'https://i.ytimg.com/vi/O6P86uwfdR0/maxresdefault.jpg',
        duration: '44:15',
        topic: 'React',
        difficulty: 'advanced',
        channel: 'Google for Developers',
        publishedAt: '2024-10-25',
        viewCount: '189K',
        url: 'https://www.youtube.com/watch?v=O6P86uwfdR0',
        tags: ['react', 'hooks', 'state'],
        order: 8
      }
    ]
  },
  'backend-developer': {
    id: 'backend-developer',
    title: 'Backend Developer',
    description: 'Build robust server-side applications and APIs',
    icon: '⚙️',
    color: '#4caf50',
    duration: '7-9 months',
    averageSalary: '$80,000 - $130,000',
    skillsGained: ['Node.js', 'Express.js', 'Databases', 'API Design', 'Authentication', 'Cloud Services', 'DevOps', 'Testing'],
    careerOpportunities: ['Backend Developer', 'API Developer', 'DevOps Engineer', 'Cloud Engineer', 'Full Stack Developer'],
    roadmapSteps: [
      'Server-side Programming Basics',
      'Node.js & NPM Fundamentals',
      'Express.js Framework',
      'Database Design & SQL',
      'REST API Development',
      'Authentication & Security',
      'Testing & Debugging',
      'Cloud Deployment',
      'Performance Optimization'
    ],
    videos: [
      {
        id: 'be-1',
        title: 'Node.js Fundamentals for Backend Development',
        description: 'Introduction to Node.js and server-side JavaScript development.',
        thumbnail: 'https://i.ytimg.com/vi/RLtyhwFtXQA/maxresdefault.jpg',
        duration: '32:15',
        topic: 'Node.js',
        difficulty: 'beginner',
        channel: 'Google for Developers',
        publishedAt: '2024-10-07',
        viewCount: '298K',
        url: 'https://www.youtube.com/watch?v=RLtyhwFtXQA',
        tags: ['nodejs', 'backend', 'server'],
        order: 1
      },
      {
        id: 'be-2',
        title: 'Express.js - Building REST APIs',
        description: 'Learn to build robust REST APIs using Express.js framework.',
        thumbnail: 'https://i.ytimg.com/vi/L72fhGm1tfE/maxresdefault.jpg',
        duration: '45:30',
        topic: 'Express.js',
        difficulty: 'intermediate',
        channel: 'Google for Developers',
        publishedAt: '2024-10-12',
        viewCount: '267K',
        url: 'https://www.youtube.com/watch?v=L72fhGm1tfE',
        tags: ['express', 'api', 'rest'],
        order: 2
      },
      {
        id: 'be-3',
        title: 'Database Design & MongoDB Integration',
        description: 'Learn database design principles and MongoDB integration.',
        thumbnail: 'https://i.ytimg.com/vi/ExcRbA7fy_A/maxresdefault.jpg',
        duration: '38:45',
        topic: 'Database',
        difficulty: 'intermediate',
        channel: 'Google for Developers',
        publishedAt: '2024-10-15',
        viewCount: '189K',
        url: 'https://www.youtube.com/watch?v=ExcRbA7fy_A',
        tags: ['database', 'mongodb', 'design'],
        order: 3
      },
      {
        id: 'be-4',
        title: 'Authentication & Security Best Practices',
        description: 'Implement secure authentication and authorization systems.',
        thumbnail: 'https://i.ytimg.com/vi/mbsmsi7l3r4/maxresdefault.jpg',
        duration: '41:20',
        topic: 'Security',
        difficulty: 'advanced',
        channel: 'Google for Developers',
        publishedAt: '2024-10-18',
        viewCount: '156K',
        url: 'https://www.youtube.com/watch?v=mbsmsi7l3r4',
        tags: ['auth', 'security', 'jwt'],
        order: 4
      },
      {
        id: 'be-5',
        title: 'API Testing & Documentation',
        description: 'Learn to test and document your APIs effectively.',
        thumbnail: 'https://i.ytimg.com/vi/VywxIQ2ZXw4/maxresdefault.jpg',
        duration: '35:15',
        topic: 'Testing',
        difficulty: 'intermediate',
        channel: 'Google for Developers',
        publishedAt: '2024-10-20',
        viewCount: '134K',
        url: 'https://www.youtube.com/watch?v=VywxIQ2ZXw4',
        tags: ['testing', 'api', 'documentation'],
        order: 5
      },
      {
        id: 'be-6',
        title: 'Cloud Deployment with Google Cloud',
        description: 'Deploy your backend applications to Google Cloud Platform.',
        thumbnail: 'https://i.ytimg.com/vi/9aKtJ_AuedI/maxresdefault.jpg',
        duration: '42:30',
        topic: 'Cloud',
        difficulty: 'advanced',
        channel: 'Google for Developers',
        publishedAt: '2024-10-25',
        viewCount: '178K',
        url: 'https://www.youtube.com/watch?v=9aKtJ_AuedI',
        tags: ['cloud', 'deployment', 'gcp'],
        order: 6
      }
    ]
  },
  'fullstack-developer': {
    id: 'fullstack-developer',
    title: 'Full Stack Developer',
    description: 'Master both frontend and backend development for complete web applications',
    icon: '🚀',
    color: '#9c27b0',
    duration: '10-12 months',
    averageSalary: '$85,000 - $140,000',
    skillsGained: ['Frontend', 'Backend', 'Databases', 'DevOps', 'System Design', 'Project Management', 'Testing', 'Security'],
    careerOpportunities: ['Full Stack Developer', 'Technical Lead', 'Software Architect', 'CTO', 'Freelance Developer'],
    roadmapSteps: [
      'Frontend Fundamentals',
      'Backend Development',
      'Database Management',
      'API Integration',
      'Authentication Systems',
      'Deployment & DevOps',
      'Performance Optimization',
      'System Architecture',
      'Project Leadership'
    ],
    videos: [
      {
        id: 'fs-1',
        title: 'Full Stack Development Overview',
        description: 'Understanding the complete web development stack.',
        thumbnail: 'https://i.ytimg.com/vi/7CqJlxBYj-M/maxresdefault.jpg',
        duration: '25:30',
        topic: 'Overview',
        difficulty: 'beginner',
        channel: 'Google for Developers',
        publishedAt: '2024-10-05',
        viewCount: '412K',
        url: 'https://www.youtube.com/watch?v=7CqJlxBYj-M',
        tags: ['fullstack', 'overview', 'web'],
        order: 1
      },
      {
        id: 'fs-2',
        title: 'Building Modern Web Apps with React & Node.js',
        description: 'Create a complete web application from frontend to backend.',
        thumbnail: 'https://i.ytimg.com/vi/98BzS5Oz5E4/maxresdefault.jpg',
        duration: '52:45',
        topic: 'Integration',
        difficulty: 'intermediate',
        channel: 'Google for Developers',
        publishedAt: '2024-10-15',
        viewCount: '298K',
        url: 'https://www.youtube.com/watch?v=98BzS5Oz5E4',
        tags: ['react', 'nodejs', 'fullstack'],
        order: 2
      },
      {
        id: 'fs-3',
        title: 'System Design for Web Applications',
        description: 'Learn to design scalable web application architectures.',
        thumbnail: 'https://i.ytimg.com/vi/UzLMhqg3_Wc/maxresdefault.jpg',
        duration: '48:20',
        topic: 'Architecture',
        difficulty: 'advanced',
        channel: 'Google for Developers',
        publishedAt: '2024-10-25',
        viewCount: '187K',
        url: 'https://www.youtube.com/watch?v=UzLMhqg3_Wc',
        tags: ['system-design', 'architecture', 'scalability'],
        order: 3
      }
    ]
  },
  'ui-developer': {
    id: 'ui-developer',
    title: 'UI Developer',
    description: 'Specialize in creating beautiful, accessible user interfaces',
    icon: '🎭',
    color: '#ff9800',
    duration: '4-6 months',
    averageSalary: '$70,000 - $110,000',
    skillsGained: ['HTML/CSS', 'Design Systems', 'Accessibility', 'CSS Animations', 'UI Frameworks', 'Prototyping', 'Responsive Design'],
    careerOpportunities: ['UI Developer', 'Frontend Designer', 'UX Engineer', 'Design System Developer', 'Web Designer'],
    roadmapSteps: [
      'HTML Semantics & Accessibility',
      'Advanced CSS & Animations',
      'Design System Principles',
      'CSS Frameworks & Tools',
      'Component Libraries',
      'Cross-browser Compatibility',
      'Performance Optimization',
      'Design Tools Integration'
    ],
    videos: [
      {
        id: 'ui-1',
        title: 'Semantic HTML for Accessible UI',
        description: 'Build accessible user interfaces with semantic HTML.',
        thumbnail: 'https://i.ytimg.com/vi/UB1O30fR-EE/maxresdefault.jpg',
        duration: '22:15',
        topic: 'HTML',
        difficulty: 'beginner',
        channel: 'Google for Developers',
        publishedAt: '2024-10-08',
        viewCount: '189K',
        url: 'https://www.youtube.com/watch?v=UB1O30fR-EE',
        tags: ['html', 'accessibility', 'semantic'],
        order: 1
      },
      {
        id: 'ui-2',
        title: 'CSS Animations & Transitions Masterclass',
        description: 'Create smooth, engaging animations for better user experience.',
        thumbnail: 'https://i.ytimg.com/vi/68O6eOGAGqA/maxresdefault.jpg',
        duration: '36:30',
        topic: 'CSS',
        difficulty: 'intermediate',
        channel: 'Google for Developers',
        publishedAt: '2024-10-12',
        viewCount: '234K',
        url: 'https://www.youtube.com/watch?v=68O6eOGAGqA',
        tags: ['css', 'animations', 'transitions'],
        order: 2
      },
      {
        id: 'ui-3',
        title: 'Building Design Systems with CSS',
        description: 'Create consistent, scalable design systems.',
        thumbnail: 'https://i.ytimg.com/vi/YqQx75OPRa0/maxresdefault.jpg',
        duration: '41:45',
        topic: 'Design Systems',
        difficulty: 'advanced',
        channel: 'Google for Developers',
        publishedAt: '2024-10-20',
        viewCount: '156K',
        url: 'https://www.youtube.com/watch?v=YqQx75OPRa0',
        tags: ['design-systems', 'css', 'components'],
        order: 3
      }
    ]
  },
  'javascript-developer': {
    id: 'javascript-developer',
    title: 'JavaScript Developer',
    description: 'Master JavaScript for both frontend and backend development',
    icon: '⚡',
    color: '#f7df1e',
    duration: '5-7 months',
    averageSalary: '$75,000 - $125,000',
    skillsGained: ['ES6+', 'Async Programming', 'Testing', 'Build Tools', 'Frameworks', 'Node.js', 'TypeScript', 'Performance'],
    careerOpportunities: ['JavaScript Developer', 'Frontend Developer', 'Node.js Developer', 'React Developer', 'Technical Consultant'],
    roadmapSteps: [
      'JavaScript Fundamentals',
      'ES6+ Modern Features',
      'Asynchronous Programming',
      'DOM & Browser APIs',
      'Testing & Debugging',
      'Build Tools & Bundlers',
      'Framework Specialization',
      'Performance Optimization'
    ],
    videos: [
      {
        id: 'js-dev-1',
        title: 'Modern JavaScript ES6+ Features',
        description: 'Master the latest JavaScript features for modern development.',
        thumbnail: 'https://i.ytimg.com/vi/WZQc7RUAg18/maxresdefault.jpg',
        duration: '34:20',
        topic: 'JavaScript',
        difficulty: 'intermediate',
        channel: 'Google for Developers',
        publishedAt: '2024-10-10',
        viewCount: '267K',
        url: 'https://www.youtube.com/watch?v=WZQc7RUAg18',
        tags: ['javascript', 'es6', 'modern'],
        order: 1
      },
      {
        id: 'js-dev-2',
        title: 'Async JavaScript - Promises & Async/Await',
        description: 'Master asynchronous programming patterns in JavaScript.',
        thumbnail: 'https://i.ytimg.com/vi/V_Kr9OSfDeU/maxresdefault.jpg',
        duration: '39:15',
        topic: 'JavaScript',
        difficulty: 'intermediate',
        channel: 'Google for Developers',
        publishedAt: '2024-10-15',
        viewCount: '198K',
        url: 'https://www.youtube.com/watch?v=V_Kr9OSfDeU',
        tags: ['javascript', 'async', 'promises'],
        order: 2
      },
      {
        id: 'js-dev-3',
        title: 'JavaScript Testing with Jest',
        description: 'Learn to test JavaScript applications effectively.',
        thumbnail: 'https://i.ytimg.com/vi/7r4xVDI2vho/maxresdefault.jpg',
        duration: '28:45',
        topic: 'Testing',
        difficulty: 'intermediate',
        channel: 'Google for Developers',
        publishedAt: '2024-10-18',
        viewCount: '145K',
        url: 'https://www.youtube.com/watch?v=7r4xVDI2vho',
        tags: ['javascript', 'testing', 'jest'],
        order: 3
      },
      {
        id: 'js-dev-4',
        title: 'JavaScript Performance Optimization',
        description: 'Optimize JavaScript applications for better performance.',
        thumbnail: 'https://i.ytimg.com/vi/Mus_vwhTCq0/maxresdefault.jpg',
        duration: '42:30',
        topic: 'Performance',
        difficulty: 'advanced',
        channel: 'Google for Developers',
        publishedAt: '2024-10-25',
        viewCount: '167K',
        url: 'https://www.youtube.com/watch?v=Mus_vwhTCq0',
        tags: ['javascript', 'performance', 'optimization'],
        order: 4
      }
    ]
  },
  'devops-engineer': {
    id: 'devops-engineer',
    title: 'DevOps Engineer',
    description: 'Bridge development and operations with automation and cloud technologies',
    icon: '☁️',
    color: '#2196f3',
    duration: '8-10 months',
    averageSalary: '$90,000 - $150,000',
    skillsGained: ['Docker', 'Kubernetes', 'CI/CD', 'Cloud Platforms', 'Infrastructure as Code', 'Monitoring', 'Security', 'Automation'],
    careerOpportunities: ['DevOps Engineer', 'Site Reliability Engineer', 'Cloud Architect', 'Platform Engineer', 'Infrastructure Engineer'],
    roadmapSteps: [
      'Linux & Command Line',
      'Version Control & Git',
      'Containerization (Docker)',
      'Container Orchestration (Kubernetes)',
      'CI/CD Pipelines',
      'Cloud Platforms (GCP/AWS/Azure)',
      'Infrastructure as Code',
      'Monitoring & Logging',
      'Security & Compliance'
    ],
    videos: [
      {
        id: 'do-1',
        title: 'Docker Fundamentals for Developers',
        description: 'Learn containerization with Docker for modern development.',
        thumbnail: 'https://i.ytimg.com/vi/gAkwW2tuIqE/maxresdefault.jpg',
        duration: '35:20',
        topic: 'Docker',
        difficulty: 'beginner',
        channel: 'Google for Developers',
        publishedAt: '2024-10-08',
        viewCount: '289K',
        url: 'https://www.youtube.com/watch?v=gAkwW2tuIqE',
        tags: ['docker', 'containers', 'devops'],
        order: 1
      },
      {
        id: 'do-2',
        title: 'Kubernetes for Application Deployment',
        description: 'Deploy and manage applications with Kubernetes.',
        thumbnail: 'https://i.ytimg.com/vi/X48VuDVv0do/maxresdefault.jpg',
        duration: '47:15',
        topic: 'Kubernetes',
        difficulty: 'intermediate',
        channel: 'Google for Developers',
        publishedAt: '2024-10-15',
        viewCount: '234K',
        url: 'https://www.youtube.com/watch?v=X48VuDVv0do',
        tags: ['kubernetes', 'orchestration', 'deployment'],
        order: 2
      },
      {
        id: 'do-3',
        title: 'CI/CD Pipelines with Google Cloud Build',
        description: 'Build automated deployment pipelines.',
        thumbnail: 'https://i.ytimg.com/vi/7O7bBf8z3qw/maxresdefault.jpg',
        duration: '38:45',
        topic: 'CI/CD',
        difficulty: 'intermediate',
        channel: 'Google for Developers',
        publishedAt: '2024-10-20',
        viewCount: '178K',
        url: 'https://www.youtube.com/watch?v=7O7bBf8z3qw',
        tags: ['cicd', 'automation', 'cloud-build'],
        order: 3
      }
    ]
  }
};

export const getPathIcon = (pathId: string): string => {
  return developerPaths[pathId]?.icon || '💻';
};

export const getPathColor = (pathId: string): string => {
  return developerPaths[pathId]?.color || '#1976d2';
};