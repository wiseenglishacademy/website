import { getAllTracks, getAllCourses, getAllLessons } from '@/lib/data';

export const dynamic = 'force-static';

export default async function sitemap() {
  const [tracks, courses, lessons] = await Promise.all([
    getAllTracks(),
    getAllCourses(),
    getAllLessons()
  ]);

  const baseUrl = 'https://wiseenglishacademy.org';

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/tracks`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/courses`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/instructors`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
  ];

  // Track pages
  const trackPages = tracks.map((track) => ({
    url: `${baseUrl}/tracks/${track.slug}`,
    lastModified: new Date(track.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Course pages
  const coursePages = courses.map((course) => ({
    url: `${baseUrl}/courses/${course.slug}`,
    lastModified: new Date(course.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Lesson pages
  const lessonPages = lessons.map((lesson) => {
    const course = courses.find(c => c.id === lesson.courseId);
    return {
      url: `${baseUrl}/courses/${course?.slug}/lessons/${lesson.id}`,
      lastModified: new Date(lesson.updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    };
  }).filter(page => page.url.includes('/courses/'));

  return [...staticPages, ...trackPages, ...coursePages, ...lessonPages];
}
