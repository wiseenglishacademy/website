import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getAllCourses, getAllTracks } from '@/lib/data';

export const metadata: Metadata = {
  title: 'All Courses - Wise English Academy',
  description: 'Browse all Islamic courses available on our platform. Learn from expert instructors in various fields of Islamic knowledge.',
};

export default async function CoursesPage() {
  const [courses, tracks] = await Promise.all([
    getAllCourses(),
    getAllTracks()
  ]);

  // Create a map of track IDs to track names for easy lookup
  const trackMap = tracks.reduce((acc, track) => {
    acc[track.id] = track;
    return acc;
  }, {} as Record<string, typeof tracks[0]>);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            All Courses
          </h1>
          <p className="text-xl text-gray-600">
            Explore our comprehensive collection of Islamic courses
          </p>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div key={course.id} className="group">
              <Link href={`/courses/${course.slug}`}>
                <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={course.thumbnail}
                      alt={course.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        course.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                        course.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {course.level}
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3">
                      <span className="bg-black/50 text-white px-2 py-1 rounded text-xs">
                        {trackMap[course.trackId]?.name || 'Unknown Track'}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-green-600 transition-colors">
                      {course.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {course.description}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{course.instructor}</span>
                      <span>{course.duration}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {courses.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No courses available
            </h3>
            <p className="text-gray-600">
              Courses are coming soon. Check back later!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
