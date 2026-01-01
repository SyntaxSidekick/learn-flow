export interface TestQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface AssessmentTest {
  id: string;
  title: string;
  description: string;
  prerequisiteFor: string[]; // Array of video IDs this test unlocks
  passingScore: number; // Percentage needed to pass (85%)
  timeLimit: number; // Minutes
  questions: TestQuestion[];
  category: string;
}

export interface TestAttempt {
  testId: string;
  score: number;
  passed: boolean;
  answers: number[];
  completedAt: string;
  timeSpent: number; // seconds
}

// Frontend Developer Path Tests
export const frontendDeveloperTests: AssessmentTest[] = [
  {
    id: 'html-css-basics-test',
    title: 'HTML & CSS Fundamentals Assessment',
    description: 'Test your understanding of HTML5 semantic elements and CSS layout basics',
    prerequisiteFor: ['fe-4', 'fe-5'], // Unlocks JavaScript videos
    passingScore: 85,
    timeLimit: 15,
    category: 'Frontend Development',
    questions: [
      {
        id: 'html-1',
        question: 'Which HTML5 element is best for the main navigation of a website?',
        options: ['<div class="nav">', '<navigation>', '<nav>', '<menu>'],
        correctAnswer: 2,
        explanation: '<nav> is the semantic HTML5 element specifically designed for navigation sections.',
        difficulty: 'easy'
      },
      {
        id: 'html-2',
        question: 'What is the correct way to create a semantic article structure?',
        options: [
          '<div><h1>Title</h1><p>Content</p></div>',
          '<article><header><h1>Title</h1></header><p>Content</p></article>',
          '<section><title>Title</title><content>Content</content></section>',
          '<post><h1>Title</h1><text>Content</text></post>'
        ],
        correctAnswer: 1,
        explanation: '<article> with <header> provides proper semantic structure for standalone content.',
        difficulty: 'medium'
      },
      {
        id: 'css-1',
        question: 'Which CSS property is used to create a flexible container?',
        options: ['display: block', 'display: flex', 'display: grid', 'display: inline'],
        correctAnswer: 1,
        explanation: 'display: flex creates a flexible container that can arrange items in rows or columns.',
        difficulty: 'easy'
      },
      {
        id: 'css-2',
        question: 'What does "justify-content: space-between" do in a flexbox?',
        options: [
          'Centers all items',
          'Puts equal space around each item',
          'Puts items at start and end with equal space between',
          'Stretches items to fill container'
        ],
        correctAnswer: 2,
        explanation: 'space-between distributes items evenly with first item at start and last at end.',
        difficulty: 'medium'
      },
      {
        id: 'css-3',
        question: 'Which CSS Grid property defines the number of columns?',
        options: ['grid-columns', 'grid-template-columns', 'grid-column-count', 'column-template'],
        correctAnswer: 1,
        explanation: 'grid-template-columns defines the track sizing functions for grid columns.',
        difficulty: 'medium'
      },
      {
        id: 'css-4',
        question: 'What is the CSS Box Model order from inside to outside?',
        options: [
          'content → border → padding → margin',
          'content → padding → border → margin',
          'content → margin → padding → border',
          'padding → content → border → margin'
        ],
        correctAnswer: 1,
        explanation: 'Box model order: content (innermost) → padding → border → margin (outermost).',
        difficulty: 'hard'
      }
    ]
  },
  {
    id: 'javascript-fundamentals-test',
    title: 'JavaScript Core Concepts Assessment',
    description: 'Evaluate your knowledge of JavaScript variables, functions, and DOM manipulation',
    prerequisiteFor: ['fe-6', 'fe-7'], // Unlocks API and React videos
    passingScore: 85,
    timeLimit: 20,
    category: 'Frontend Development',
    questions: [
      {
        id: 'js-1',
        question: 'What is the difference between let, const, and var?',
        options: [
          'No difference, they all work the same',
          'let and const are block-scoped, var is function-scoped',
          'var is the newest, let and const are deprecated',
          'const is for constants only, let and var are the same'
        ],
        correctAnswer: 1,
        explanation: 'let and const have block scope and temporal dead zone, while var has function scope.',
        difficulty: 'medium'
      },
      {
        id: 'js-2',
        question: 'Which method adds an event listener to an element?',
        options: ['element.onClick()', 'element.addEventListener()', 'element.addEvent()', 'element.on()'],
        correctAnswer: 1,
        explanation: 'addEventListener() is the standard method for attaching event handlers to elements.',
        difficulty: 'easy'
      },
      {
        id: 'js-3',
        question: 'What does document.querySelector() return?',
        options: [
          'All matching elements',
          'The first matching element',
          'The last matching element',
          'An array of elements'
        ],
        correctAnswer: 1,
        explanation: 'querySelector() returns the first element that matches the specified CSS selector.',
        difficulty: 'easy'
      },
      {
        id: 'js-4',
        question: 'What is the correct way to handle a Promise?',
        options: [
          'promise.handle()',
          'promise.then().catch()',
          'promise.success().error()',
          'promise.resolve().reject()'
        ],
        correctAnswer: 1,
        explanation: '.then() handles successful resolution and .catch() handles rejection of promises.',
        difficulty: 'medium'
      },
      {
        id: 'js-5',
        question: 'What does "this" refer to in an arrow function?',
        options: [
          'The function itself',
          'The global object',
          'The lexical scope where it was defined',
          'The object that called the function'
        ],
        correctAnswer: 2,
        explanation: 'Arrow functions inherit "this" from the enclosing lexical scope, not from how they are called.',
        difficulty: 'hard'
      }
    ]
  },
  {
    id: 'react-advanced-test',
    title: 'React Development Mastery Assessment',
    description: 'Advanced test covering React hooks, state management, and best practices',
    prerequisiteFor: ['fe-8'], // Unlocks final React video
    passingScore: 85,
    timeLimit: 25,
    category: 'Frontend Development',
    questions: [
      {
        id: 'react-1',
        question: 'When should you use useEffect with an empty dependency array?',
        options: [
          'Every time the component re-renders',
          'Only once when component mounts',
          'When any prop changes',
          'Never, it\'s not recommended'
        ],
        correctAnswer: 1,
        explanation: 'Empty dependency array makes useEffect run only once after initial mount.',
        difficulty: 'medium'
      },
      {
        id: 'react-2',
        question: 'What is the purpose of React.memo()?',
        options: [
          'To memorize component state',
          'To prevent unnecessary re-renders',
          'To store data in memory',
          'To create memoized hooks'
        ],
        correctAnswer: 1,
        explanation: 'React.memo() prevents re-renders when props haven\'t changed, optimizing performance.',
        difficulty: 'medium'
      },
      {
        id: 'react-3',
        question: 'Which hook is best for managing complex state logic?',
        options: ['useState', 'useEffect', 'useReducer', 'useMemo'],
        correctAnswer: 2,
        explanation: 'useReducer is ideal for complex state logic with multiple sub-values or when next state depends on previous.',
        difficulty: 'hard'
      }
    ]
  }
];

// Backend Developer Path Tests
export const backendDeveloperTests: AssessmentTest[] = [
  {
    id: 'nodejs-basics-test',
    title: 'Node.js Fundamentals Assessment',
    description: 'Test your understanding of Node.js core concepts and server-side development',
    prerequisiteFor: ['be-2', 'be-3'], // Unlocks Express and Database videos
    passingScore: 85,
    timeLimit: 18,
    category: 'Backend Development',
    questions: [
      {
        id: 'node-1',
        question: 'What is Node.js?',
        options: [
          'A JavaScript framework',
          'A JavaScript runtime built on Chrome\'s V8 engine',
          'A database management system',
          'A web browser'
        ],
        correctAnswer: 1,
        explanation: 'Node.js is a JavaScript runtime that allows running JavaScript on the server side.',
        difficulty: 'easy'
      },
      {
        id: 'node-2',
        question: 'Which module is used to create an HTTP server in Node.js?',
        options: ['fs', 'path', 'http', 'url'],
        correctAnswer: 2,
        explanation: 'The http module provides functionality to create HTTP servers and clients.',
        difficulty: 'easy'
      },
      {
        id: 'node-3',
        question: 'What is the purpose of package.json?',
        options: [
          'To store application data',
          'To manage project dependencies and metadata',
          'To configure the web server',
          'To define database schema'
        ],
        correctAnswer: 1,
        explanation: 'package.json contains project metadata, dependencies, and scripts configuration.',
        difficulty: 'medium'
      },
      {
        id: 'node-4',
        question: 'How do you handle asynchronous operations in Node.js?',
        options: [
          'Using callbacks, Promises, or async/await',
          'Using synchronous functions only',
          'Using threads',
          'Using global variables'
        ],
        correctAnswer: 0,
        explanation: 'Node.js handles async operations through callbacks, Promises, and async/await patterns.',
        difficulty: 'medium'
      }
    ]
  },
  {
    id: 'express-api-test',
    title: 'Express.js & API Development Assessment',
    description: 'Evaluate your knowledge of Express.js framework and REST API principles',
    prerequisiteFor: ['be-4', 'be-5'], // Unlocks Security and Testing videos
    passingScore: 85,
    timeLimit: 20,
    category: 'Backend Development',
    questions: [
      {
        id: 'express-1',
        question: 'What is Express.js?',
        options: [
          'A database',
          'A web application framework for Node.js',
          'A frontend library',
          'A testing framework'
        ],
        correctAnswer: 1,
        explanation: 'Express.js is a minimal and flexible Node.js web application framework.',
        difficulty: 'easy'
      },
      {
        id: 'express-2',
        question: 'Which HTTP method is used to update a resource?',
        options: ['GET', 'POST', 'PUT', 'DELETE'],
        correctAnswer: 2,
        explanation: 'PUT is typically used to update an entire resource, PATCH for partial updates.',
        difficulty: 'easy'
      },
      {
        id: 'express-3',
        question: 'What is middleware in Express.js?',
        options: [
          'Database connection',
          'Functions that execute during request-response cycle',
          'Static file server',
          'Error handling only'
        ],
        correctAnswer: 1,
        explanation: 'Middleware functions have access to request, response objects and next function in the cycle.',
        difficulty: 'medium'
      }
    ]
  }
];

// All tests combined for easy access
export const allAssessmentTests: { [pathId: string]: AssessmentTest[] } = {
  'frontend-developer': frontendDeveloperTests,
  'backend-developer': backendDeveloperTests,
  'fullstack-developer': [...frontendDeveloperTests, ...backendDeveloperTests],
  'ui-developer': [frontendDeveloperTests[0]], // Only HTML/CSS test
  'javascript-developer': [frontendDeveloperTests[1]], // Only JS test
  'devops-engineer': [backendDeveloperTests[0]], // Only Node.js basics
};

export const getTestsForPath = (pathId: string): AssessmentTest[] => {
  return allAssessmentTests[pathId] || [];
};

export const getTestById = (testId: string): AssessmentTest | undefined => {
  for (const tests of Object.values(allAssessmentTests)) {
    const test = tests.find(t => t.id === testId);
    if (test) return test;
  }
  return undefined;
};

export const calculateScore = (answers: number[], correctAnswers: number[]): number => {
  const correct = answers.reduce((count, answer, index) => {
    return answer === correctAnswers[index] ? count + 1 : count;
  }, 0);
  return Math.round((correct / correctAnswers.length) * 100);
};

export const getUnlockedVideosByTest = (testId: string, passed: boolean): string[] => {
  if (!passed) return [];
  const test = getTestById(testId);
  return test ? test.prerequisiteFor : [];
};