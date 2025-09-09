import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getCourseBySlug, getLessonsByCourseId, getAllCourses, getAllTracks } from '@/lib/data';

interface CoursePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const courses = await getAllCourses();
  return courses.map((course) => ({
    slug: course.slug,
  }));
}

export async function generateMetadata({ params }: CoursePageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);
  
  if (!course) {
    return {
      title: 'Course Not Found',
    };
  }

  return {
    title: `${course.name} - Wise English Academy`,
    description: course.description,
  };
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);
  
  if (!course) {
    notFound();
  }

  const [lessons, tracks] = await Promise.all([
    getLessonsByCourseId(course.id),
    getAllTracks()
  ]);

  const track = tracks.find(t => t.id === course.trackId);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Course Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex items-center space-x-4 mb-6">
            <Link
              href="/courses"
              className="text-green-600 hover:text-green-700 font-medium"
            >
              ← Back to Courses
            </Link>
            {track && (
              <>
                <span className="text-gray-400">•</span>
                <Link
                  href={`/tracks/${track.slug}`}
                  className="text-green-600 hover:text-green-700 font-medium"
                >
                  {track.name} Track
                </Link>
              </>
            )}
          </div>
          
          <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-6 lg:space-y-0 lg:space-x-8">
            <div className="relative w-48 h-48 rounded-2xl overflow-hidden flex-shrink-0">
              <Image
                src={course.thumbnail}
                alt={course.name}
                fill
                className="object-cover"
              />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  course.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                  course.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {course.level}
                </span>
                {track && (
                  <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
                    {track.name}
                  </span>
                )}
              </div>
              
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {course.name}
              </h1>
              <p className="text-xl text-gray-600 mb-6">
                {course.description}
              </p>
              
              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  {course.instructor}
                </span>
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {course.duration}
                </span>
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  {lessons.length} lessons
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lessons Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Course Lessons
          </h2>
          <p className="text-gray-600">
            Watch lessons in order for the best learning experience
          </p>
        </div>

        {lessons.length > 0 ? (
          <div className="space-y-4">
            {lessons.map((lesson, index) => (
              <Link
                key={lesson.id}
                href={`/lessons/${lesson.id}`}
                className="block bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                      <span className="text-lg font-semibold text-gray-600">
                        {index + 1}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {lesson.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Duration: {lesson.duration}
                    </p>
                  </div>
                  
                  <div className="flex-shrink-0">
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No lessons available yet
            </h3>
            <p className="text-gray-600">
              Lessons for this course are coming soon. Check back later!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
