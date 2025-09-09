import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getTrackBySlug, getCoursesByTrackId, getAllTracks } from '@/lib/data';
import CourseCard from '@/components/CourseCard';

interface TrackPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const tracks = await getAllTracks();
  return tracks.map((track) => ({
    slug: track.slug,
  }));
}

export async function generateMetadata({ params }: TrackPageProps): Promise<Metadata> {
  const { slug } = await params;
  const track = await getTrackBySlug(slug);
  
  if (!track) {
    return {
      title: 'Track Not Found',
    };
  }

  return {
    title: `${track.name} Track - Wise English Academy`,
    description: track.description,
  };
}

export default async function TrackPage({ params }: TrackPageProps) {
  const { slug } = await params;
  const track = await getTrackBySlug(slug);
  
  if (!track) {
    notFound();
  }

  const courses = await getCoursesByTrackId(track.id);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Track Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex items-center space-x-4 mb-6">
            <Link
              href="/tracks"
              className="text-green-600 hover:text-green-700 font-medium"
            >
              ← Back to Tracks
            </Link>
          </div>
          
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
            <div className="relative w-32 h-32 rounded-2xl overflow-hidden flex-shrink-0">
              <Image
                src={track.thumbnailImage}
                alt={track.name}
                fill
                className="object-cover"
              />
            </div>
            
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {track.name} Track
              </h1>
              <p className="text-xl text-gray-600 mb-4">
                {track.description}
              </p>
              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <span>{courses.length} courses available</span>
                <span>•</span>
                <span>Islamic Jurisprudence</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Courses Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Courses in this Track
          </h2>
          <p className="text-gray-600">
            Explore all courses available in the {track.name} track
          </p>
        </div>

        {courses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, index) => (
              <CourseCard key={course.id} course={course} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No courses available yet
            </h3>
            <p className="text-gray-600">
              Courses for this track are coming soon. Check back later!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
