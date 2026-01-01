export interface VideoProgress {
  videoId: string;
  currentTime: number;
  duration: number;
  lastWatched: number;
  completed: boolean;
}

class VideoProgressManager {
  private static STORAGE_KEY = 'learnflow_video_progress';

  // Get all video progress from localStorage
  static getAllProgress(): { [videoId: string]: VideoProgress } {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch (error) {
      console.error('Error loading video progress:', error);
      return {};
    }
  }

  // Get progress for a specific video
  static getProgress(videoId: string): VideoProgress | null {
    const allProgress = this.getAllProgress();
    return allProgress[videoId] || null;
  }

  // Save progress for a specific video
  static saveProgress(videoId: string, currentTime: number, duration: number, completed = false): void {
    try {
      const allProgress = this.getAllProgress();
      allProgress[videoId] = {
        videoId,
        currentTime,
        duration,
        lastWatched: Date.now(),
        completed,
      };
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(allProgress));
    } catch (error) {
      console.error('Error saving video progress:', error);
    }
  }

  // Mark video as completed
  static markCompleted(videoId: string, duration: number): void {
    try {
      const allProgress = this.getAllProgress();
      allProgress[videoId] = {
        videoId,
        currentTime: duration,
        duration,
        lastWatched: Date.now(),
        completed: true,
      };
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(allProgress));
    } catch (error) {
      console.error('Error marking video as completed:', error);
    }
  }

  // Remove progress for a video
  static removeProgress(videoId: string): void {
    try {
      const allProgress = this.getAllProgress();
      delete allProgress[videoId];
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(allProgress));
    } catch (error) {
      console.error('Error removing video progress:', error);
    }
  }

  // Get completion percentage (0-100)
  static getCompletionPercentage(videoId: string): number {
    const progress = this.getProgress(videoId);
    if (!progress || progress.duration === 0) return 0;
    return Math.min((progress.currentTime / progress.duration) * 100, 100);
  }

  // Check if video should be considered completed (>90% watched)
  static isVideoCompleted(videoId: string): boolean {
    const progress = this.getProgress(videoId);
    if (!progress) return false;
    return progress.completed || this.getCompletionPercentage(videoId) >= 90;
  }

  // Format time in MM:SS format
  static formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  // Clean up old progress (older than 30 days)
  static cleanupOldProgress(): void {
    try {
      const allProgress = this.getAllProgress();
      const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);
      
      Object.keys(allProgress).forEach(videoId => {
        if (allProgress[videoId].lastWatched < thirtyDaysAgo) {
          delete allProgress[videoId];
        }
      });
      
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(allProgress));
    } catch (error) {
      console.error('Error cleaning up old progress:', error);
    }
  }
}

export default VideoProgressManager;