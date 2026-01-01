import React, { useState, useEffect, useCallback } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  LinearProgress,
  Alert,
  AlertTitle,
  Chip,
  IconButton,
} from '@mui/material';
import {
  Quiz,
  Schedule,
  CheckCircle,
  Cancel,
  EmojiEvents,
  School,
  Close,
  PlayArrow,
} from '@mui/icons-material';
import { AssessmentTest, TestAttempt, calculateScore } from '../../data/assessmentTests';

interface AssessmentComponentProps {
  test: AssessmentTest;
  onTestComplete: (attempt: TestAttempt) => void;
  onClose: () => void;
  onSkipToVideos?: () => void;
}

const AssessmentComponent: React.FC<AssessmentComponentProps> = ({
  test,
  onTestComplete,
  onClose,
  onSkipToVideos,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>(new Array(test.questions.length).fill(-1));
  const [timeRemaining, setTimeRemaining] = useState(test.timeLimit * 60); // Convert to seconds
  const [testStarted, setTestStarted] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);
  const [testResult, setTestResult] = useState<TestAttempt | null>(null);

  const currentQuestion = test.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === test.questions.length - 1;
  const allQuestionsAnswered = answers.every(answer => answer !== -1);

  // Timer effect
  useEffect(() => {
    if (!testStarted || testCompleted) return;

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          handleSubmitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [testStarted, testCompleted]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleStartTest = () => {
    setTestStarted(true);
  };

  const handleAnswerChange = (questionIndex: number, answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = answerIndex;
    setAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (!isLastQuestion) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmitTest = useCallback(() => {
    const correctAnswers = test.questions.map(q => q.correctAnswer);
    const score = calculateScore(answers, correctAnswers);
    const passed = score >= test.passingScore;
    const testTimeSpent = (test.timeLimit * 60) - timeRemaining;

    const attempt: TestAttempt = {
      testId: test.id,
      score,
      passed,
      answers,
      completedAt: new Date().toISOString(),
      timeSpent: testTimeSpent,
    };

    setTestResult(attempt);
    setTestCompleted(true);
    onTestComplete(attempt);
  }, [test, answers, timeRemaining, onTestComplete]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return '#4caf50';
      case 'medium': return '#ff9800';
      case 'hard': return '#f44336';
      default: return '#757575';
    }
  };

  const getProgressPercentage = () => {
    const answeredQuestions = answers.filter(answer => answer !== -1).length;
    return (answeredQuestions / test.questions.length) * 100;
  };

  if (!testStarted) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box sx={{ textAlign: 'center' }}>
          <IconButton
            onClick={onClose}
            sx={{ position: 'absolute', top: 16, right: 16 }}
          >
            <Close />
          </IconButton>

          <Quiz sx={{ fontSize: 80, color: 'primary.main', mb: 2 }} />
          
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            {test.title}
          </Typography>
          
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}>
            {test.description}
          </Typography>

          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 3, maxWidth: 500, mx: 'auto', mb: 4 }}>
            <Card sx={{ textAlign: 'center', p: 2 }}>
              <Typography variant="h4" fontWeight="bold" color="primary.main">
                {test.questions.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Questions
              </Typography>
            </Card>
            
            <Card sx={{ textAlign: 'center', p: 2 }}>
              <Typography variant="h4" fontWeight="bold" color="warning.main">
                {test.timeLimit}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Minutes
              </Typography>
            </Card>
            
            <Card sx={{ textAlign: 'center', p: 2 }}>
              <Typography variant="h4" fontWeight="bold" color="success.main">
                {test.passingScore}%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                To Pass
              </Typography>
            </Card>
            
            <Card sx={{ textAlign: 'center', p: 2 }}>
              <Typography variant="h4" fontWeight="bold" color="info.main">
                {test.prerequisiteFor.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Videos Unlocked
              </Typography>
            </Card>
          </Box>

          <Alert severity="info" sx={{ mb: 4, textAlign: 'left' }}>
            <AlertTitle>Test Guidelines</AlertTitle>
            <ul style={{ margin: 0, paddingLeft: 20 }}>
              <li>You need {test.passingScore}% or higher to pass and unlock videos</li>
              <li>You have {test.timeLimit} minutes to complete all questions</li>
              <li>You can navigate between questions and change your answers</li>
              <li>Your progress will be saved automatically</li>
            </ul>
          </Alert>

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button
              variant="contained"
              size="large"
              onClick={handleStartTest}
              startIcon={<PlayArrow />}
              sx={{ px: 4, py: 1.5 }}
            >
              Start Assessment
            </Button>
            
            {onSkipToVideos && (
              <Button
                variant="outlined"
                size="large"
                onClick={onSkipToVideos}
                sx={{ px: 4, py: 1.5 }}
              >
                Skip & Watch Videos
              </Button>
            )}
          </Box>
        </Box>
      </Container>
    );
  }

  if (testCompleted && testResult) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          {testResult.passed ? (
            <CheckCircle sx={{ fontSize: 100, color: 'success.main', mb: 2 }} />
          ) : (
            <Cancel sx={{ fontSize: 100, color: 'error.main', mb: 2 }} />
          )}
          
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            {testResult.passed ? 'Congratulations! 🎉' : 'Keep Learning! 📚'}
          </Typography>
          
          <Typography variant="h4" sx={{ mb: 2, color: testResult.passed ? 'success.main' : 'error.main' }}>
            Your Score: {testResult.score}%
          </Typography>
          
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
            {testResult.passed 
              ? `You've unlocked ${test.prerequisiteFor.length} new videos!`
              : `You need ${test.passingScore}% to pass. Review the material and try again.`
            }
          </Typography>

          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2, maxWidth: 400, mx: 'auto', mb: 4 }}>
            <Card sx={{ textAlign: 'center', p: 2 }}>
              <Typography variant="h5" fontWeight="bold" color="success.main">
                {answers.filter((answer, index) => answer === test.questions[index].correctAnswer).length}
              </Typography>
              <Typography variant="body2">Correct</Typography>
            </Card>
            
            <Card sx={{ textAlign: 'center', p: 2 }}>
              <Typography variant="h5" fontWeight="bold" color="error.main">
                {answers.filter((answer, index) => answer !== test.questions[index].correctAnswer).length}
              </Typography>
              <Typography variant="body2">Incorrect</Typography>
            </Card>
            
            <Card sx={{ textAlign: 'center', p: 2 }}>
              <Typography variant="h5" fontWeight="bold" color="info.main">
                {Math.floor(testResult.timeSpent / 60)}m
              </Typography>
              <Typography variant="body2">Time Spent</Typography>
            </Card>
          </Box>
        </Box>

        {/* Question Review */}
        <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
          📝 Question Review
        </Typography>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {test.questions.map((question, index) => {
            const userAnswer = answers[index];
            const isCorrect = userAnswer === question.correctAnswer;
            
            return (
              <Card key={question.id} sx={{ border: isCorrect ? '2px solid #4caf50' : '2px solid #f44336' }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" sx={{ flex: 1 }}>
                      Question {index + 1}: {question.question}
                    </Typography>
                    <Chip
                      label={question.difficulty}
                      size="small"
                      sx={{ backgroundColor: getDifficultyColor(question.difficulty), color: 'white', mr: 1 }}
                    />
                    {isCorrect ? (
                      <CheckCircle sx={{ color: 'success.main' }} />
                    ) : (
                      <Cancel sx={{ color: 'error.main' }} />
                    )}
                  </Box>
                  
                  <Box sx={{ mb: 2 }}>
                    {question.options.map((option, optionIndex) => (
                      <Box
                        key={optionIndex}
                        sx={{
                          p: 1,
                          borderRadius: 1,
                          mb: 1,
                          backgroundColor: 
                            optionIndex === question.correctAnswer ? '#e8f5e8' :
                            optionIndex === userAnswer && !isCorrect ? '#ffebee' : 'transparent',
                          border:
                            optionIndex === question.correctAnswer ? '1px solid #4caf50' :
                            optionIndex === userAnswer && !isCorrect ? '1px solid #f44336' : '1px solid transparent'
                        }}
                      >
                        <Typography variant="body2">
                          {String.fromCharCode(65 + optionIndex)}. {option}
                          {optionIndex === question.correctAnswer && ' ✓ (Correct)'}
                          {optionIndex === userAnswer && !isCorrect && ' ✗ (Your answer)'}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                  
                  <Alert severity="info" sx={{ mt: 2 }}>
                    <Typography variant="body2">
                      <strong>Explanation:</strong> {question.explanation}
                    </Typography>
                  </Alert>
                </CardContent>
              </Card>
            );
          })}
        </Box>

        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button
            variant="contained"
            size="large"
            onClick={onClose}
            startIcon={testResult.passed ? <EmojiEvents /> : <School />}
            sx={{ px: 4, py: 1.5 }}
          >
            {testResult.passed ? 'Continue Learning' : 'Study More'}
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h5" fontWeight="bold">
            {test.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Question {currentQuestionIndex + 1} of {test.questions.length}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Schedule sx={{ color: 'warning.main' }} />
          <Typography variant="h6" color={timeRemaining < 300 ? 'error.main' : 'text.primary'}>
            {formatTime(timeRemaining)}
          </Typography>
        </Box>
      </Box>

      {/* Progress */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2">Progress</Typography>
          <Typography variant="body2">{Math.round(getProgressPercentage())}% answered</Typography>
        </Box>
        <LinearProgress 
          variant="determinate" 
          value={getProgressPercentage()} 
          sx={{ height: 8, borderRadius: 4 }}
        />
      </Box>

      {/* Question */}
      <Card sx={{ mb: 4 }}>
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" sx={{ flex: 1 }}>
              {currentQuestion.question}
            </Typography>
            <Chip
              label={currentQuestion.difficulty}
              size="small"
              sx={{ 
                backgroundColor: getDifficultyColor(currentQuestion.difficulty),
                color: 'white',
                fontWeight: 600
              }}
            />
          </Box>

          <FormControl component="fieldset" fullWidth>
            <RadioGroup
              value={answers[currentQuestionIndex]}
              onChange={(e) => handleAnswerChange(currentQuestionIndex, parseInt(e.target.value))}
            >
              {currentQuestion.options.map((option, index) => (
                <FormControlLabel
                  key={index}
                  value={index}
                  control={<Radio />}
                  label={
                    <Typography variant="body1">
                      {String.fromCharCode(65 + index)}. {option}
                    </Typography>
                  }
                  sx={{
                    border: '1px solid transparent',
                    borderRadius: 2,
                    p: 1,
                    m: 0.5,
                    '&:hover': {
                      backgroundColor: 'action.hover',
                      borderColor: 'primary.main',
                    },
                  }}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </CardContent>
      </Card>

      {/* Navigation */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Button
          onClick={handlePreviousQuestion}
          disabled={currentQuestionIndex === 0}
          variant="outlined"
        >
          Previous
        </Button>

        <Box sx={{ display: 'flex', gap: 1 }}>
          {test.questions.map((_, index) => (
            <Box
              key={index}
              onClick={() => setCurrentQuestionIndex(index)}
              sx={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: 600,
                backgroundColor: 
                  index === currentQuestionIndex ? 'primary.main' :
                  answers[index] !== -1 ? 'success.main' : 'grey.300',
                color: 
                  index === currentQuestionIndex || answers[index] !== -1 ? 'white' : 'text.secondary',
                transition: 'all 0.2s',
                '&:hover': {
                  transform: 'scale(1.1)',
                }
              }}
            >
              {index + 1}
            </Box>
          ))}
        </Box>

        {isLastQuestion ? (
          <Button
            onClick={handleSubmitTest}
            variant="contained"
            disabled={!allQuestionsAnswered}
            sx={{ minWidth: 120 }}
          >
            Submit Test
          </Button>
        ) : (
          <Button
            onClick={handleNextQuestion}
            variant="contained"
            disabled={answers[currentQuestionIndex] === -1}
          >
            Next
          </Button>
        )}
      </Box>
    </Container>
  );
};

export default AssessmentComponent;