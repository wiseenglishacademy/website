export interface LearningTrack {
  id: string;
  name: string;
  thumbnailImage: string;
  slug: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface Course {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  trackId: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  isOngoing: boolean;
  instructor: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  thumbnail: string;
  youtubeUrl: string;
  youtubeId: string;
  downloads: {
    video: string | null;
    audio: string | null;
    pdf: string | null;
  };
  notes: string;
  duration: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface HeroBanner {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  ctaText: string;
  ctaLink: string;
  isActive: boolean;
}

export interface Instructor {
  id: string;
  name: string;
  title: string;
  bio: string;
  image: string;
  specialties: string[];
  courses: string[];
}

export interface SearchResult {
  type: 'track' | 'course' | 'lesson';
  id: string;
  title: string;
  description: string;
  thumbnail?: string;
  url: string;
  trackName?: string;
  courseName?: string;
}

export interface CourseWithLessons extends Course {
  lessons: Lesson[];
  track: LearningTrack;
}

export interface TrackWithCourses extends LearningTrack {
  courses: Course[];
  courseCount: number;
}
