import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowDownTrayIcon, ClockIcon } from '@heroicons/react/24/outline';
import { getCourseBySlug, getLessonsByCourseId, getAllCourses, getAllLessons } from '@/lib/data';
import VideoPlayer from '@/components/VideoPlayer';

interface LessonPageProps {
  params: Promise<{
    slug: string;
    lessonId: string;
  }>;
}

export async function generateStaticParams() {
  const courses = await getAllCourses();
  const lessons = await getAllLessons();
  
  return lessons.map((lesson) => {
    const course = courses.find(c => c.id === lesson.courseId);
    return {
      slug: course?.slug || '',
      lessonId: lesson.id,
    };
  }).filter(item => item.slug);
}

export async function generateMetadata({ params }: LessonPageProps): Promise<Metadata> {
  const { slug, lessonId } = await params;
  const course = await getCourseBySlug(slug);
  const lessons = await getLessonsByCourseId(course?.id || '');
  const lesson = lessons.find(l => l.id === lessonId);
  
  if (!course || !lesson) {
    return {
      title: 'Lesson Not Found',
    };
  }

  return {
    title: `${lesson.title} - ${course.name}`,
    description: lesson.notes || `Watch ${lesson.title} from ${course.name}`,
  };
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { slug, lessonId } = await params;
  const course = await getCourseBySlug(slug);
  
  if (!course) {
    notFound();
  }

  const lessons = await getLessonsByCourseId(course.id);
  const currentLesson = lessons.find(l => l.id === lessonId);
  
  if (!currentLesson) {
    notFound();
  }

  const currentIndex = lessons.findIndex(l => l.id === lessonId);
  const prevLesson = currentIndex > 0 ? lessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center space-x-4 mb-4">
            <Link
              href={`/courses/${course.slug}`}
              className="text-green-600 hover:text-green-700 font-medium"
            >
              ← Back to Course
            </Link>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {currentLesson.title}
          </h1>
          <p className="text-lg text-gray-600">
            {course.name}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Video Player */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <VideoPlayer
                youtubeId={currentLesson.youtubeId}
                title={currentLesson.title}
              />
              
              <div className="mt-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {currentLesson.title}
                </h2>
                
                <div className="flex items-center space-x-6 text-sm text-gray-500 mb-6">
                  <span className="flex items-center">
                    <ClockIcon className="w-4 h-4 mr-1" />
                    {currentLesson.duration}
                  </span>
                  <span>Lesson {currentIndex + 1} of {lessons.length}</span>
                </div>

                {currentLesson.notes && (
                  <div className="prose max-w-none">
                    <h3 className="text-lg font-semibold mb-3">Notes</h3>
                    <div className="text-gray-700 whitespace-pre-wrap">
                      {currentLesson.notes}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Downloads */}
            {(currentLesson.downloads.video || currentLesson.downloads.audio) && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Downloads</h3>
                <div className="space-y-3">
                  {currentLesson.downloads.video && (
                    <a
                      href={currentLesson.downloads.video}
                      download
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center">
                        <ArrowDownTrayIcon className="w-5 h-5 text-gray-500 mr-3" />
                        <span className="font-medium">Video Download</span>
                      </div>
                      <span className="text-sm text-gray-500">MP4</span>
                    </a>
                  )}
                  
                  {currentLesson.downloads.audio && (
                    <a
                      href={currentLesson.downloads.audio}
                      download
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center">
                        <ArrowDownTrayIcon className="w-5 h-5 text-gray-500 mr-3" />
                        <span className="font-medium">Audio Download</span>
                      </div>
                      <span className="text-sm text-gray-500">MP3</span>
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Lesson Navigation */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Course Lessons</h3>
              <div className="space-y-2">
                {lessons.map((lesson, index) => (
                  <Link
                    key={lesson.id}
                    href={`/courses/${course.slug}/lessons/${lesson.id}`}
                    className={`block p-3 rounded-lg transition-colors ${
                      lesson.id === currentLesson.id
                        ? 'bg-green-50 text-green-700 border border-green-200'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-xs font-medium mr-3">
                          {index + 1}
                        </span>
                        <span className="font-medium text-sm line-clamp-2">
                          {lesson.title}
                        </span>
                      </div>
                      {lesson.id === currentLesson.id && (
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="space-y-3">
                {prevLesson && (
                  <Link
                    href={`/courses/${course.slug}/lessons/${prevLesson.id}`}
                    className="block w-full p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <div className="text-sm text-gray-500 mb-1">Previous</div>
                    <div className="font-medium line-clamp-2">{prevLesson.title}</div>
                  </Link>
                )}
                
                {nextLesson && (
                  <Link
                    href={`/courses/${course.slug}/lessons/${nextLesson.id}`}
                    className="block w-full p-3 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg transition-colors"
                  >
                    <div className="text-sm text-green-600 mb-1">Next</div>
                    <div className="font-medium line-clamp-2">{nextLesson.title}</div>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
