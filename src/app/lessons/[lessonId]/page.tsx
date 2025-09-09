import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowDownTrayIcon, ClockIcon, PlayIcon } from '@heroicons/react/24/outline';
import { getAllCourses, getAllLessons } from '@/lib/data';
import VideoPlayer from '@/components/VideoPlayer';

interface LessonPageProps {
  params: Promise<{
    lessonId: string;
  }>;
}

export const dynamic = 'force-static';

export async function generateStaticParams() {
  const lessons = await getAllLessons();
  
  return lessons.map((lesson) => ({
    lessonId: lesson.id,
  }));
}

export async function generateMetadata({ params }: LessonPageProps): Promise<Metadata> {
  const { lessonId } = await params;
  const lessons = await getAllLessons();
  const courses = await getAllCourses();
  
  const lesson = lessons.find(l => l.id === lessonId);
  const course = courses.find(c => c.id === lesson?.courseId);
  
  if (!lesson || !course) {
    return {
      title: 'Lesson Not Found',
    };
  }

  return {
    title: `${lesson.title} - ${course.name} | WISE English Academy`,
    description: lesson.notes || `Watch ${lesson.title} from ${course.name}. Learn Islamic sciences with expert guidance.`,
    keywords: [
      'Islamic learning',
      'Islamic jurisprudence',
      'Islamic courses',
      lesson.title,
      course.name,
      'Islamic education',
      'Fiqh',
      'Islamic law'
    ],
    openGraph: {
      title: `${lesson.title} - ${course.name}`,
      description: lesson.notes || `Watch ${lesson.title} from ${course.name}`,
      images: [
        {
          url: lesson.thumbnail,
          width: 1200,
          height: 630,
          alt: lesson.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${lesson.title} - ${course.name}`,
      description: lesson.notes || `Watch ${lesson.title} from ${course.name}`,
      images: [lesson.thumbnail],
    },
  };
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { lessonId } = await params;
  const lessons = await getAllLessons();
  const courses = await getAllCourses();
  
  const lesson = lessons.find(l => l.id === lessonId);
  const course = courses.find(c => c.id === lesson?.courseId);
  
  if (!lesson || !course) {
    notFound();
  }

  const courseLessons = lessons.filter(l => l.courseId === course.id).sort((a, b) => a.order - b.order);
  const currentIndex = courseLessons.findIndex(l => l.id === lessonId);
  const prevLesson = currentIndex > 0 ? courseLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < courseLessons.length - 1 ? courseLessons[currentIndex + 1] : null;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: lesson.title,
    description: lesson.notes || `Islamic lesson: ${lesson.title}`,
    thumbnailUrl: lesson.thumbnail,
    uploadDate: lesson.createdAt,
    duration: lesson.duration,
    contentUrl: lesson.youtubeUrl,
    embedUrl: `https://www.youtube.com/embed/${lesson.youtubeId}`,
    publisher: {
      '@type': 'Organization',
      name: 'WISE English Academy',
      logo: {
        '@type': 'ImageObject',
        url: '/logo.png'
      }
    },
    isPartOf: {
      '@type': 'Course',
      name: course.name,
      description: course.description
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex items-center space-x-4 mb-4">
              <Link
                href={`/courses/${course.slug}`}
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                ← Back to Course
              </Link>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {lesson.title}
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
                  youtubeId={lesson.youtubeId}
                  title={lesson.title}
                />
                
                <div className="mt-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {lesson.title}
                  </h2>
                  
                  <div className="flex items-center space-x-6 text-sm text-gray-500 mb-6">
                    <span className="flex items-center">
                      <ClockIcon className="w-4 h-4 mr-1" />
                      {lesson.duration}
                    </span>
                    <span className="flex items-center">
                      <PlayIcon className="w-4 h-4 mr-1" />
                      Lesson {currentIndex + 1} of {courseLessons.length}
                    </span>
                  </div>

                  {lesson.notes && (
                    <div className="prose max-w-none">
                      <h3 className="text-lg font-semibold mb-3">Notes</h3>
                      <div className="text-gray-700 whitespace-pre-wrap">
                        {lesson.notes}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Downloads */}
              {(lesson.downloads.video || lesson.downloads.audio) && (
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-lg font-semibold mb-4">Downloads</h3>
                  <div className="space-y-3">
                    {lesson.downloads.video && (
                      <a
                        href={lesson.downloads.video}
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
                    
                    {lesson.downloads.audio && (
                      <a
                        href={lesson.downloads.audio}
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

              {/* Course Lessons */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Course Lessons</h3>
                <div className="space-y-2">
                  {courseLessons.map((courseLesson, index) => (
                    <Link
                      key={courseLesson.id}
                      href={`/lessons/${courseLesson.id}`}
                      className={`block p-3 rounded-lg transition-colors ${
                        courseLesson.id === lesson.id
                          ? 'bg-primary-50 text-primary-700 border border-primary-200'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <span className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-xs font-medium mr-3">
                            {index + 1}
                          </span>
                          <span className="font-medium text-sm line-clamp-2">
                            {courseLesson.title}
                          </span>
                        </div>
                        {courseLesson.id === lesson.id && (
                          <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
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
                      href={`/lessons/${prevLesson.id}`}
                      className="block w-full p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <div className="text-sm text-gray-500 mb-1">Previous</div>
                      <div className="font-medium line-clamp-2">{prevLesson.title}</div>
                    </Link>
                  )}
                  
                  {nextLesson && (
                    <Link
                      href={`/lessons/${nextLesson.id}`}
                      className="block w-full p-3 bg-primary-50 hover:bg-primary-100 text-primary-700 rounded-lg transition-colors"
                    >
                      <div className="text-sm text-primary-600 mb-1">Next</div>
                      <div className="font-medium line-clamp-2">{nextLesson.title}</div>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
