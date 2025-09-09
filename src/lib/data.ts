import { LearningTrack, Course, Lesson, HeroBanner } from '@/types';

// Data loading utilities
export async function getAllTracks(): Promise<LearningTrack[]> {
  const tracks = await import('@/data/tracks.json');
  return tracks.default;
}

export async function getAllCourses(): Promise<Course[]> {
  const courses = await import('@/data/courses.json');
  return courses.default as Course[];
}

export async function getAllLessons(): Promise<Lesson[]> {
  const lessons = await import('@/data/lessons.json');
  return lessons.default;
}

export async function getHeroBanners(): Promise<HeroBanner[]> {
  const banners = await import('@/data/hero-banners.json');
  return banners.default;
}

// Get specific items
export async function getTrackBySlug(slug: string): Promise<LearningTrack | null> {
  const tracks = await getAllTracks();
  return tracks.find(track => track.slug === slug) || null;
}

export async function getCourseBySlug(slug: string): Promise<Course | null> {
  const courses = await getAllCourses();
  return courses.find(course => course.slug === slug) || null;
}

export async function getCoursesByTrackId(trackId: string): Promise<Course[]> {
  const courses = await getAllCourses();
  return courses.filter(course => course.trackId === trackId);
}

export async function getLessonsByCourseId(courseId: string): Promise<Lesson[]> {
  const lessons = await getAllLessons();
  return lessons.filter(lesson => lesson.courseId === courseId).sort((a, b) => a.order - b.order);
}

// Get static paths for SSG
export async function getTrackSlugs(): Promise<string[]> {
  const tracks = await getAllTracks();
  return tracks.map(track => track.slug);
}

export async function getCourseSlugs(): Promise<string[]> {
  const courses = await getAllCourses();
  return courses.map(course => course.slug);
}

export async function getLessonSlugs(): Promise<{ courseSlug: string; lessonId: string }[]> {
  const courses = await getAllCourses();
  const lessons = await getAllLessons();
  
  return lessons.map(lesson => {
    const course = courses.find(c => c.id === lesson.courseId);
    return {
      courseSlug: course?.slug || '',
      lessonId: lesson.id
    };
  }).filter(item => item.courseSlug);
}

// Utility functions
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function extractYouTubeId(url: string): string {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
  return match ? match[1] : '';
}

export function getYouTubeEmbedUrl(videoId: string): string {
  return `https://www.youtube.com/embed/${videoId}`;
}

export function getYouTubeThumbnail(videoId: string, quality: 'default' | 'medium' | 'high' | 'standard' | 'maxres' = 'high'): string {
  return `https://img.youtube.com/vi/${videoId}/${quality}default.jpg`;
}
